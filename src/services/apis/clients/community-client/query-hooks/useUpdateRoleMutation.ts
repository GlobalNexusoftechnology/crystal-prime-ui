import { IUpdateRoleResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the update role mutation.
 */
const UPDATE_ROLE_MUTATION_KEY = "update-role-mutation-key";

interface IUpdateRoleOptions {
  onSuccessCallback: (data: IUpdateRoleResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update role
 */
export const useUpdateRoleMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateRoleOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_ROLE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateRole,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateRoleMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateRole: mutate,
  };
};