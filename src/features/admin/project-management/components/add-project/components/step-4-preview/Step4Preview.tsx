import React from "react";
import {
  ClientInfo,
  DocumentSection,
  ProjectEstimate,
  ProjectInfo,
} from "../../../project-details/components";
import { Button } from "@/components";
import { PreviewMilestone } from "./components";
import { IClientInfo, IDocumentInfo, IEstimates, IProjectInfo } from "@/constants";
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

interface Step4PreviewProps {
  projectInfo: IProjectInfo;
  clientInfo: IClientInfo;
  estimates: IEstimates;
  documents: IDocumentInfo[];
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
          <table className="border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="text-left p-2 2xl:p-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Milestone Name</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[12rem] 2xl:min-w-[12vw]">Description</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[14rem] 2xl:min-w-[14vw]">Assigned To</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Status</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Estimated Start Date</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Estimated End Date</th>
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
