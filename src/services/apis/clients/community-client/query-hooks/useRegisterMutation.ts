import { ISignupResponse,useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const MUT_USER_REGISTER = "user-register-mutation-key";

//interface for IRegisterOptions
interface IRegisterOptions {
  onSuccessCallback: (data: ISignupResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This register the user or vender to carpet market.
 */
export const useRegisterMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IRegisterOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [MUT_USER_REGISTER],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.userRegister,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },

    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useRegisterMutation",
        message: error?.message,
      });

      onErrorCallback?.(err); // pass actual 'err' to your screen
      return err;
    },
  });

  return {
    error,
    isPending,
    onRegisterProfile: mutate,
  };
};
