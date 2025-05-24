// hooks/useUploadAttachmentMutation.ts

import { IUploadAttachmentResponse, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError, ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const UPLOAD_ATTACHMENT_MUTATION_KEY = "upload-attachment-mutation-key";

interface IUploadAttachmentOptions {
  onSuccessCallback: (data: IUploadAttachmentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUploadAttachmentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadAttachmentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_ATTACHMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.uploadAttachment,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadAttachmentMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadAttachment: mutate,
  };
};
