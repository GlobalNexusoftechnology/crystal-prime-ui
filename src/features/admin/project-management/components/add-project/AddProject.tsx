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

  // Mock preview data (replace with real form state as needed)
  const projectInfo: ProjectInfo = {
    name: "E Commerce Project",
    type: "Website",
    contactPerson: "Nisha Sharma",
    description:
      "Nisha Sharma is an eCommerce project transforming online shopping. It focuses on user-friendly design and easy navigation, ensuring a secure and enjoyable experience.",
    createdAt: "15-03-2022 10:00 AM",
    updatedAt: "15-03-2022 10:00 AM",
  };
  const clientInfo: ClientInfo = {
    clientName: "Nisha Sharma",
    companyName: "Schoenview",
    contactPerson: "Nisha Sharma",
    phone: "951-643-1584",
    email: "Alia.Dibbert@hotmail.com",
  };
  const estimates: Estimates = {
    estimatedStart: "24-02-2021 09:00 AM",
    actualStart: "24-02-2021 09:00 AM",
    estimatedEnd: "24-02-2021 09:00 AM",
    actualEnd: "24-02-2021 09:00 AM",
    estimatedCost: "$42,452.00",
    actualCost: "$72.00",
    labourCost: "$42.00",
    overheadCost: "$72.00",
    budget: "$72,000",
  };
  const documents: DocumentInfo[] = uploadedFiles.map((file) => ({
    name: file.name,
    uploadedBy: "Nisha Sharma",
    uploadedAt: "15-03-2022 10:00 AM",
  }));

  // Mock milestone data for preview
  const milestones: Milestone[] = [
    {
      id: 1,
      name: "Dashboard For Admin",
      assignedTo: "Ramesh Gupta",
      status: "Open",
      estimatedStart: "2021-02-24",
      estimatedEnd: "2021-03-24",
      tasks: [
        {
          id: 1,
          name: "Design Dashboard",
          description: "Create admin dashboard layout",
          assignedTo: "Ramesh Gupta",
          status: "In Progress",
          dueDate: "2021-02-28",
        },
      ],
    },
    {
      id: 2,
      name: "Customer Section",
      assignedTo: "Nisha Sharma",
      status: "Open",
      estimatedStart: "2021-03-01",
      estimatedEnd: "2021-04-01",
      tasks: [
        {
          id: 2,
          name: "Product List",
          description: "Implement product listing page",
          assignedTo: "Nisha Sharma",
          status: "Open",
          dueDate: "2021-03-15",
        },
        {
          id: 3,
          name: "Offer List",
          description: "Create offer management system",
          assignedTo: "Nisha Sharma",
          status: "Open",
          dueDate: "2021-03-30",
        },
      ],
    },
  ];

  const handleSubmit = (
    values: IAddProjectFormValues,
    actions: FormikHelpers<IAddProjectFormValues>
  ) => {
    // TODO: handle form submission
    // On successful validation, go to next step
    setMilestoneOption(values.milestoneOption);
    setStep(2);
    actions.setSubmitting(false);
  };

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
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <Step1BasicInfo {...formik} />
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
          onNext={() => setStep(3)}
          milestoneOption={milestoneOption}
        />
      )}
      {step === 3 && (
        <Step3UploadDocument
          onBack={() => setStep(2)}
          onNext={(files) => {
            setUploadedFiles(files);
            setStep(4);
          }}
        />
      )}
      {step === 4 && (
        <Step4Preview
          projectInfo={projectInfo}
          clientInfo={clientInfo}
          estimates={estimates}
          documents={documents}
          milestones={milestones}
          onSubmit={() => {
            setIsModalOpen(true);
          }}
        />
      )}
      {isModalOpen && <ProjectCreatedModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
