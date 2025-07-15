"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import { IApiError, formatIndiaTime } from "@/utils";
import toast from "react-hot-toast";
import { useState, useEffect, useRef } from "react";
import {
  ICreateDailyTaskEntryPayload,
  useAllDailyTaskQuery,
  useCreateDailyTaskMutation,
  useAllUsersQuery,
  IUsersDetails,
} from "@/services";
import { HoursSpentInput } from "@/components/hours-spent-input";
import { Dropdown } from "@/components";

const priorityOptions = [
  { label: "High", value: "High" },
  { label: "Medium", value: "Medium" },
  { label: "Low", value: "Low" },
];

const dailyTaskValidationSchema = Yup.object().shape({
  hours_spent: Yup.number()
    .positive("Must be a positive number")
    .required("Hours spent is required"),
  status: Yup.string().required("Status is required"),
  remarks: Yup.string().required("Remark is required"),
  priority: Yup.string().required("Priority is required"),
});

type IDailyTaskProps = {
  projectId: string;
  assignedTo: string;
  originalTitle: string;
  originalDescription: string;
};

const tabs = ["Daily Tasks"];

const statusOptions = [
  { label: "Pending", value: "Pending" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

export function DailyTask({ projectId, assignedTo, originalTitle, originalDescription }: IDailyTaskProps) {
  const {
    data: dailyTasks,
    refetchDailyTasks,
    isError,
    error,
    isLoading,
  } = useAllDailyTaskQuery({ projectId });
  const { allUsersData, isLoading: usersLoading } = useAllUsersQuery();
  const getUserName = (userId: string) => {
    if (!allUsersData || usersLoading) return userId;
    const user = (allUsersData as IUsersDetails[]).find((u) => u.id === userId);
    return user ? `${user.first_name} ${user.last_name}` : userId;
  };
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Daily Tasks");

  const { createDailyTask, isPending } = useCreateDailyTaskMutation({
    onSuccessCallback: () => {
      toast.success("Daily task entry added successfully");
      formik.resetForm();
      setShowForm(false);
      refetchDailyTasks();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(err.message);
    },
  });

  const formik = useFormik<ICreateDailyTaskEntryPayload & { remarks: string }>({
    initialValues: {
      project_id: projectId,
      assigned_to: assignedTo,
      task_title: originalTitle || "",
      entry_date: new Date().toISOString().slice(0, 10),
      description: originalDescription || "",
      hours_spent: undefined,
      status: "",
      remarks: "",
      priority: "Medium",
    },
    validationSchema: dailyTaskValidationSchema,
    onSubmit: async (values) => {
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
    },
  });

  // Track if user has edited title/description
  const userEditedTitle = useRef(false);
  const userEditedDescription = useRef(false);

  // Watch for changes in originalTitle/originalDescription and update formik if not edited by user
  useEffect(() => {
    if (!userEditedTitle.current) {
      formik.setFieldValue("task_title", originalTitle || "");
    }
    if (!userEditedDescription.current) {
      formik.setFieldValue("description", originalDescription || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [originalTitle, originalDescription]);

  // Show error state if task is not found
  if (isError && error?.message?.includes("Task not found")) {
    return (
      <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
        <div className="flex gap-8 2xl:gap-[2vw] items-center">
          <div className="flex gap-8 2xl:gap-[2vw]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${
                  activeTab === tab ? "" : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveTab(tab);
                  setShowForm(false);
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-8 2xl:py-[2vw]">
          <div className="text-center">
            <div className="text-lg 2xl:text-[1.1vw] font-semibold text-red-600 mb-2 2xl:mb-[0.5vw]">
              Task Not Found
            </div>
            <div className="text-[0.9rem] 2xl:text-[0.9vw] text-gray-600 mb-4 2xl:mb-[1vw]">
              The task with ID{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{projectId}</code>{" "}
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
      {/* Tabs */}
      <div className="flex flex-wrap gap-8 2xl:gap-[2vw] items-center">
        <div className="flex gap-8 2xl:gap-[2vw]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${
                activeTab === tab ? "" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw]"
        >
          <span>
            {showForm ? (
              "Close"
            ) : (
              <Button
                title="Add Daily Task Comment"
                variant="primary-outline"
              />
            )}
          </span>
        </div>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Daily Tasks" && (
          <div className="flex flex-col gap-4 2xl:gap-[1vw]">
            {showForm ? (
              <ModalOverlay
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                modalTitle="Add Daily Task Comment"
                modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
                >
                  <InputField
                    label="Task Title"
                    name="task_title"
                    placeholder="Enter Task Title"
                    value={formik.values.task_title}
                    onChange={e => {
                      userEditedTitle.current = true;
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.task_title
                        ? formik.errors.task_title
                        : undefined
                    }
                  />
                  <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter Description"
                    value={formik.values.description}
                    onChange={e => {
                      userEditedDescription.current = true;
                      formik.handleChange(e);
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.description
                        ? formik.errors.description
                        : undefined
                    }
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <HoursSpentInput
                      value={formik.values.hours_spent || ""}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.hours_spent
                          ? formik.errors.hours_spent
                          : undefined
                      }
                    />
                    <Dropdown
                      label="Status"
                      options={statusOptions}
                      value={formik.values.status || ""}
                      onChange={(value) =>
                        formik.setFieldValue("status", value)
                      }
                      error={
                        formik.touched.status ? formik.errors.status : undefined
                      }
                    />
                  </div>
                  <Dropdown
                    label="Priority"
                    options={priorityOptions}
                    value={formik.values.priority || ""}
                    onChange={(value) => formik.setFieldValue("priority", value)}
                    error={formik.touched.priority ? formik.errors.priority : undefined}
                  />
                  <InputField
                    label="Remark"
                    name="remarks"
                    placeholder="Enter Remark"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.remarks ? formik.errors.remarks : undefined
                    }
                  />
                  <div className="flex gap-4">
                    <Button
                      title="Cancel"
                      variant="primary-outline"
                      type="button"
                      onClick={() => setShowForm(false)}
                      width="w-full"
                    />
                    <Button
                      title={isPending ? "Adding..." : "Add Daily Task Comment"}
                      type="submit"
                      width="w-full"
                      disabled={isPending}
                    />
                  </div>
                </form>
              </ModalOverlay>
            ) : (
              <div className="flex flex-col gap-4 2xl:gap-[1vw]">
                {isLoading ? (
                  <div>Loading...</div>
                ) : dailyTasks && dailyTasks.length > 0 ? (
                  <div className="space-y-4 2xl:space-y-[1vw]">
                    {dailyTasks.map((task) => (
                      <div
                        key={task.id}
                        className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-[0.9rem] 2xl:text-[0.9vw] text-[#1D2939] w-full"
                      >
                        <div className="flex justify-between flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
                          <span>
                            <span className="underline text-[1.1rem] 2xl:text-[1.1vw] font-normal">
                              {task.task_title || "-"}
                            </span>
                          </span>
                          <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
                          <span className="underline">
                            <span className="2xl:text-[1.1vw] font-normal">
                              Assigned To: {getUserName(assignedTo)}
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
                            Created At: {formatIndiaTime(task.created_at, 'toReadable')}
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
                    ))}
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
        )}
      </div>
    </div>
  );
}
