import { useMutation, useQueryClient } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import {  IUpdateEILogResponse } from '../types';
import { errorLogToRemoteUtil } from '@/utils';
import { ErrorEventsEnum, IApiError } from '@/utils';

const UPDATE_EI_LOG_MUTATION_KEY = 'update-ei-log-mutation-key';
const NOTIFICATIONS_QUERY_KEY = 'notifications-query-key';

interface IUpdateEILogOptions {
  onSuccessCallback: (response: IUpdateEILogResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateEILogMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateEILogOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_EI_LOG_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateEILog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateEILogMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditEILog: mutate,
  };
}; 