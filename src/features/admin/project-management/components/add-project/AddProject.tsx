"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "@/services";
import { IClientInfo, IDocumentInfo, IEstimates, IProjectInfo } from "@/constants";

export interface IAddProjectFormValues {
  client_id?: string;
  name: string;
  description?: string;
  project_type?: string;
  budget?: number;
  estimated_cost?: number;
  cost_of_labour?: number;
  overhead_cost?: number;
  start_date?: Date;
  end_date?: Date;
  template_id?: string | null;
  renewal_type?: ProjectRenewalType | null;
  renewal_date?: Date;
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

const initialValues: IAddProjectFormValues = {
  client_id: "",
  name: "",
  description: "",
  project_type: "",
  budget: 0,
  estimated_cost: 0,
  cost_of_labour: 0,
  overhead_cost: 0,
  start_date: undefined,
  end_date: undefined,
  template_id: "",
  renewal_type: ProjectRenewalType.NONE,
  renewal_date: undefined,
  is_renewal: false,
  milestoneOption: "milestone",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Project Name is required"),
  project_type: Yup.string().required("Project Type is required"),
  client_id: Yup.string().required("Client is required"),
  description: Yup.string().required("Description is required"),
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
    .optional(),
  overhead_cost: Yup.number()
    .typeError("Over Head Cost must be a number")
    .optional(),
  milestoneOption: Yup.string().required("Milestone Option is required"),
});

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
}

