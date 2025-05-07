import { IActiveSession, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const MUT_USER_LOGIN = "user-login-mutation-key";

interface IUserLoginOptions {
  /**
   * TODO: Remove null when implementing actual API.
   */
  onSuccessCallback: (newSessionInfo: IActiveSession | null) => void;
  /**
   * This is called on successful login to save the user's session to device
   * storage and wipe existing user data.
   */
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * TODO: User our own login API.
 */
/**
 * This logins the user with their email and password first from `Azure B2C` then
 * from `Salesforce` and finally saves the user's session to device storage and
 * wipe existing user data.
 */
export const useLoginMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUserLoginOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [MUT_USER_LOGIN],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.userLogin,
    onSuccess: (loginData) => {
      onSuccessCallback(loginData);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useLoginMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    submitLogin: mutate,
  };
};
