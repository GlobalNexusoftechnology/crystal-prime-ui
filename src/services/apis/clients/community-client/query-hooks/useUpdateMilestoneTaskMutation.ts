import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectTask, IProjectTaskResponse } from "../types";

const UPDATE_MILESTONE_TASK_MUTATION_KEY = "update-milestone-task-mutation-key";

interface IUpdateMilestoneTaskOptions {
  onSuccessCallback: (data: IProjectTaskResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateMilestoneTaskOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ taskId, payload }: { taskId: string; payload: ICreateProjectTask }) =>
      COMMUNITY_CLIENT.updateMilestoneTask(taskId, payload),
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateMilestoneTask: mutate,
  };
}; 