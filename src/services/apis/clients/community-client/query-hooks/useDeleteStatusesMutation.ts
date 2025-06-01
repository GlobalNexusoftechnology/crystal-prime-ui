import {  IDeleteStatusesResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_STATUSES_MUTATION_KEY = "delete-statuses-mutation-key";

interface IDeleteStatusesOptions {
  onSuccessCallback: (data: IDeleteStatusesResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}
  
/**
 * This register the user or vender to carpet market.
 */
export const useDeleteStatusesMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteStatusesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_STATUSES_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteStatuses,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteStatusesMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteStatuses: mutate,
  };
};