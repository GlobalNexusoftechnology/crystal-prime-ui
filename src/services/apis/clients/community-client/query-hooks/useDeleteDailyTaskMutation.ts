import { useMutation } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { IDeleteDailyTaskEntryResponse } from '../types';
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from '@/utils';

const DELETE_DAILY_TASK_ENTRY_MUTATION_KEY = 'delete-daily-task-entry-mutation-key';

interface IDeleteDailyTaskEntryOptions {
  onSuccessCallback: (data: IDeleteDailyTaskEntryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteDailyTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteDailyTaskEntryOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_DAILY_TASK_ENTRY_MUTATION_KEY],
    networkMode: 'always',
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteDailyTaskEntry,
    onSuccess: (response: IDeleteDailyTaskEntryResponse) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: 'Error in useDeleteDailyTaskMutation',
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    deleteDailyTask: mutate,
  };
}; 