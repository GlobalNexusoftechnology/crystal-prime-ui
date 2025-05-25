import { IDeleteRoleResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete role in react query cache.
 */
const DELETE_ROLE_MUTATION_KEY = "delete-role-mutation-key";

interface IDeleteRoleOptions {
  onSuccessCallback: (data: IDeleteRoleResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This hook is responsible for deleting the role.
 */
export const useDeleteRoleMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteRoleOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_ROLE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteRole,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteRoleMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteRole: mutate,
  };
};
