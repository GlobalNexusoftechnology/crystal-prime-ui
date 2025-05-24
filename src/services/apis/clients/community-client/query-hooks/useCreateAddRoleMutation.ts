import {  ICreateAddRoleResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead follow up mutation.
 */
const CREATE_ADD_ROLE_MUTATION_KEY = "create-add-role-mutation-key";

interface ICreateAddRoleOptions {
  onSuccessCallback: (data: ICreateAddRoleResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create lead follow up
 */
export const useCreateAddRoleMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateAddRoleOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_ADD_ROLE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createAddRole,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateAddRoleMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createAddRole: mutate,
  };
};
