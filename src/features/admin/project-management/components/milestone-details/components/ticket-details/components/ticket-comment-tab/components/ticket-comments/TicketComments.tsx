"use client";

import { IApiError, formatIndiaTime } from "@/utils";
import toast from "react-hot-toast";
import {
  useGetAllTicketCommentsQuery,
  useCreateTicketCommentMutation,
} from "@/services/apis/clients/community-client/query-hooks";
import { ITicketCommentResponse, ICreateTicketCommentPayload } from "@/services/apis/clients/community-client/types";
import { AddTicketCommentModal } from "@/components";
import { useState } from "react";

type ITicketCommentsProps = {
  taskId: string;
  originalTitle: string;
  originalDescription: string;
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TicketComments({
  taskId,
  originalTitle,
  originalDescription,
  showForm,
  setShowForm,
}: ITicketCommentsProps) {
  const [newComment, setNewComment] = useState<ICreateTicketCommentPayload>({
    ticket_id: taskId,
    title: originalTitle || "",
    description: originalDescription || "",
    status: "Open",
    priority: "Medium",
    remark: ""
  });

  const {
    allTicketCommentsData,
    isLoading,
    isError,
    error,
    getAllTicketComments,
  } = useGetAllTicketCommentsQuery({ 
    ticketId: taskId, 
    enabled: !!taskId 
  });

  const { onCreateTicketComment, isPending: isCreating } = useCreateTicketCommentMutation({
    onSuccessCallback: () => {
      toast.success("Ticket comment created successfully!");
      setNewComment({
        ticket_id: taskId,
        title: originalTitle || "",
        description: originalDescription || "",
        status: "Open",
        priority: "Medium",
        remark: ""
      });
      setShowForm(false);
      getAllTicketComments();
    },
    onErrorCallback: (err: IApiError) => {
      toast.error(`Failed to create comment: ${err.message}`);
    },
  });

  // Show error state if task is not found
  if (isError && error?.message?.includes("Task not found")) {
    return (
      <div className="flex flex-col gap-8  p-4 ">
        <div className="flex flex-col items-center justify-center py-8 ">
          <div className="text-center">
            <div className="text-lg  font-semibold text-red-600 mb-2 ">
              Task Not Found
            </div>
            <div className="text-[0.9rem]  text-gray-600 mb-4 ">
              The task with ID{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">{taskId}</code>
              could not be found.
            </div>
            <div className="text-[0.9rem]  text-gray-500">
              This might happen if the task was deleted or the URL contains an
              invalid task ID.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleCreateComment = (values: ICreateTicketCommentPayload) => {
    if (!values.title && !values.description && !values.remark) {
      toast.error('Please provide at least a title, description, or remark');
      return;
    }
    onCreateTicketComment(values);
  };





  return (
    <div className="flex flex-col gap-8 ">
      {/* Tab Contents */}
      <div>
        <div className="flex flex-col gap-4 ">
          {showForm ? (
            <AddTicketCommentModal
              isOpen={showForm}
              onClose={() => setShowForm(false)}
              onSubmit={handleCreateComment}
              initialValues={newComment}
              isPending={isCreating}
            />
          ) : (
            <div className="flex flex-col gap-4 ">
              {isLoading ? (
                <div>Loading...</div>
              ) : allTicketCommentsData && allTicketCommentsData.length > 0 ? (
                <div className="space-y-4 ">
                  {allTicketCommentsData?.length > 0 && allTicketCommentsData?.map((comment: ITicketCommentResponse) => {
                    return (
                      <div
                        key={comment.id}
                        className="flex flex-col gap-4  bg-customGray border  border-grey-300 rounded-xl  p-4  text-[0.9rem]  text-[#1D2939] w-full"
                      >
                        <div className="flex justify-between gap-4  mb-2  font-medium text-[#1D2939]">
                          <span>
                            <span className="underline text-[1.1rem]  font-normal capitalize">
                              {comment.title || "No Title"}
                            </span>
                          </span>
                          <div className="flex justify-end flex-wrap gap-6 ">
                            <span className="underline">
                              <span className=" font-normal capitalize">
                                By: {comment.user.first_name} {comment.user.last_name}
                              </span>
                            </span>
                            <span className="underline text-primary">
                              <span className=" font-normal capitalize">
                                Status: {comment.status}
                              </span>
                            </span>
                            <span className="underline text-lightGreen ">
                              Created: {formatIndiaTime(comment.created_at, "toReadable")}
                            </span>
                            <span className="underline text-yellow-600">
                              <span className=" font-normal capitalize">
                                Priority: {comment.priority}
                              </span>
                            </span>
                          </div>
                        </div>
                        {comment.description && (
                          <div className="mb-2  capitalize">
                            {comment.description}
                          </div>
                        )}
                        <div className="mb-2  capitalize">
                          <strong>Remark:</strong>{" "}
                          <p>{comment.remark || "No remark provided"}</p>
                        </div>

                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="py-4 ">
                  <p className="text-gray-500 ">
                    No ticket comments found for this task
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
