import {  ICheckInResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_CHECK_IN_MUTATION_KEY = "create-check-in-mutation-key";

interface ICreateCheckInOptions {
  onSuccessCallback: (data: ICheckInResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create CheckIn
 */
export const useCreateCheckInMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateCheckInOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_CHECK_IN_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createCheckIn,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateCheckInMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCheckInMutation: mutate,
  };
};