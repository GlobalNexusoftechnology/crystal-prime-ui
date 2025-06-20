import React from "react";
import { ClientInfo, DocumentSection, ProjectEstimate, ProjectInfo } from "../../../project-details/components";

// interface Task {
//   id: number;
//   name: string;
//   description: string;
//   assignedTo: string;
//   status: string;
//   dueDate: string;
// }

// interface Milestone {
//   id: number;
//   name: string;
//   assignedTo: string;
//   status: string;
//   estimatedStart: string;
//   estimatedEnd: string;
//   tasks: Task[];
// }

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

interface Step4PreviewProps {
  projectInfo: ProjectInfo;
  clientInfo: ClientInfo;
  estimates: Estimates;
  documents: DocumentInfo[];
  // milestones: Milestone[];
  onSubmit: () => void;
}

export function Step4Preview({
  projectInfo,
  clientInfo,
  estimates,
  documents,
  // milestones,
  onSubmit,
}: Step4PreviewProps) {
  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw]">
      {/* Info Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <ProjectInfo projectInfoData={projectInfo} />
          <DocumentSection documentSectionData={documents} />
        </div>
        <div>
          <ClientInfo clientInfoData={clientInfo} />
          <ProjectEstimate projectEstimateData={estimates} />
        </div>
      </div>
      {/* Milestone Table */}

      {/* Submit Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-[#4E5EFF] text-white px-8 py-2 rounded-md 2xl:rounded-[0.5vw] font-medium hover:bg-[#3b47cc] transition"
          onClick={onSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
