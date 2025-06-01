import {  IResetPasswordResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the reset password.
 */
const RESET_PASSWORD_MUTATION_KEY = "reset-password-mutation-key";

interface IResetPasswordOptions {
  onSuccessCallback: (data: IResetPasswordResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to reset password
 */
export const useResetPasswordMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IResetPasswordOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [RESET_PASSWORD_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.resetPassword,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in usResetPasswordMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    resetPassword: mutate,
  };
};