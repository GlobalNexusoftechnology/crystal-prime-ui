import { IDeleteEILogTypeResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete EI Log Type mutation keys in react query cache.
 */
const DELETE_EI_LOG_TYPE_MUTATION_KEY = "delete-ei-log-type-mutation-key";

interface IDeleteEILogTypeOptions {
  onSuccessCallback: (data: IDeleteEILogTypeResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This deletes the EI Log Type.
 */
export const useDeleteEILogTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteEILogTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_EI_LOG_TYPE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For delete Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteEILogType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteEILogTypeMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteEILogType: mutate,
  };
}; 