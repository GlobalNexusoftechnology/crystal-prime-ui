import { useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError, ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const UPLOAD_CLIENT_FROM_EXCEL_MUTATION_KEY = "upload-client-from-excel-mutation-key";

interface IUploadClientFromExcelOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccessCallback: (data: any) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUploadClientFromExcelMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadClientFromExcelOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_CLIENT_FROM_EXCEL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.uploadClientFromExcel,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadClientFromExcelMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadClientFromExcel: mutate,
  };
}; 