import React from "react";
import {
  ClientInfo,
  DocumentSection,
  ProjectEstimate,
  ProjectInfo,
} from "../../../project-details/components";
import { Button } from "@/components";
import { PreviewMilestone } from "./components";

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

interface Step4PreviewProps {
  projectInfo: ProjectInfo;
  clientInfo: ClientInfo;
  estimates: Estimates;
  documents: DocumentInfo[];
  milestones: Milestone[];
  onBack: () => void;
  onSubmit: () => void;
}

export function Step4Preview({
  onBack,
  projectInfo,
  clientInfo,
  estimates,
  documents,
  milestones,
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
      <div className="mb-4 2xl:mb-[1vw]">
        <h3 className="text-lg 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Milestones</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="text-left p-2 2xl:p-[0.5vw]">Milestone Name</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Assigned To</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Status</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated Start Date</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated End Date</th>
                <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone) => (
                <PreviewMilestone key={milestone.id} milestone={milestone} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-start items-center mt-6 2xl:mt-[1.5vw] gap-4 2xl:gap-[1vw]">
        <Button
          title="Back"
          variant="primary-outline"
          onClick={onBack}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
        <Button
          title="Submit"
          onClick={onSubmit}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
      </div>
    </div>
  );
}
