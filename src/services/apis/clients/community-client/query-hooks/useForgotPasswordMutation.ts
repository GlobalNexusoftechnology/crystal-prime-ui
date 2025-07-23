import { IForgotPasswordResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const MUT_FORGOT_PASSWORD = "forgot-password-mutation-key";

interface IForgotPasswordOptions {
  onSuccessCallback: (response: IForgotPasswordResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useForgotPasswordMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IForgotPasswordOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [MUT_FORGOT_PASSWORD],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.forgotPassword,
    onSuccess: (data) => {
      onSuccessCallback(data);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useForgotPasswordMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
      return err;
    },
  });

  return {
    error,
    isPending,
    submitForgotPassword: mutate,
  };
}; 