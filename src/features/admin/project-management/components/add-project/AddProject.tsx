"use client";
import React, { useState } from "react";
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
import { useCreateProjectMutation, useAllClientQuery, useAllProjectTemplatesQuery } from "@/services";

// Define the type for the form values
export interface IAddProjectFormValues {
  name: string;
  projectType: string;
  client: string;
  description: string;
  estimatedStart: string;
  estimatedEnd: string;
  budget: string;
  estimatedCost: string;
  costOfLabour: string;
  overHeadCost: string;
  renewalType: string;
  renewalDate: string;
  milestoneOption: string;
}

const initialValues: IAddProjectFormValues = {
  name: "",
  projectType: "",
  client: "",
  description: "",
  estimatedStart: "",
  estimatedEnd: "",
  budget: "",
  estimatedCost: "",
  costOfLabour: "",
  overHeadCost: "",
  renewalType: "",
  renewalDate: "",
  milestoneOption: "milestone",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Project Name is required"),
  projectType: Yup.string().required("Project Type is required"),
  client: Yup.string().required("Client is required"),
  description: Yup.string().required("Description is required"),
  estimatedStart: Yup.string().required("Estimated Start Date is required"),
  estimatedEnd: Yup.string().required("Estimated End Date is required"),
  budget: Yup.string().required("Budget is required"),
  estimatedCost: Yup.string().required("Estimated Cost is required"),
  costOfLabour: Yup.string().required("Cost Of Labour is required"),
  overHeadCost: Yup.string().required("Over Head Cost is required"),
  renewalType: Yup.string().required("Renewal Type is required"),
  renewalDate: Yup.string().required("Renewal Date is required"),
  milestoneOption: Yup.string().required("Milestone Option is required"),
});

// Mock milestone/task types for preview
interface Task {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}
interface Milestone {
  id: number;
  name: string;
  assignedTo: string;
  status: string;
  estimatedStart: string;
  estimatedEnd: string;
  tasks: Task[];
}
interface ProjectInfo {
  name: string;
  type: string;
  contactPerson: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
interface ClientInfo {
  clientName: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
}
interface Estimates {
  estimatedStart: string;
  actualStart: string;
  estimatedEnd: string;
  actualEnd: string;
  estimatedCost: string;
  actualCost: string;
  labourCost: string;
  overheadCost: string;
  budget: string;
}
interface DocumentInfo {
  name: string;
  uploadedBy: string;
  uploadedAt: string;
}

export function AddProject() {
  const [step, setStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]); // for Step3/Preview
  const [milestoneOption, setMilestoneOption] = useState("milestone");
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [basicInfo, setBasicInfo] = useState<IAddProjectFormValues | null>(null);
  const { allClientData, isLoading: clientLoading, isError: clientError } = useAllClientQuery();
  const clientOptions = (allClientData || []).map((client) => ({
    label: client.name,
    value: client.id,
  }));
  const { allProjectTemplatesData, isLoading: projectTemplateLoading, error: projectTemplateError } = useAllProjectTemplatesQuery();
  const projectTemplateOptions = (allProjectTemplatesData?.templates || []).map((template) => ({
    label: template.name,
    value: template.id,
  }));

  const { onCreateProject, isPending, error } = useCreateProjectMutation({
    onSuccessCallback: () => {
      setIsModalOpen(true);
    },
    onErrorCallback: () => {
    },
  });

  const assemblePayload = () => {
    if (!basicInfo) return null;
    const apiMilestones = milestones.map((m) => ({
      name: m.name,
      assigned_to: m.assignedTo,
      status: m.status,
      start_date: m.estimatedStart,
      end_date: m.estimatedEnd,
      tasks: m.tasks.map((t) => ({
        title: t.name,
        description: t.description,
        assigned_to: t.assignedTo,
        status: t.status,
        due_date: t.dueDate,
      })),
    }));
    const attachments = uploadedFiles.map((file) => ({
      file_path: file.name,
      file_type: file.type,
      file_name: file.name,
    }));
    return {
      name: basicInfo.name,
      project_type: basicInfo.projectType,
      client_id: basicInfo.client,
      budget: Number(basicInfo.budget),
      estimated_cost: Number(basicInfo.estimatedCost),
      start_date: basicInfo.estimatedStart,
      end_date: basicInfo.estimatedEnd,
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
      onCreateProject(payload);
    }
  };

  // Build dynamic preview data from form state
  const projectInfo: ProjectInfo = {
    name: basicInfo?.name || "",
    type: basicInfo?.projectType || "",
    contactPerson: clientOptions.find(c => c.value === basicInfo?.client)?.label || "",
    description: basicInfo?.description || "",
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
  };
  const clientInfo: ClientInfo = {
    clientName: clientOptions.find(c => c.value === basicInfo?.client)?.label || "",
    companyName: "-", // Add real value if available
    contactPerson: clientOptions.find(c => c.value === basicInfo?.client)?.label || "",
    phone: "-", // Add real value if available
    email: "-", // Add real value if available
  };
  const estimates: Estimates = {
    estimatedStart: basicInfo?.estimatedStart || "",
    actualStart: "-", // Add real value if available
    estimatedEnd: basicInfo?.estimatedEnd || "",
    actualEnd: "-", // Add real value if available
    estimatedCost: basicInfo?.estimatedCost || "",
    actualCost: "-", // Add real value if available
    labourCost: basicInfo?.costOfLabour || "",
    overheadCost: basicInfo?.overHeadCost || "",
    budget: basicInfo?.budget || "",
  };
  const documents: DocumentInfo[] = uploadedFiles.map((file) => ({
    name: file.name,
    uploadedBy: "-", // Add real value if available
    uploadedAt: new Date().toLocaleString(),
  }));

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[1vw]">
      <Link
        href={`/admin/project-management`}
        className="flex gap-2 2xl:gap-[0.5vw] items-center 2xl:text-[1vw] font-medium"
      >
        <FaArrowLeftLong className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
        <span>Back</span>
      </Link>
      <h1 className="text-2xl 2xl:text-[1.8vw] font-medium">Create Project</h1>
      <ProgressHeader step={step} />
      {step === 1 && (
        <Formik
          initialValues={basicInfo || initialValues}
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
        />
      )}
      {step === 3 && (
        <Step3UploadDocument
          onBack={() => setStep(2)}
          onNext={(files: File[]) => {
            setUploadedFiles(files);
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
      {isModalOpen && <ProjectCreatedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
      {isPending && <div>Creating project...</div>}
      {error && <div className="text-red-600">Error: {error.message || "Failed to create project."}</div>}
    </section>
  );
}
