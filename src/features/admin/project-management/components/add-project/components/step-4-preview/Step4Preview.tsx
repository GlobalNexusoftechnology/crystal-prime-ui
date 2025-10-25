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
import { useAllUsersQuery, useAuthStore } from "@/services";
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
  const { allUsersData } = useAllUsersQuery();
  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role.role;
  const isAdmin = userRole === "admin";

  const mappedUsers = (allUsersData?.data?.list ?? []).map(user => ({
    id: user.id,
    name: `${user.first_name} ${user.last_name}`.trim(),
  }));

  return (
    <div className="flex flex-col gap-8 ">
      {/* Info Summary */}
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <ProjectInfo projectInfoData={projectInfo} />
          <DocumentSection documentSectionData={documents} />
        </div>
        <div>
          <ClientInfo clientInfoData={clientInfo} />
          {isAdmin &&<ProjectEstimate projectEstimateData={estimates} />}
        </div>
      </div>

      {/* Milestone Table */}
      <div className="mb-4 ">
        <h3 className="text-lg  mb-4 ">Milestones</h3>
        <div className="overflow-x-auto border mt-4  border-gray-300 rounded-lg ">
          <table className="border-separate border-spacing-y-2 ">
            <thead>
              <tr className="text-gray-500 text-[0.9rem] ">
                <th className="text-left p-2  min-w-[15rem] ">Milestone Name</th>
                <th className="text-left  px-2 py-2   min-w-[15rem] ">Description</th>
                <th className="text-left  px-2 py-2   min-w-[14rem] ">Assigned To</th>
                <th className="text-left  px-2 py-2   min-w-[10rem] ">Status</th>
                <th className="text-left  px-2 py-2   min-w-[12rem] ">Estimated Start Date</th>
                <th className="text-left  px-2 py-2   min-w-[10rem] ">Estimated End Date</th>
                <th className="px-2 py-2  "></th>
              </tr>
            </thead>
            <tbody>
              {milestones?.length > 0 && milestones?.map((milestone) => (
                <PreviewMilestone key={milestone.id} milestone={milestone} users={mappedUsers} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Submit Button */}
      <div className="flex justify-start items-center mt-6  gap-4 ">
        <Button
          title="Back"
          variant="primary-outline"
          onClick={onBack}
          width="w-full md:w-[10rem] "
        />
        <Button
          title="Submit"
          onClick={onSubmit}
          width="w-full md:w-[10rem] "
        />
      </div>
    </div>
  );
}
