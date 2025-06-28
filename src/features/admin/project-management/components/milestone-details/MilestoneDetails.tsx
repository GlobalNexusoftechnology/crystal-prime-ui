"use client";

import { Breadcrumb } from "@/features";
import { HeaderDetails } from "../header-details";
import { IProjectMilestoneResponse } from '@/services';
import { formattingDate } from "@/utils";
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
            created_at: formattingDate(milestoneData.created_at, "toReadable"),
            updated_at: formattingDate(milestoneData.updated_at, "toReadable"),
          }} />
        </div>
        <MilestoneEstimate milestoneEstimateData={{
          start_date: milestoneData.start_date ? formattingDate(milestoneData.start_date, "toReadable") : '--',
          end_date:  milestoneData.end_date ? formattingDate(milestoneData.end_date, "toReadable") : '--',
          actual_start: milestoneData.actual_date ? formattingDate(milestoneData.actual_date, "toReadable") : '--',
        }} />
      </div>
      <TaskTabs
        tasksData={(milestoneData.tasks || []).map(task => ({
          id: String(task.id),
          name: task.title,
          description: task.description || "",
          assignedTo: task.assigned_to || "",
          status: task.status || "",
          dueDate: task.due_date || "",
          milestoneId: milestoneData.id,
          projectId: milestoneData.project.id || ""
        }))}
      />
    </section>
  );
}
