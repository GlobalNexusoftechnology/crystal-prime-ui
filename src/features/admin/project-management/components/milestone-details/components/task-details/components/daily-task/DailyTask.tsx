"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputField, ModalOverlay } from "@/components";
import {
  useAuthStore,
  useCreateTaskCommentMutation,
  useGetAllTaskCommentsQuery,
  ICreateTaskCommentPayload,
} from "@/services";
import { IApiError, formatDate } from "@/utils";
import toast from "react-hot-toast";
import { useState } from "react";

// Comment validation schema
const commentValidationSchema = Yup.object().shape({
  remarks: Yup.string().required("Comment is required"),
});

interface IFollowupsProps {
  taskId: string;
}

const tabs = ["Comments"];

export function DailyTask({ taskId }: IFollowupsProps) {
  const {
    allTaskCommentsData: commentData,
    getAllTaskComments,
    isError,
    error,
  } = useGetAllTaskCommentsQuery({ taskId });
  const { activeSession } = useAuthStore();
  const userId = activeSession?.user?.id;
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("Comments");

  const { onCreateTaskComment, isPending } = useCreateTaskCommentMutation({
    onSuccessCallback: () => {
      toast.success("Comment added successfully");
      formik.resetForm();
      setShowForm(false);
      getAllTaskComments();
    },
    onErrorCallback: (err: IApiError) => {
      if (err.message.includes("Task not found")) {
        toast.error("Task not found. Please check if the task exists.");
      } else {
        toast.error(err.message);
      }
    },
  });

  const formik = useFormik<ICreateTaskCommentPayload>({
    initialValues: {
      task_id: taskId,
      assigned_to: userId || "",
      remarks: "",
    },
    validationSchema: commentValidationSchema,
    onSubmit: async (values) => {
      if (!taskId) {
        toast.error("Task ID is missing");
        return;
      }
      await onCreateTaskComment({ ...values, task_id: taskId });
    },
  });

  // Show error state if task is not found
  if (isError && error?.message?.includes("Task not found")) {
    return (
      <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
        <div className="flex gap-8 2xl:gap-[2vw] items-center">
          <div className="flex gap-8 2xl:gap-[2vw]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${activeTab === tab
                  ? ""
                  : "text-gray-500"
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
            <div className="text-sm 2xl:text-[0.9vw] text-gray-600 mb-4 2xl:mb-[1vw]">
              The task with ID <code className="bg-gray-100 px-2 py-1 rounded">{taskId}</code> could not be found.
            </div>
            <div className="text-sm 2xl:text-[0.9vw] text-gray-500">
              This might happen if the task was deleted or the URL contains an invalid task ID.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
      {/* Tabs */}
      <div className="flex gap-8 2xl:gap-[2vw] items-center">
        <div className="flex gap-8 2xl:gap-[2vw]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${activeTab === tab
                ? ""
                : "text-gray-500"
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
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw]"
        >
          <span>
            {showForm ? (
              "Close"
            ) : (
              <>
                {activeTab === "Comments" ? (
                  <Button title="Add followup" variant="primary-outline" />
                ) : (
                  null
                )}
              </>
            )}
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Comments" && (
          <div className="flex flex-col gap-4 2xl:gap-[1vw]">
            {showForm ? (
              <ModalOverlay
                isOpen={showForm}
                onClose={() => setShowForm(false)}
                modalTitle="Add Comment"
                modalClassName="w-full md:w-[31rem] 2xl:w-[31vw]"
              >
                <form
                  onSubmit={formik.handleSubmit}
                  className="flex flex-col gap-6 2xl:gap-[1.5vw] bg-customGray border 2xl:border-[0.1vw] p-3 2xl:p-[0.75vw] rounded-md 2xl:rounded-[0.375vw] space-y-1 mb-3 2xl:mb-[0.75vw]"
                >
                  <InputField
                    label="Comment"
                    name="remarks"
                    placeholder="Enter your comment"
                    value={formik.values.remarks}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.remarks ? formik.errors.remarks : undefined}
                  />
                  <div className="flex items-center gap-4 2xl:gap-[1vw]">
                    <Button
                      title="Cancel"
                      variant="primary-outline"
                      type="button"
                      onClick={() => setShowForm(false)}
                      width="w-full"
                    />
                    <Button
                      title={isPending ? "Adding..." : "Add Comment"}
                      type="submit"
                      width="w-full"
                      disabled={isPending}
                    />
                  </div>
                </form>
              </ModalOverlay>
            ) : (
              <div className="flex flex-col gap-4 2xl:gap-[1vw]">
                {commentData && commentData.length > 0 ? (
                  <div className="space-y-4 2xl:space-y-[1vw]">
                    {commentData.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-sm 2xl:text-[0.9vw] text-[#1D2939] w-full"
                      >
                        <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
                          <span>
                            <span className="2xl:text-[1.1vw] font-normal">
                              Assigned To:{" "}
                            </span>
                            <span className="underline 2xl:text-[1.1vw]">
                              {comment.assignedTo
                                ? `${comment.assignedTo.first_name} ${comment.assignedTo.last_name}`
                                : "Unassigned"}
                            </span>
                          </span>
                        </div>

                        <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw]">
                          {comment.remarks || "No comment provided"}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 2xl:gap-[1vw] font-medium">
                          <p className="text-lightGreen 2xl:text-[1.1vw]">
                            Created: {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-4 2xl:py-[1vw]">
                    <p className="text-gray-500 2xl:text-[1.1vw]">
                      No comments found for this task
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
