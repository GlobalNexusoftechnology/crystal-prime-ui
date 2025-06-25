import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IMilestoneTaskPayload, IMilestoneTaskResponse } from "../types";

const CREATE_MILESTONE_TASK_MUTATION_KEY = "create-milestone-task-mutation-key";

interface ICreateMilestoneTaskOptions {
  onSuccessCallback: (data: IMilestoneTaskResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateMilestoneTaskOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createMilestoneTask,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateMilestoneTask: mutate,
  };
}; 