import { useMutation, useQueryClient } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { ICreateEILogResponse } from '../types';
import { errorLogToRemoteUtil } from '@/utils';
import { ErrorEventsEnum, IApiError } from '@/utils';

const CREATE_EI_LOG_MUTATION_KEY = 'create-ei-log-mutation-key';
const NOTIFICATIONS_QUERY_KEY = 'notifications-query-key';

interface ICreateEILogOptions {
  onSuccessCallback: (response: ICreateEILogResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create EI log
 */
export const useCreateEILogMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateEILogOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_EI_LOG_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createEILog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateEILogMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createEILog: mutate,
  };
}; 