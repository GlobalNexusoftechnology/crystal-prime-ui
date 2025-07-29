"use client";

import { IApiError, formatIndiaTime } from "@/utils";
import toast from "react-hot-toast";
import {
  useAllDailyTaskQuery,
  useCreateDailyTaskMutation,
  useAllUsersQuery,
  IDailyTaskEntryResponse,
} from "@/services";
import { AddDailyTaskModal } from "@/components";

type IDailyTaskProps = {
  projectId: string;
  taskId: string;
  assignedTo: string;
  originalTitle: string;
  originalDescription: string;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function DailyTask({
  projectId,
  taskId,
  assignedTo,
  originalTitle,
  originalDescription,
  showForm,
  setShowForm,
}: IDailyTaskProps) {
  const {
    data: dailyTasks,
    refetchDailyTasks,
    isError,
    error,
    isLoading,
  } = useAllDailyTaskQuery({ projectId, taskId });
  const { allUsersData, isLoading: usersLoading } = useAllUsersQuery();
  const getUserName = (userId: string) => {
    if (!allUsersData || usersLoading) return userId;
    const user = allUsersData?.data?.list?.find((u) => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : userId;
  };

  const { createDailyTask, isPending } = useCreateDailyTaskMutation({
    onSuccessCallback: () => {
      toast.success("Daily task entry added successfully");
      setShowForm(false);
      refetchDailyTasks();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  // Show error state if task is not found
  if (isError && error?.message?.includes("Task not found")) {
    return (
      <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
        <div className="flex flex-col items-center justify-center py-8 2xl:py-[2vw]">
          <div className="text-center">
            <div className="text-lg 2xl:text-[1.1vw] font-semibold text-red-600 mb-2 2xl:mb-[0.5vw]">
              Task Not Found
            </div>
            <div className="text-[0.9rem] 2xl:text-[0.9vw] text-gray-600 mb-4 2xl:mb-[1vw]">
              The task with ID{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{projectId}</code>
              could not be found.
            </div>
            <div className="text-[0.9rem] 2xl:text-[0.9vw] text-gray-500">
              This might happen if the task was deleted or the URL contains an
              invalid task ID.
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
      {/* Tab Contents */}
      <div>
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          {showForm ? (
            <AddDailyTaskModal
              isOpen={showForm}
              onClose={() => setShowForm(false)}
              onSubmit={async (values) => {
                await createDailyTask({
                  project_id: projectId,
                  assigned_to: assignedTo,
                  task_title: values.task_title,
                  entry_date: values.entry_date,
                  description: values.description,
                  hours_spent: values.hours_spent,
                  status: values.status,
                  remarks: values.remarks,
                  priority: values.priority,
                });
              }}
              initialValues={{
                project_id: projectId,
                assigned_to: assignedTo,
                task_title: originalTitle || "",
                entry_date: new Date().toISOString().slice(0, 10),
                description: originalDescription || "",
                hours_spent: undefined,
                status: "",
                remarks: "",
                priority: "Medium",
              }}
              isPending={isPending}
            />
          ) : (
            <div className="flex flex-col gap-4 2xl:gap-[1vw]">
              {isLoading ? (
                <div>Loading...</div>
              ) : dailyTasks && dailyTasks.length > 0 ? (
                <div className="space-y-4 2xl:space-y-[1vw]">
                  {dailyTasks.map((task: IDailyTaskEntryResponse) => {
                    return (
                      <div
                        key={task.id}
                        className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-[0.9rem] 2xl:text-[0.9vw] text-[#1D2939] w-full"
                      >
                        <div className="flex justify-between gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
                          <span>
                            <span className="underline text-[1.1rem] 2xl:text-[1.1vw] font-normal">
                              {task.task_title || "-"}
                            </span>
                          </span>
                          <div className="flex justify-end flex-wrap gap-6 2xl:gap-[1.5vw]">
                            <span className="underline">
                              <span className="2xl:text-[1.1vw] font-normal">
                                Assigned To:{" "}
                                {task.user
                                  ? `${task.user.first_name} ${task.user.last_name}`
                                  : getUserName(assignedTo)}
                              </span>
                            </span>
                            <span className="underline">
                              <span className="2xl:text-[1.1vw] font-normal">
                                Hours Spent: {task.hours_spent}
                              </span>
                            </span>
                            <span className="underline text-primary">
                              <span className="2xl:text-[1.1vw] font-normal">
                                Status: {task.status}
                              </span>
                            </span>
                            <span className="underline text-lightGreen 2xl:text-[1.1vw]">
                              Created At:{" "}
                              {formatIndiaTime(task.created_at, "toReadable")}
                            </span>
                            <span className="underline text-yellow-600">
                              <span className="2xl:text-[1.1vw] font-normal">
                                Priority: {task.priority || "-"}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="mb-2 2xl:mb-[0.5vw]">
                          {task.description}
                        </div>
                        <div className="mb-2 2xl:mb-[0.5vw]">
                          <strong>Remark:</strong>{" "}
                          <p>{task.remarks || "No description"}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 2xl:py-[1vw]">
                  <p className="text-gray-500 2xl:text-[1.1vw]">
                    No daily task entries found for this project
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
