"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import {
  ProgressHeader,
  ProjectCreatedModal,
  Step1BasicInfo,
  Step2MilestoneSetup,
  Step3UploadDocument,
  Step4Preview,
} from "./components";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button } from "@/components";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useAllClientQuery,
  useAllProjectTemplatesQuery,
  ProjectRenewalType,
  useAuthStore,
  useUploadMultipleAttachmentsMutation,
} from "@/services";
import { useProjectStore } from "@/services/stores";
import {
  IClientInfo,
  IDocumentInfo,
  IEstimates,
  IProjectInfo,
} from "@/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export interface IAddProjectFormValues {
  client_id?: string;
  name: string;
  description?: string;
  project_type?: string;
  budget?: number | string;
  estimated_cost?: number | string;
  cost_of_labour?: number | string;
  overhead_cost?: number | string;
  extra_cost?: number | string;
  start_date?: string;
  end_date?: string;
  template_id?: string | null;
  renewal_type?: ProjectRenewalType | null;
  renewal_date?: string;
  is_renewal?: boolean;
  milestoneOption: string; // extra field for frontend dropdown selection
}

interface AddProjectProps {
  mode?: "create" | "edit";
  projectId?: string;
  initialFormValues?: IAddProjectFormValues;
  existingMilestones?: Milestone[];
  existingAttachments?: File[];
}

interface FileWithAttachment extends File {
  originalAttachment?: unknown;
}

