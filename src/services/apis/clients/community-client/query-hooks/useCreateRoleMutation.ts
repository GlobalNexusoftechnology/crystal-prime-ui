import { ICreateRoleResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create role mutation.
 */
const CREATE_ROLE_MUTATION_KEY = "create-role-mutation-key";

interface ICreateRoleOptions {
  onSuccessCallback: (data: ICreateRoleResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create role
 */
export const useCreateRoleMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateRoleOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_ROLE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createRole,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateRoleMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createRole: mutate,
  };
};