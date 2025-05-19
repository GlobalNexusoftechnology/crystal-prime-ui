import { ISentOtpResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the sent otp mutation.
 */
const SENT_OTP_MUTATION_KEY = "sent-otp-mutation-key";

interface ISentOtpOptions {
  onSuccessCallback: (data: ISentOtpResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to sent otp
 */
export const useSentOtpMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ISentOtpOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [SENT_OTP_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.sentOtp,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in usesentOtpMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    sentotp: mutate,
  };
};