"use client";

import { Breadcrumb } from "@/features";
import { IProjectTaskResponse } from "@/services";
import { formattingDate } from "@/utils";
import { HeaderDetails } from "../../../header-details";
import { DailyTask, TaskEstimate, TaskInfo } from "./components";
import { useState } from "react";
import {
  useUpdateTaskStatusMutation,
  useMilestoneTaskDetailQuery,
} from "@/services";

export function TaskDetails({ taskData }: { taskData: IProjectTaskResponse }) {
  const [status, setStatus] = useState(taskData.status || "Open");
  const [milestoneStatus, setMilestoneStatus] = useState(
    taskData.milestone?.status || "Open"
  );
  const [projectStatus, setProjectStatus] = useState(
    taskData.milestone?.project?.status || "Open"
  );
  const { refetchMilestoneTaskDetail } = useMilestoneTaskDetailQuery(
    taskData.id
  );
  const { onUpdateTaskStatus } = useUpdateTaskStatusMutation({
    onSuccessCallback: (response) => {
      setStatus(response.data.task.status);
      setMilestoneStatus(response.data.milestone.status);
      setProjectStatus(response.data.project.status);
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
      <div className="flex gap-4 mb-2">
        <div>
          Milestone Status:{" "}
          <span className="font-semibold">{milestoneStatus}</span>
        </div>
        <div>
          Project Status: <span className="font-semibold">{projectStatus}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="border-r">
          <TaskInfo
            taskInfoData={{
              title: taskData.title,
              assigned_to: taskData.assigned_to || "",
              description: taskData.description || "",
              created_at: formattingDate(
                `${taskData.created_at}`,
                "toReadable"
              ),
              updated_at: formattingDate(
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
                formattingDate(`${taskData.due_date}`, "toReadable") || "",
            }}
          />
        </div>
      </div>
      <DailyTask taskId={taskData?.id || ""} />
    </section>
  );
}
