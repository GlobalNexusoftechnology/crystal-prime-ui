import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const UPDATE_TASK_STATUS_MUTATION_KEY = "update-task-status-mutation-key";

interface IUpdateTaskStatusOptions {
  onSuccessCallback: (data: {
    data: {
      task: { status: string };
      milestone: { status: string };
      project: { status: string };
    };
  }) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateTaskStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateTaskStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_TASK_STATUS_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ taskId, status }: { taskId: string; status: string }) =>
      COMMUNITY_CLIENT.updateTaskStatus(taskId, status) as unknown as Promise<{
        data: {
          task: { status: string };
          milestone: { status: string };
          project: { status: string };
        };
      }>,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateTaskStatusMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateTaskStatus: mutate,
  };
}; 