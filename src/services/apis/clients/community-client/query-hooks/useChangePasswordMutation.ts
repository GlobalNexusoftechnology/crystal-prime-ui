import {  IChangePasswordResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the useChangePasswordMutation keys in react  cache.
 */
const MUT_USER_CHANGE_PASSWORD = "user-change-password-mutation-key";

//interface for IChangePasswordOptions
interface IChangePasswordOptions {
  onSuccessCallback: (data: IChangePasswordResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * useChangePasswordMutation hook
 */
export const useChangePasswordMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IChangePasswordOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [MUT_USER_CHANGE_PASSWORD],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.changePassword,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useChangePasswordMutation",
        message: error?.message,
      });
      onErrorCallback?.(err);
      return err;
    },
  });

  return {
    error,
    isPending,
    onChangePassword: mutate,
  };
};
