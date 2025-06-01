import { IDeleteTypeResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_TYPE_MUTATION_KEY = "delete-type-mutation-key";

interface IDeleteSourcesOptions {
  onSuccessCallback: (data: IDeleteTypeResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This register the user or vender to carpet market.
 */
export const useDeleteTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteSourcesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_TYPE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteTypeMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteTypes: mutate,
  };
};
