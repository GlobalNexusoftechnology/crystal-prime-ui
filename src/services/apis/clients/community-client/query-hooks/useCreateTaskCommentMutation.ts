import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ITaskCommentResponse } from "../types";

const CREATE_TASK_COMMENT_MUTATION_KEY = "create-task-comment-mutation-key";

interface ICreateTaskCommentOptions {
  onSuccessCallback: (data: ITaskCommentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateTaskCommentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateTaskCommentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_TASK_COMMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createTaskComment,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateTaskCommentMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateTaskComment: mutate,
  };
}; 