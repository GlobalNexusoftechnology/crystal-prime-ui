import { ICreateLeadAttachmentResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_LEAD_ATTACHMENT_MUTATION_KEY =
  "create-lead-management-mutation-key";

interface ICreateLeadAttachmentOptions {
  onSuccessCallback: (data: ICreateLeadAttachmentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create lead
 */
export const useCreateLeadAttachmentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateLeadAttachmentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_LEAD_ATTACHMENT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createLeadAttachment,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateLeadAttachmentMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateLeadAttachment: mutate,
  };
};
