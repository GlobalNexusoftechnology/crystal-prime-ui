import { useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateDailyTaskStatusResponse } from "../types";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const UPDATE_DAILY_TASK_STATUS_MUTATION_KEY = "update-daily-task-status-mutation-key";

interface IUpdateDailyTaskStatusOptions {
  onSuccessCallback: (data: IUpdateDailyTaskStatusResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateDailyTaskStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateDailyTaskStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_DAILY_TASK_STATUS_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ id, payload }: { id: string; payload: { status: string } }) =>
      COMMUNITY_CLIENT.updateDailyTaskStatus(id, payload),
    onSuccess: (response: IUpdateDailyTaskStatusResponse) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateDailyTaskStatusMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateDailyTaskStatus: mutate,
  };
};
