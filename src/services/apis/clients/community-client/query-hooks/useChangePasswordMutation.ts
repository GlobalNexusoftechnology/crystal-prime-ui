import {  IChangePasswordResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the change password.
 */
const CHANGE_PASSWORD_MUTATION_KEY = "change-password-mutation-key";

interface IChangePasswordOptions {
  onSuccessCallback: (data: IChangePasswordResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to change password
 */
export const useChangePasswordMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IChangePasswordOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CHANGE_PASSWORD_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.changePassword,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in uschangePasswordMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    changePassword: mutate,
  };
};