"use client";

import { Breadcrumb } from "@/features";
import { IProjectTaskResponse } from '@/services';
import { formatDate } from "@/utils";
import { HeaderDetails } from "../../../header-details";
import { DailyTask, TaskEstimate, TaskInfo } from "./components";

export function TaskDetails({ taskData }: { taskData: IProjectTaskResponse }) {
  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title={taskData.title}
        status={taskData.status || 'N/A'}
        progress={'0 / 0'}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <TaskInfo taskInfoData={{
            title: taskData.title,
            assigned_to: taskData.assigned_to || '',
            description: taskData.description || '',
            created_at: formatDate(`${taskData.created_at}`),
            updated_at: formatDate(`${taskData.updated_at}`),
          }} />
          <div>
            <TaskEstimate taskEstimateData={{
              due_date: taskData.due_date || '',
            }} />
          </div>
        </div>
        <DailyTask
          taskId={taskData?.id || ""}
        />
      </div>
    </section>
  );
}
