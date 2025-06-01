import {   ICreateUserResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create user mutation.
 */
const CREATE_USER_MUTATION_KEY = "create-user-mutation-key";

interface ICreateUserOptions {
  onSuccessCallback: (data: ICreateUserResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create User
 */
export const useCreateUserMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateUserOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_USER_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createUser,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateUserMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateUser: mutate,
  };
};