import { IDeleteEILogHeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete EI Log Head mutation keys in react query cache.
 */
const DELETE_EI_LOG_HEAD_MUTATION_KEY = "delete-ei-log-head-mutation-key";

interface IDeleteEILogHeadOptions {
  onSuccessCallback: (data: IDeleteEILogHeadResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This deletes the EI Log Head.
 */
export const useDeleteEILogHeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteEILogHeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_EI_LOG_HEAD_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For delete Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteEILogHead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteEILogHeadMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteEILogHead: mutate,
  };
}; 