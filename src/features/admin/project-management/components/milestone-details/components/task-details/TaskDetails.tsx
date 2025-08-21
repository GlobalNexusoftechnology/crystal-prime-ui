"use client";

import { useState } from "react";
import { Breadcrumb } from "@/features";
import { IProjectTaskResponse } from "@/services";
import { formatIndiaTime, buildUniversalIdToNameMapping } from "@/utils";
import { HeaderDetails } from "../../../header-details";
import { TaskEstimate, TaskInfo } from "./components";
import {
  useUpdateTaskStatusMutation,
  useMilestoneTaskDetailQuery,
} from "@/services";
import { CommentTabs } from "./components";
import { Tickets } from "./components/comment-tabs/components";

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

  const idToName = buildUniversalIdToNameMapping(taskData);

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb idToName={idToName} />
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
      {taskData.title === "Tickets" ? 
        <Tickets projectId={taskData?.milestone?.project?.id || ""} />
      :
        <CommentTabs projectId={taskData?.milestone?.project?.id}
          assignedTo={taskData?.assigned_to || ""}
          originalTitle={taskData.title}
          originalDescription={taskData.description || ""}
          taskId={taskData.id}/>
      }
    </section>
  );
}
