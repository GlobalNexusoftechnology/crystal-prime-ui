import {  ICreateStatusesResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the all statuses mutation.
 */
const ALL_STATUSES_MUTATION_KEY = "all-statuses-mutation-key";

interface IStatusesOptions {
  onSuccessCallback: (data: ICreateStatusesResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to all statuses
 */
export const useCreateStatusesMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IStatusesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [ALL_STATUSES_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createStatuses,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useallStatusMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onAllStatusMutation: mutate,
  };
};