const initialValues: IAddProjectFormValues = {
  client_id: "",
  name: "",
  description: "",
  project_type: "",
  budget: "",
  estimated_cost: "",
  cost_of_labour: "",
  overhead_cost: "",
  extra_cost: "",
  start_date: undefined,
  end_date: undefined,
  template_id: "",
  renewal_type: ProjectRenewalType.NONE,
  renewal_date: undefined,
  is_renewal: false,
  milestoneOption: "milestone",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getValidationSchema = (isAdmin: boolean) =>
  Yup.object({
    name: Yup.string()
      .required("Project Name is required")
      .matches(
        /^[a-zA-Z0-9 .,'-]*$/,
        "No special characters allowed in Project Name."
      ),
    project_type: Yup.string().optional(),
    client_id: Yup.string().optional(),
    description: Yup.string().optional(),
    start_date: Yup.date()
      .typeError("Estimated Start Date is required")
      .optional(),
    end_date: Yup.date()
      .typeError("Estimated End Date is required")
      .optional(),
    budget: (isAdmin
      ? Yup.number().typeError("Budget must be a number").required("Budget is required")
      : Yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).optional()) as Yup.NumberSchema<number | undefined>,
    estimated_cost: (isAdmin
      ? Yup.number().typeError("Estimated Cost must be a number").required("Estimated Cost is required")
      : Yup.number().transform((value, originalValue) => (originalValue === "" ? undefined : value)).optional()) as Yup.NumberSchema<number | undefined>,

    cost_of_labour: Yup.number()
      .typeError("Cost Of Labour must be a number")
      .optional()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    overhead_cost: Yup.number()
      .typeError("Over Head Cost must be a number")
      .optional()
      .transform((value, originalValue) =>
        originalValue === "" ? undefined : value
      ),
    milestoneOption: Yup.string().required("Milestone Option is required"),
  });

function createValidate(isAdmin: boolean) {
  const schema = getValidationSchema(isAdmin);
  return function validate(values: IAddProjectFormValues) {
    const errors: Partial<Record<keyof IAddProjectFormValues, string>> = {};

    try {
      const valuesForValidation = { ...values };
      if (!values.is_renewal) {
        valuesForValidation.renewal_date = undefined;
        valuesForValidation.renewal_type = undefined;
      }
      schema.validateSync(valuesForValidation, { abortEarly: false });
    } catch (yupError) {
      if (
        typeof yupError === "object" &&
        yupError !== null &&
        "inner" in yupError &&
        Array.isArray((yupError as { inner: unknown }).inner)
      ) {
        (
          yupError as { inner: Array<{ path?: string; message: string }> }
        ).inner.forEach((err) => {
          if (err.path && !errors[err.path as keyof IAddProjectFormValues]) {
            if (
              (err.path === "renewal_date" || err.path === "renewal_type") &&
              !values.is_renewal
            ) {
              // skip
            } else {
              // Skip admin-only cost fields for non-admins
              if (!isAdmin && (err.path === "budget" || err.path === "estimated_cost")) {
                // ignore
              } else {
                errors[err.path as keyof IAddProjectFormValues] = err.message;
              }
            }
          }
        });
      }
    }
    // Custom: Prevent special characters in name only
    const allowedPattern = /^[a-zA-Z0-9 .,'-]*$/;
    if (values.name && !allowedPattern.test(values.name)) {
      errors.name = "No special characters allowed in Project Name.";
    }
    // Custom: Estimated Cost vs Budget
    if (isAdmin &&
      values.estimated_cost !== undefined &&
      values.estimated_cost !== "" &&
      values.budget !== undefined &&
      values.budget !== "" &&
      Number(values.estimated_cost) > Number(values.budget)
    ) {
      // Do not set errors.estimated_cost here, as the user might want to proceed even if estimated cost is greater than budget.
    }
    // Custom: Cost of Labour + Overhead Cost vs Estimated Cost
    const sum =
      (Number(values.cost_of_labour) || 0) + (Number(values.overhead_cost) || 0);
    if (isAdmin &&
      values.estimated_cost !== undefined &&
      values.estimated_cost !== "" &&
      sum > Number(values.estimated_cost)
    ) {
      errors.cost_of_labour =
        "Sum of Cost of Labour and Overhead Cost cannot be greater than Estimated Cost";
      errors.overhead_cost =
        "Sum of Cost of Labour and Overhead Cost cannot be greater than Estimated Cost";
    }
    if (values.is_renewal) {
      if (!values.renewal_type || values.renewal_type === "NONE") {
        errors.renewal_type = "Renewal Type is required";
      }
      if (!values.renewal_date) {
        errors.renewal_date = "Renewal Date is required";
      }
      if (values.renewal_date) {
        const renewalDate = new Date(values.renewal_date);
        if (isNaN(renewalDate.getTime())) {
          errors.renewal_date = "Invalid date";
        }
      }
    }
    return errors;
  };
}

// Add local types for editing
export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  due_date: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  assigned_to: string;
  status: string;
  start_date: string;
  end_date: string;
  tasks: Task[];
  tickets?: {
    id: string;
    title: string;
    description: string;
    assigned_to: string | null;
    status: string;
    priority: string;
    remark: string;
    image_url?: string;
    created_at?: string;
  }[];
}

export function AddProject({
  mode = "create",
  projectId,
  initialFormValues: propInitialFormValues,
  existingMilestones = [],
  existingAttachments = [],
}: AddProjectProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [, setRemovedAttachmentIds] = useState<string[]>([]); // Track removed existing attachments

  // Use project store for create mode, local state for edit mode
  const {
    currentStep: createCurrentStep,
    basicInfo: createBasicInfo,
    milestones: createMilestones,
    milestoneOption: createMilestoneOption,
    selectedProjectTemplate: createSelectedProjectTemplate,
    uploadedFiles: createUploadedFiles,
    uploadedFileUrls: createUploadedFileUrls,
    setCurrentStep: setCreateCurrentStep,
    setBasicInfo: setCreateBasicInfo,
    setMilestones: setCreateMilestones,
    setMilestoneOption: setCreateMilestoneOption,
    setSelectedProjectTemplate: setCreateSelectedProjectTemplate,
    setUploadedFiles: setCreateUploadedFiles,
    setUploadedFileUrls: setCreateUploadedFileUrls,
    goToPreviousStep: createGoToPreviousStep,
    clearProjectCreation,
  } = useProjectStore();

  // Local state for edit mode
  const [editCurrentStep, setEditCurrentStep] = useState(1);
  const [editBasicInfo, setEditBasicInfo] = useState<IAddProjectFormValues | null>(propInitialFormValues || null);
  const [editMilestones, setEditMilestones] = useState<Milestone[]>(existingMilestones);
  const [editMilestoneOption, setEditMilestoneOption] = useState("milestone");
  const [editSelectedProjectTemplate, setEditSelectedProjectTemplate] = useState(propInitialFormValues?.template_id || "");
  const [editUploadedFiles, setEditUploadedFiles] = useState<File[]>(existingAttachments);
  const [editUploadedFileUrls, setEditUploadedFileUrls] = useState<string[]>([]);

  // Use appropriate state based on mode
  const currentStep = mode === "edit" ? editCurrentStep : createCurrentStep;
  const basicInfo = mode === "edit" ? editBasicInfo : createBasicInfo;
  const milestones = mode === "edit" ? editMilestones : createMilestones;
  const milestoneOption = mode === "edit" ? editMilestoneOption : createMilestoneOption;
  const selectedProjectTemplate = mode === "edit" ? editSelectedProjectTemplate : createSelectedProjectTemplate;
  const uploadedFiles = mode === "edit" ? editUploadedFiles : createUploadedFiles;
  const uploadedFileUrls = mode === "edit" ? editUploadedFileUrls : createUploadedFileUrls;

  // Use appropriate setters based on mode
  const setCurrentStep = mode === "edit" ? setEditCurrentStep : setCreateCurrentStep;
  const setBasicInfo = mode === "edit" ? setEditBasicInfo : setCreateBasicInfo;
  const setMilestones = mode === "edit" ? setEditMilestones : setCreateMilestones;
  const setMilestoneOption = mode === "edit" ? setEditMilestoneOption : setCreateMilestoneOption;
  const setSelectedProjectTemplate = mode === "edit" ? setEditSelectedProjectTemplate : setCreateSelectedProjectTemplate;
  const setUploadedFiles = mode === "edit" ? setEditUploadedFiles : setCreateUploadedFiles;
  const setUploadedFileUrls = mode === "edit" ? setEditUploadedFileUrls : setCreateUploadedFileUrls;
  const goToPreviousStep = mode === "edit" ? () => setEditCurrentStep(Math.max(editCurrentStep - 1, 1)) : createGoToPreviousStep;


  const {
    allClientData,
    isLoading: clientLoading,
    isError: clientError,
  } = useAllClientQuery({ limit: 1000000 });

  // Get current user from auth store
  const { activeSession } = useAuthStore();
  const currentUser = activeSession?.user;
  const userId = currentUser?.id || "";

  const clientOptions = (allClientData?.data?.list || [])?.map((client) => ({
    label: client.name,
    value: client.id,
  }));

  const {
    allProjectTemplatesData,
    isLoading: projectTemplateLoading,
    error: projectTemplateError,
  } = useAllProjectTemplatesQuery();

  const { onCreateProject } = useCreateProjectMutation({
    onSuccessCallback: (response) => {
      // Use type assertion to handle the actual response structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = response.data as any;

      // Try different possible locations for the project ID
      const responseProjectId =
        responseData?.project?.id ||
        responseData?.id ||
        responseData?.project_id;
      const projectIdToUse = responseProjectId || projectId;

      if (projectIdToUse) {
        setCreatedProjectId(projectIdToUse);
        setIsModalOpen(true);
        // Clear project store when project is successfully created
        clearProjectCreation();
      } else {
        console.error("No project ID in response");
        console.error(
          "Full response structure:",
          JSON.stringify(response, null, 2)
        );
      }
    },
    onErrorCallback: () => { },
  });

  const { onUpdateProject } = useUpdateProjectMutation({
    onSuccessCallback: (response) => {
      // Use type assertion to handle the actual response structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = response.data as any;

      // Try different possible locations for the project ID
      const responseProjectId =
        responseData?.project?.id ||
        responseData?.id ||
        responseData?.project_id;
      const projectIdToUse = responseProjectId || projectId;

      if (projectIdToUse) {
        setCreatedProjectId(projectIdToUse);
        setIsModalOpen(true);
        // Clear project store when project is successfully updated
        clearProjectCreation();
      }
    },
    onErrorCallback: () => { },
  });

  const { onUploadMultipleAttachments, isPending } =
    useUploadMultipleAttachmentsMutation({
      onSuccessCallback: (data) => {
        setUploadedFileUrls(data.data || []);
        toast.success("Attachment(s) uploaded successfully.");
        setCurrentStep(4); // Move to preview step after upload
      },
      onErrorCallback: (err) => {
        console.error("Upload failed", err);
        toast.error("Failed to upload attachment(s). Please try again.");
      },
    });

  const assemblePayload = () => {
    if (!basicInfo) return null;
    const apiMilestones = milestones?.map((m) => ({
      name: m.name,
      description: m.description,
      assigned_to: m.assigned_to,
      status: m.status,
      start_date: m.start_date,
      end_date: m.end_date,
      tasks: (m.tasks ?? [])?.map((t) => ({
        title: t.title,
        description: t.description,
        assigned_to: t.assigned_to,
        status: t.status,
        due_date: t.due_date,
      })),
    }));

    // Map attachments: use Cloudinary URL for new files, original info for existing
    let newFileUrlIdx = 0;
    const attachments = uploadedFiles?.map((file) => {
      // Check if this is an existing attachment (has originalAttachment metadata)
      const originalAttachment = (
        file as File & {
          originalAttachment?: {
            file_path?: string;
            file_type?: string;
            file_name?: string;
            uploaded_by?: {
              id?: string;
              first_name?: string;
              last_name?: string;
            };
            created_at?: string;
            id?: string;
          };
        }
      ).originalAttachment;

      if (originalAttachment && mode === "edit") {
        // For existing attachments, preserve the original file_path
        return {
          file_path: originalAttachment.file_path || file.name,
          file_type: originalAttachment.file_type || file.type,
          file_name: originalAttachment.file_name || file.name,
          uploaded_by: originalAttachment.uploaded_by?.id || userId,
        };
      } else {
        // For new files, use the next Cloudinary URL
        const url = uploadedFileUrls[newFileUrlIdx] || file.name;
        newFileUrlIdx++;
        return {
          file_path: url,
          file_type: file.type,
          file_name: file.name,
          uploaded_by: userId,
        };
      }
    });

    // Determine template_id
    let finalTemplateId = undefined;
    if (selectedProjectTemplate && selectedProjectTemplate.trim() !== "") {
      finalTemplateId = selectedProjectTemplate;
    } else if (basicInfo.template_id && basicInfo.template_id.trim() !== "") {
      finalTemplateId = basicInfo.template_id;
    }

    return {
      name: basicInfo.name,
      description: basicInfo.description,
      project_type: basicInfo.project_type,
      client_id: basicInfo.client_id,
      budget: basicInfo.budget !== "" ? Number(basicInfo.budget) : undefined,
      is_renewal: basicInfo.is_renewal,
      ...(basicInfo.is_renewal &&
        basicInfo.renewal_date &&
        !isNaN(new Date(basicInfo.renewal_date).getTime())
        ? { renewal_date: basicInfo.renewal_date }
        : {}),
      ...(basicInfo.is_renewal && basicInfo.renewal_type
        ? { renewal_type: basicInfo.renewal_type as ProjectRenewalType }
        : {}),
      template_id: finalTemplateId,
      estimated_cost:
        basicInfo.estimated_cost !== ""
          ? Number(basicInfo.estimated_cost)
          : undefined,
      cost_of_labour:
        basicInfo.cost_of_labour !== ""
          ? Number(basicInfo.cost_of_labour)
          : undefined,
      overhead_cost:
        basicInfo.overhead_cost !== ""
          ? Number(basicInfo.overhead_cost)
          : undefined,
      extra_cost:
        basicInfo.extra_cost !== "" && basicInfo.extra_cost !== undefined
          ? Number(basicInfo.extra_cost)
          : undefined,
      start_date: basicInfo.start_date
        ? basicInfo.start_date
          ? basicInfo.start_date
          : basicInfo.start_date
        : "",
      end_date: basicInfo.end_date
        ? basicInfo.end_date
          ? basicInfo.end_date
          : basicInfo.end_date
        : "",
      milestones: apiMilestones,
      attachments,
    };
  };

  const handleSubmit = (
    values: IAddProjectFormValues,
    actions: FormikHelpers<IAddProjectFormValues>
  ) => {
    console.log("Hnadle Submit");

    setBasicInfo(values);
    setMilestoneOption(values.milestoneOption);
    setCurrentStep(2);
    actions.setSubmitting(false);
  };

  const handleMilestoneNext = (milestonesData: Milestone[]) => {
    setMilestones(milestonesData);
    setCurrentStep(3);
  };

  const handleFinalSubmit = () => {
    // Debug logs to check mapping before submission
    console.log("DEBUG: uploadedFiles", uploadedFiles);
    console.log("DEBUG: uploadedFileUrls", uploadedFileUrls);
    const payload = assemblePayload();

    if (payload) {
      if (mode === "create") {
        onCreateProject(payload);
      } else if (mode === "edit" && projectId) {
        onUpdateProject({ id: projectId, payload });
      }
    }
  };

  // Build dynamic preview data from form state
  const projectInfo: IProjectInfo = {
    name: basicInfo?.name || "",
    project_type: basicInfo?.project_type || "",
    contact_person:
      clientOptions.find((c) => c.value === basicInfo?.client_id)?.label || "",
    description: basicInfo?.description || "",
    created_at: new Date().toLocaleString(),
    updated_at: new Date().toLocaleString(),
  };
  const selectedClient = allClientData?.data?.list?.find(
    (client) => client.id === basicInfo?.client_id
  );

  const clientInfo: IClientInfo = {
    client_name: selectedClient?.name || "",
    company_name: selectedClient?.company_name || "",
    contact_person: selectedClient?.contact_person || "",
    phone: selectedClient?.contact_number || "-",
    email: selectedClient?.email || "-",
  };
  const estimates: IEstimates = {
    start_date: basicInfo?.start_date ? String(basicInfo.start_date) : "",
    end_date: basicInfo?.end_date ? String(basicInfo.end_date) : "",
    estimated_cost:
      basicInfo?.estimated_cost !== undefined
        ? String(basicInfo.estimated_cost)
        : "",
    labour_cost:
      basicInfo?.cost_of_labour !== undefined
        ? String(basicInfo.cost_of_labour)
        : "",
    overhead_cost:
      basicInfo?.overhead_cost !== undefined
        ? String(basicInfo.overhead_cost)
        : "",
    budget: basicInfo?.budget !== undefined ? String(basicInfo.budget) : "",
    extra_cost:
      basicInfo?.extra_cost !== undefined ? String(basicInfo.extra_cost) : "",
  };
  let newFileUrlIdxForDocs = 0;
  const documents: IDocumentInfo[] = uploadedFiles?.map((file) => {
    // Check if this is an existing attachment (has originalAttachment metadata)
    const originalAttachment = (
      file as File & {
        originalAttachment?: {
          file_path?: string;
          file_type?: string;
          file_name?: string;
          uploaded_by?: {
            id?: string;
            first_name?: string;
            last_name?: string;
          };
          created_at?: string;
        };
      }
    ).originalAttachment;

    if (originalAttachment && mode === "edit") {
      // For existing attachments, use the original uploaded_by information
      return {
        name: file.name,
        uploaded_by: originalAttachment.uploaded_by?.first_name
          ? `${originalAttachment.uploaded_by.first_name} ${originalAttachment.uploaded_by.last_name || ""
          }`
          : userId,
        created_at:
          originalAttachment.created_at || new Date().toLocaleString(),
        file_path: originalAttachment.file_path || file.name,
      };
    } else {
      // For new files, use the next Cloudinary URL
      const url = uploadedFileUrls[newFileUrlIdxForDocs] || file.name;
      newFileUrlIdxForDocs++;
      return {
        name: file.name,
        uploaded_by: userId,
        created_at: new Date().toLocaleString(),
        file_path: url,
      };
    }
  });

  useEffect(() => { }, [isModalOpen, createdProjectId]);



  // Clear project store when user navigates back to project list
  const handleBackNavigation = () => {
    clearProjectCreation();
    router.back();
  };

  const onRemoveAttachments = (removedIds: string[]) => {
    if (removedIds.length > 0) {
      toast.success("Attachment(s) removed successfully.");
    }
  };

  return (
    <section className="flex flex-col gap-6  border border-gray-300 rounded-lg  bg-white p-4 ">
      <div
        onClick={handleBackNavigation}
        className="flex gap-2  items-center  font-medium cursor-pointer"
      >
        <FaArrowLeftLong className="w-4 h-4  " />
        <span>Back</span>
      </div>
      <h1 className="text-2xl  font-medium">
        {mode === "edit" ? "Edit Project" : "Create Project"}
      </h1>
      <ProgressHeader step={currentStep} />
      {currentStep === 1 && (
        <Formik
          initialValues={basicInfo || propInitialFormValues || initialValues}
          validationSchema={getValidationSchema((activeSession?.user?.role.role ?? "").toLowerCase() === "admin")}
          validate={createValidate((activeSession?.user?.role.role ?? "").toLowerCase() === "admin")}
          onSubmit={handleSubmit}
          validateOnChange={true}
          validateOnBlur={true}
          validateOnMount={false}
        >
          {(formik) => (
            <Form>
              <Step1BasicInfo
                {...formik}
                clientOptions={clientOptions}
                clientLoading={clientLoading}
                clientError={clientError}
                hideMilestoneTemplateOption={mode === "edit"}
              />
              <div className="flex mt-6 ">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  title="Next"
                  width="w-full md:w-[10rem] "
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
      {currentStep === 2 && (
        <Step2MilestoneSetup
          onBack={() => {
            goToPreviousStep();
          }}
          onNext={handleMilestoneNext}
          milestoneOption={milestoneOption}
          projectTemplateLoading={projectTemplateLoading}
          projectTemplateError={!!projectTemplateError}
          allProjectTemplatesData={allProjectTemplatesData}
          initialMilestones={milestones}
          projectTemplate={selectedProjectTemplate}
          setProjectTemplate={setSelectedProjectTemplate}
          projectType={basicInfo?.project_type ?? ""}
          projectStartDate={
            basicInfo?.start_date
              ? typeof basicInfo.start_date === "string"
                ? basicInfo.start_date
                : basicInfo.start_date
              : ""
          }
          projectEndDate={
            basicInfo?.end_date
              ? typeof basicInfo.end_date === "string"
                ? basicInfo.end_date
                : basicInfo.end_date
              : ""
          }
          mode={mode}
        />
      )}
      {currentStep === 3 && (
        <Step3UploadDocument
          onBack={() => goToPreviousStep()}
          isPending={isPending}
          mode={mode}
          onNext={(files: File[], removedIds: string[]) => {
            // Remove files if any were deleted
            if (removedIds.length > 0) {
              onRemoveAttachments(removedIds);
            }
            // Only upload new files (no originalAttachment property)
            const newFiles = files.filter(
              (f) => !(f as FileWithAttachment).originalAttachment
            );
            if (newFiles.length > 0) {
              const formData = new FormData();
              newFiles.forEach((file) => formData.append("image", file));
              setUploadedFiles(files);
              setRemovedAttachmentIds(removedIds);
              onUploadMultipleAttachments(formData);
              // Do NOT setStep(4) here; move to step 4 in onSuccessCallback above
            } else {
              // No files to upload, just proceed to next step
              setUploadedFiles(files);
              setRemovedAttachmentIds(removedIds);
              setCurrentStep(4);
            }
          }}
          initialFiles={uploadedFiles}
        />
      )}
      {currentStep === 4 && (
        <Step4Preview
          projectInfo={projectInfo}
          clientInfo={clientInfo}
          estimates={estimates}
          documents={documents}
          milestones={milestones}
          onBack={() => goToPreviousStep()}
          onSubmit={handleFinalSubmit}
        />
      )}
      {isModalOpen && (
        <ProjectCreatedModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={createdProjectId}
          mode={mode}
        />
      )}
    </section>
  );
}
