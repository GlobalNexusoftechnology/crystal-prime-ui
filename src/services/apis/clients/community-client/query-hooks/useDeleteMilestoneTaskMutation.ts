import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const DELETE_MILESTONE_TASK_MUTATION_KEY = "delete-milestone-task-mutation-key";

interface IDeleteMilestoneTaskOptions {
  onSuccessCallback?: () => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteMilestoneTaskOptions) => {
  const { mutate, mutateAsync, isPending, error } = useMutation({
    mutationKey: [DELETE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteMilestoneTask,
    onSuccess: () => {
      onSuccessCallback?.();
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteMilestoneTask: mutate,
    onDeleteMilestoneTaskAsync: mutateAsync,
  };
}; 