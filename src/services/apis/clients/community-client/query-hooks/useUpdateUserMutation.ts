import {   IUpdateUserResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const UPDATE_USER_MUTATION_KEY = "update-user-mutation-key";

interface IUpdateUserOptions {
  onSuccessCallback: (data: IUpdateUserResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateUserMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateUserOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_USER_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateUser,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateUserMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditUser: mutate,
  };
};






