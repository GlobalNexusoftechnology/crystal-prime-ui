import { useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUploadMultipleAttachmentResponse, IUploadMultipleAttachmentsOptions } from "../types";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const UPLOAD_MULTIPLE_ATTACHMENTS_MUTATION_KEY = "upload-multiple-attachments-mutation-key";

export const useUploadMultipleAttachmentsMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUploadMultipleAttachmentsOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPLOAD_MULTIPLE_ATTACHMENTS_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: async (formData: FormData): Promise<IUploadMultipleAttachmentResponse> => {
      return await COMMUNITY_CLIENT.uploadMultipleAttachments(formData) as IUploadMultipleAttachmentResponse;
    },
    onSuccess: (response: IUploadMultipleAttachmentResponse) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUploadMultipleAttachmentsMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUploadMultipleAttachments: mutate,
  };
}; 