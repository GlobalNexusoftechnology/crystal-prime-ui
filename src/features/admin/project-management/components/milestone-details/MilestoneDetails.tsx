"use client";

import { Breadcrumb } from "@/features";
import { HeaderDetails } from "../header-details";
import { IProjectMilestoneResponse } from '@/services';
import { formatDate } from "@/utils";
import { MilestoneEstimate, MilestoneInfo, TaskTabs } from "./components";

export function MilestoneDetails({ milestoneData }: { milestoneData: IProjectMilestoneResponse }) {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
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
            created_at: formatDate(`${milestoneData.created_at}`),
            updated_at: formatDate(`${milestoneData.updated_at}`),
          }} />
        </div>
        <MilestoneEstimate milestoneEstimateData={{
          start_date: formatDate(`${milestoneData.start_date}`) || '',
          end_date: formatDate(`${milestoneData.end_date}`) || '',
          actual_start: milestoneData.actual_date ? formatDate(`${milestoneData.actual_date}`) : '--',
        }} />
      </div>
      <TaskTabs
        tasksData={(milestoneData.tasks || []).map(task => ({
          id: Number(task.id),
          name: task.title,
          description: task.description || "",
          assignedTo: task.assigned_to || "",
          status: task.status || "",
          dueDate: task.due_date || "",
        }))}
      />
    </section>
  );
}
