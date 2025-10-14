import {   ICreateLeaveResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_LEAVE_MUTATION_KEY = "create-leave-mutation-key";

interface ICreateLeaveOptions {
  onSuccessCallback: (data: ICreateLeaveResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create Leave
 */
export const useCreateLeaveMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateLeaveOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_LEAVE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createLeave,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateLeaveMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onLeaveMutation: mutate,
  };
};