import { IUploadLeadFromExcelResponse, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError, ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const UPLOAD_LEAD_FROM_EXCEL_MUTATION_KEY = "upload-lead-from-excel-mutation-key";

interface IUploadAttachmentOptions {
  onSuccessCallback: (data: IUploadLeadFromExcelResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUploadLeadFromExcelMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadAttachmentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_LEAD_FROM_EXCEL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.uploadLeadFromExcel,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadLeadFromExcelMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadLeadFromExcel: mutate,
  };
};
