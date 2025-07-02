"use client";

import { Breadcrumb } from "@/features";
import { HeaderDetails } from "../header-details";
import { IProjectMilestoneResponse } from '@/services';
import { formatIndiaTime } from "@/utils";
import { MilestoneEstimate, MilestoneInfo, TaskTabs } from "./components";
import { buildUniversalIdToNameMapping } from "@/utils/helpers/buildIdToNameMapping";

export function MilestoneDetails({ milestoneData }: { milestoneData: IProjectMilestoneResponse }) {
  const idToName = buildUniversalIdToNameMapping(milestoneData);
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb idToName={idToName} />
      <HeaderDetails
        title={milestoneData.name}
        status={milestoneData.status || 'N/A'}
        progress={'0 / 0'}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <MilestoneInfo milestoneInfoData={{
            name: milestoneData.name,
            assigned_to: milestoneData.assigned_to || '',
            description: milestoneData.description,
            created_at: formatIndiaTime(milestoneData.created_at, "toReadable"),
            updated_at: formatIndiaTime(milestoneData.updated_at, "toReadable"),
          }} />
        </div>
        <MilestoneEstimate milestoneEstimateData={{
          start_date: milestoneData.start_date ? formatIndiaTime(milestoneData.start_date, "toReadable") : '--',
          end_date:  milestoneData.end_date ? formatIndiaTime(milestoneData.end_date, "toReadable") : '--',
          actual_start: milestoneData.actual_date ? formatIndiaTime(milestoneData.actual_date, "toReadable") : '--',
        }} />
      </div>
      <TaskTabs
        tasksData={(milestoneData.tasks || []).map(task => ({
          id: String(task.id),
          name: task.title,
          description: task.description || "",
          assigned_to: task.assigned_to || "",
          status: task.status || "",
          due_date: task.due_date || "",
          milestoneId: milestoneData.id,
          projectId: milestoneData.project.id || ""
        }))}
        milestoneId={milestoneData.id}
      />
    </section>
  );
}
