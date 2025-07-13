// hooks/useUploadAttachmentMutation.ts

import { IUploadAttachmentResponse, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError, ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const UPLOAD_EI_LOG_ATTACHMENT_MUTATION_KEY = "upload-ei-log-attachment-mutation-key";

interface IUploadEILogAttachmentOptions {
  onSuccessCallback: (data: IUploadAttachmentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUploadEILogAttachmentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadEILogAttachmentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_EI_LOG_ATTACHMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.uploadEILogAttachment,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadEILogAttachmentMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadEILogAttachment: mutate,
  };
};
