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

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Project Name is required")
    .matches(/^[a-zA-Z0-9 .,'-]*$/, "No special characters allowed in Project Name."),
  project_type: Yup.string().required("Project Type is required"),
  client_id: Yup.string().required("Client is required"),
  description: Yup.string()
    .required("Description is required"),
  start_date: Yup.date()
    .typeError("Estimated Start Date is required")
    .required("Estimated Start Date is required"),
  end_date: Yup.date()
    .typeError("Estimated End Date is required")
    .required("Estimated End Date is required"),
  budget: Yup.number()
    .typeError("Budget must be a number")
    .required("Budget is required"),
  estimated_cost: Yup.number()
    .typeError("Estimated Cost must be a number")
    .required("Estimated Cost is required"),
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

function validate(values: IAddProjectFormValues) {
  const errors: Partial<Record<keyof IAddProjectFormValues, string>> = {};
  
  try {
    const valuesForValidation = { ...values };
    if (!values.is_renewal) {
      valuesForValidation.renewal_date = undefined;
      valuesForValidation.renewal_type = undefined;
    }
    validationSchema.validateSync(valuesForValidation, { abortEarly: false });
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
          if ((err.path === 'renewal_date' || err.path === 'renewal_type') && !values.is_renewal) {
            // skip
          } else {
            errors[err.path as keyof IAddProjectFormValues] = err.message;
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
  if (
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
  if (
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
  const router = useRouter()
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] =
    useState<File[]>(existingAttachments); // Initialize with existing attachments
  const [, setRemovedAttachmentIds] = useState<string[]>([]); // Track removed existing attachments
  const [milestoneOption, setMilestoneOption] = useState("milestone");
  const [milestones, setMilestones] = useState<Milestone[]>(existingMilestones);
  const [basicInfo, setBasicInfo] = useState<IAddProjectFormValues | null>(
    propInitialFormValues || null
  );
  const [selectedProjectTemplate, setSelectedProjectTemplate] =
    useState<string>(propInitialFormValues?.template_id || "");
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [uploadedFileUrls, setUploadedFileUrls] = useState<string[]>([]); // Store uploaded file URLs
  const {
    allClientData,
    isLoading: clientLoading,
    isError: clientError,
  } = useAllClientQuery();

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
      } else {
        console.error("No project ID in response");
        console.error(
          "Full response structure:",
          JSON.stringify(response, null, 2)
        );
      }
    },
    onErrorCallback: () => {},
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
      }
    },
    onErrorCallback: () => {},
  });

  const { onUploadMultipleAttachments, isPending } =
    useUploadMultipleAttachmentsMutation({
      onSuccessCallback: (data) => {
        setUploadedFileUrls(data.data || []);
        toast.success("Attachment(s) uploaded successfully.");
        setStep(4); // Move to preview step after upload
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
      const originalAttachment = (file as File & {
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
      }).originalAttachment;

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
      ...(basicInfo.is_renewal && basicInfo.renewal_date && !isNaN(new Date(basicInfo.renewal_date).getTime())
        ? { renewal_date: basicInfo.renewal_date }
        : {}),
      ...(basicInfo.is_renewal && basicInfo.renewal_type
        ? { renewal_type: basicInfo.renewal_type }
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
    setBasicInfo(values);
    setMilestoneOption(values.milestoneOption);
    setStep(2);
    actions.setSubmitting(false);
  };

  const handleMilestoneNext = (milestonesData: Milestone[]) => {
    setMilestones(milestonesData);
    setStep(3);
  };

  const handleFinalSubmit = () => {
    // Debug logs to check mapping before submission
    console.log('DEBUG: uploadedFiles', uploadedFiles);
    console.log('DEBUG: uploadedFileUrls', uploadedFileUrls);
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
    extra_cost: basicInfo?.extra_cost !== undefined ? String(basicInfo.extra_cost) : "",
  };
  let newFileUrlIdxForDocs = 0;
  const documents: IDocumentInfo[] = uploadedFiles?.map((file) => {
    // Check if this is an existing attachment (has originalAttachment metadata)
    const originalAttachment = (file as File & {
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
    }).originalAttachment;

    if (originalAttachment && mode === "edit") {
      // For existing attachments, use the original uploaded_by information
      return {
        name: file.name,
        uploaded_by: originalAttachment.uploaded_by?.first_name
          ? `${originalAttachment.uploaded_by.first_name} ${originalAttachment.uploaded_by.last_name || ""}`
          : userId,
        created_at: originalAttachment.created_at || new Date().toLocaleString(),
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

  useEffect(() => {}, [isModalOpen, createdProjectId]);

  const onRemoveAttachments = (removedIds: string[]) => {
    if (removedIds.length > 0) {
      toast.success("Attachment(s) removed successfully.");
    }
  };

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
      <div
        onClick={() => router.back()}
        className="flex gap-2 2xl:gap-[0.5vw] items-center 2xl:text-[1vw] font-medium cursor-pointer"
      >
        <FaArrowLeftLong className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
        <span>Back</span>
      </div>
      <h1 className="text-2xl 2xl:text-[1.8vw] font-medium">
        {mode === "edit" ? "Edit Project" : "Create Project"}
      </h1>
      <ProgressHeader step={step} />
      {step === 1 && (
        <Formik
          initialValues={basicInfo || propInitialFormValues || initialValues}
          validationSchema={validationSchema}
          validate={validate}
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
              <div className="flex mt-6 2xl:mt-[1.5vw]">
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  title="Next"
                  width="w-full md:w-[10rem] 2xl:w-[10vw]"
                />
              </div>
            </Form>
          )}
        </Formik>
      )}
      {step === 2 && (
        <Step2MilestoneSetup
          onBack={() => setStep(1)}
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
      {step === 3 && (
        <Step3UploadDocument
          onBack={() => setStep(2)}
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
              setStep(4);
            }
          }}
          initialFiles={uploadedFiles}
        />
      )}
      {step === 4 && (
        <Step4Preview
          projectInfo={projectInfo}
          clientInfo={clientInfo}
          estimates={estimates}
          documents={documents}
          milestones={milestones}
          onBack={() => setStep(3)}
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

