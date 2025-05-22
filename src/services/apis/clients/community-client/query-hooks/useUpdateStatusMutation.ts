import {  IUpdateStatusesResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const UPDATE_STATUSES_MUTATION_KEY = "update-statuses-mutation-key";

interface IUpdateStatusesOptions {
  onSuccessCallback: (data: IUpdateStatusesResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateStatusesMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateStatusesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_STATUSES_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateStatuses,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateStatusesMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditStatuses: mutate,
  };
};






