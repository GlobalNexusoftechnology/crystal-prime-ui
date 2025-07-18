import { useMutation, useQueryClient } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { IDeleteEILogResponse } from '../types';
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from '@/utils';

const DELETE_EI_LOG_MUTATION_KEY = 'delete-ei-log-mutation-key';
const NOTIFICATIONS_QUERY_KEY = 'notifications-query-key';

interface IDeleteEILogOptions {
  onSuccessCallback: (response: IDeleteEILogResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete EI log
 */
export const useDeleteEILogMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteEILogOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_EI_LOG_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteEILog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteEILogMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteEILog: mutate,
  };
}; 