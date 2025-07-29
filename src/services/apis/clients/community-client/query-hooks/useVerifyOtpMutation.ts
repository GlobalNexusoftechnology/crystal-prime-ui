import { IVerifyOtpResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const MUT_VERIFY_OTP = "verify-otp-mutation-key";

interface IVerifyOtpOptions {
  onSuccessCallback: (response: IVerifyOtpResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useVerifyOtpMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IVerifyOtpOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [MUT_VERIFY_OTP],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.verifyOtp,
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useVerifyOtpMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
      return err;
    },
  });

  return {
    error,
    isPending,
    submitVerifyOtp: mutate,
  };
}; 