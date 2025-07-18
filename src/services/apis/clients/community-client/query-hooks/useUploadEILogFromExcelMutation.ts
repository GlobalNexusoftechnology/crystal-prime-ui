import { useMutation, useQueryClient } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { IUploadEILogFromExcelResponse } from '../types';
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from '@/utils';

const UPLOAD_EI_LOG_FROM_EXCEL_MUTATION_KEY = 'upload-ei-log-from-excel-mutation-key';
const NOTIFICATIONS_QUERY_KEY = 'notifications-query-key';

interface IUploadEILogFromExcelOptions {
  onSuccessCallback: (response: IUploadEILogFromExcelResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to upload EI logs from Excel
 */
export const useUploadEILogFromExcelMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadEILogFromExcelOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_EI_LOG_FROM_EXCEL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.uploadEILogFromExcel,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadEILogFromExcelMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadEILogFromExcel: mutate,
  };
}; 