import { useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IDailyTaskEntryResponse } from "../types";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const UPDATE_DAILY_TASK_ENTRY_MUTATION_KEY = "update-daily-task-entry-mutation-key";

interface IUpdateDailyTaskEntryOptions {
  onSuccessCallback: (data: IDailyTaskEntryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateDailyTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateDailyTaskEntryOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_DAILY_TASK_ENTRY_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateDailyTaskEntry,
    onSuccess: (response: IDailyTaskEntryResponse) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateDailyTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateDailyTask: mutate,
  };
}; 