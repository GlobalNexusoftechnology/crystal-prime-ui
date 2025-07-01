"use client";

import { Breadcrumb } from "@/features";
import { IProjectTaskResponse } from "@/services";
import { formatIndiaTime } from "@/utils";
import { HeaderDetails } from "../../../header-details";
import { DailyTask, TaskEstimate, TaskInfo } from "./components";
import { useState } from "react";
import {
  useUpdateTaskStatusMutation,
  useMilestoneTaskDetailQuery,
} from "@/services";

export function TaskDetails({ taskData }: { taskData: IProjectTaskResponse }) {
  const [status, setStatus] = useState(taskData.status || "Open");
  const { refetchMilestoneTaskDetail } = useMilestoneTaskDetailQuery(
    taskData.id
  );
  const { onUpdateTaskStatus } = useUpdateTaskStatusMutation({
    onSuccessCallback: (response) => {
      setStatus(response.data.task.status);
      refetchMilestoneTaskDetail();
    },
    onErrorCallback: (err) => {
      // Optionally show a toast or error message
      console.error(err);
    },
  });

  const handleStatusChange = (newStatus: string) => {
    if (taskData.id && newStatus !== status) {
      onUpdateTaskStatus({ taskId: taskData.id, status: newStatus });
    }
  };

  const validOptions = ["Open", "In Progress", "Completed"];
  const safeStatus = validOptions.includes(status) ? status : "Open";

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <HeaderDetails
        title={taskData.title}
        status={safeStatus}
        progress={"0 / 0"}
        onStatusChange={handleStatusChange}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <TaskInfo
            taskInfoData={{
              title: taskData.title,
              assigned_to: taskData.assigned_to || "",
              description: taskData.description || "",
              created_at: formatIndiaTime(
                `${taskData.created_at}`,
                "toReadable"
              ),
              updated_at: formatIndiaTime(
                `${taskData.updated_at}`,
                "toReadable"
              ),
            }}
          />
        </div>
        <div>
          <TaskEstimate
            taskEstimateData={{
              due_date:
                formatIndiaTime(`${taskData.due_date}`, "toReadable") || "",
            }}
          />
        </div>
      </div>
      <DailyTask
        projectId={taskData?.milestone?.project?.id}
        userId={taskData?.assigned_to || ""}
        taskTitle={taskData.title}
        description={taskData.description || ""}
      />
    </section>
  );
}
