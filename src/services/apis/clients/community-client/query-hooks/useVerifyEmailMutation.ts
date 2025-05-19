import {  IVerifyEmailResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the verify email mutation.
 */
const VERIFY_EMAIL_MUTATION_KEY = "verify-email-mutation-key";

interface IVerifyEmailOptions {
  onSuccessCallback: (data: IVerifyEmailResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to verify otp
 */
export const useVerifyEmailMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IVerifyEmailOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [VERIFY_EMAIL_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.verifyEmail,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useverifyEmailMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    verifyEmail: mutate,
  };
};