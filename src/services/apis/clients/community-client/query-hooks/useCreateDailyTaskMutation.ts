import { ICreateDailyTaskEntryResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const CREATE_DAILY_TASK_ENTRY_MUTATION_KEY = "create-daily-task-entry-mutation-key";

interface ICreateDailyTaskEntryOptions {
  onSuccessCallback: (data: ICreateDailyTaskEntryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateDailyTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateDailyTaskEntryOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_DAILY_TASK_ENTRY_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createDailyTaskEntry,
    onSuccess: (response: ICreateDailyTaskEntryResponse) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateDailyTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createDailyTask: mutate,
  };
}; 