export function AddProject({ 
  mode = "create", 
  projectId, 
  initialFormValues: propInitialFormValues,
  existingMilestones = [],
  existingAttachments = []
}: AddProjectProps) {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>(existingAttachments); // Initialize with existing attachments
  const [removedAttachmentIds, setRemovedAttachmentIds] = useState<string[]>([]); // Track removed existing attachments
  const [milestoneOption, setMilestoneOption] = useState("milestone");
  const [milestones, setMilestones] = useState<Milestone[]>(existingMilestones);
  const [basicInfo, setBasicInfo] = useState<IAddProjectFormValues | null>(
    propInitialFormValues || null
  );
  const [selectedProjectTemplate, setSelectedProjectTemplate] =
    useState<string>(propInitialFormValues?.template_id || "");
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const {
    allClientData,
    isLoading: clientLoading,
    isError: clientError,
  } = useAllClientQuery();

  // Get current user from auth store
  const { activeSession } = useAuthStore();
  const currentUser = activeSession?.user;
  const userId = currentUser?.id || "";

  const clientOptions = (allClientData || []).map((client) => ({
    label: client.name,
    value: client.id,
  }));

  const {
    allProjectTemplatesData,
    isLoading: projectTemplateLoading,
    error: projectTemplateError,
  } = useAllProjectTemplatesQuery();

  const projectTemplateOptions = (allProjectTemplatesData?.templates || []).map(
    (template) => ({
      label: template.name,
      value: template.id,
    })
  );

  const { onCreateProject, isPending: isCreatePending, error: createError } = useCreateProjectMutation({
    onSuccessCallback: (response) => {
      // Use type assertion to handle the actual response structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = response.data as any;
      
      // Try different possible locations for the project ID
      const responseProjectId = responseData?.project?.id || responseData?.id || responseData?.project_id;
      const projectIdToUse = responseProjectId || projectId;
      
      if (projectIdToUse) {
        setCreatedProjectId(projectIdToUse);
        setIsModalOpen(true);
      } else {
        console.error("No project ID in response");
        console.error("Full response structure:", JSON.stringify(response, null, 2));
      }
    },
    onErrorCallback: () => { },
  });

  const { onUpdateProject, isPending: isUpdatePending, error: updateError } = useUpdateProjectMutation({
    onSuccessCallback: (response) => {
      // Use type assertion to handle the actual response structure
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const responseData = response.data as any;
      
      // Try different possible locations for the project ID
      const responseProjectId = responseData?.project?.id || responseData?.id || responseData?.project_id;
      const projectIdToUse = responseProjectId || projectId;
      
      if (projectIdToUse) {
        setCreatedProjectId(projectIdToUse);
        setIsModalOpen(true);
      }
    },
    onErrorCallback: () => { },
  });

  const isPending = isCreatePending || isUpdatePending;
  const error = createError || updateError;

  const assemblePayload = () => {
    if (!basicInfo) return null;
    const apiMilestones = milestones.map((m) => ({
      name: m.name,
      description: m.description,
      assigned_to: m.assigned_to,
      status: m.status,
      start_date: m.start_date,
      end_date: m.end_date,
      tasks: (m.tasks ?? []).map((t) => ({
        title: t.title,
        description: t.description,
        assigned_to: t.assigned_to,
        status: t.status,
        due_date: t.due_date,
      })),
    }));
    
    const attachments = uploadedFiles
      .filter((file) => {
        // Check if this is an existing attachment that was removed
        const originalAttachment = (file as File & { originalAttachment?: {
          file_path?: string;
          file_type?: string;
          file_name?: string;
          uploaded_by?: { id?: string; first_name?: string; last_name?: string };
          created_at?: string;
          id?: string;
        } }).originalAttachment;
        
        // If it's an existing attachment, check if it was removed
        if (originalAttachment?.id) {
          return !removedAttachmentIds.includes(originalAttachment.id);
        }
        
        // If it's a new file, include it
        return true;
      })
      .map((file) => {
        // Check if this is an existing attachment (has originalAttachment metadata)
        const originalAttachment = (file as File & { originalAttachment?: {
          file_path?: string;
          file_type?: string;
          file_name?: string;
          uploaded_by?: { id?: string; first_name?: string; last_name?: string };
          created_at?: string;
          id?: string;
        } }).originalAttachment;
        
        if (originalAttachment && mode === "edit") {
          // For existing attachments, preserve the original file_path
          return {
            file_path: originalAttachment.file_path || file.name,
            file_type: originalAttachment.file_type || file.type,
            file_name: originalAttachment.file_name || file.name,
            uploaded_by: originalAttachment.uploaded_by?.id || userId,
          };
        } else {
          // For new files, use the file object properties
          return {
            file_path: file.name,
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
      budget: Number(basicInfo.budget),
      is_renewal: basicInfo.is_renewal,
      renewal_date: basicInfo.is_renewal === true ? (basicInfo.renewal_date ? (basicInfo.renewal_date instanceof Date ? basicInfo.renewal_date.toISOString() : basicInfo.renewal_date) : undefined) : undefined,
      renewal_type: basicInfo.is_renewal === true ? basicInfo.renewal_type : undefined,
      template_id: finalTemplateId,
      estimated_cost: Number(basicInfo.estimated_cost),
      cost_of_labour: basicInfo.cost_of_labour !== undefined ? Number(basicInfo.cost_of_labour) : undefined,
      overhead_cost: basicInfo.overhead_cost !== undefined ? Number(basicInfo.overhead_cost) : undefined,
      start_date: basicInfo.start_date ? (basicInfo.start_date instanceof Date ? basicInfo.start_date.toISOString() : basicInfo.start_date) : undefined,
      end_date: basicInfo.end_date ? (basicInfo.end_date instanceof Date ? basicInfo.end_date.toISOString() : basicInfo.end_date) : undefined,
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
  const selectedClient = allClientData?.find((client) => client.id === basicInfo?.client_id);

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
    estimated_cost: basicInfo?.estimated_cost !== undefined ? String(basicInfo.estimated_cost) : "",
    labour_cost: basicInfo?.cost_of_labour !== undefined ? String(basicInfo.cost_of_labour) : "",
    overhead_cost: basicInfo?.overhead_cost !== undefined ? String(basicInfo.overhead_cost) : "",
    budget: basicInfo?.budget !== undefined ? String(basicInfo.budget) : "",
  };
  const documents: IDocumentInfo[] = uploadedFiles.map((file) => {
    // Check if this is an existing attachment (has originalAttachment metadata)
    const originalAttachment = (file as File & { originalAttachment?: {
      file_path?: string;
      file_type?: string;
      file_name?: string;
      uploaded_by?: { id?: string; first_name?: string; last_name?: string };
      created_at?: string;
    } }).originalAttachment;
    
    if (originalAttachment && mode === "edit") {
      // For existing attachments, use the original uploaded_by information
      return {
        name: file.name,
        uploaded_by: originalAttachment.uploaded_by?.first_name 
          ? `${originalAttachment.uploaded_by.first_name} ${originalAttachment.uploaded_by.last_name || ''}`
          : userId,
        created_at: originalAttachment.created_at || new Date().toLocaleString(),
      };
    } else {
      // For new files, use current user
      return {
        name: file.name,
        uploaded_by: userId,
        created_at: new Date().toLocaleString(),
      };
    }
  });

  useEffect(() => {
    // Modal state and created project ID are now handled silently
  }, [isModalOpen, createdProjectId]);

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
      <Link
        href={`/admin/project-management`}
        className="flex gap-2 2xl:gap-[0.5vw] items-center 2xl:text-[1vw] font-medium"
      >
        <FaArrowLeftLong className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
        <span>Back</span>
      </Link>
      <h1 className="text-2xl 2xl:text-[1.8vw] font-medium">
        {mode === "edit" ? "Edit Project" : "Create Project"}
      </h1>
      <ProgressHeader step={step} />
      {step === 1 && (
        <Formik
          initialValues={basicInfo || propInitialFormValues || initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Step1BasicInfo
                {...formik}
                clientOptions={clientOptions}
                clientLoading={clientLoading}
                clientError={clientError}
                hideMilestoneTemplateOption={mode === 'edit'}
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
          projectTemplateOptions={projectTemplateOptions}
          projectTemplateLoading={projectTemplateLoading}
          projectTemplateError={!!projectTemplateError}
          allProjectTemplatesData={allProjectTemplatesData}
          initialMilestones={milestones}
          projectTemplate={selectedProjectTemplate}
          setProjectTemplate={setSelectedProjectTemplate}
        />
      )}
      {step === 3 && (
        <Step3UploadDocument
          onBack={() => setStep(2)}
          onNext={(files: File[], removedIds: string[]) => {
            setUploadedFiles(files);
            setRemovedAttachmentIds(removedIds);
            setStep(4);
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
      {isPending && <div>{mode === "edit" ? "Updating project..." : "Creating project..."}</div>}
      {error && (
        <div className="text-red-600">
          Error: {error.message || `Failed to ${mode} project.`}
        </div>
      )}
    </section>
  );
}
