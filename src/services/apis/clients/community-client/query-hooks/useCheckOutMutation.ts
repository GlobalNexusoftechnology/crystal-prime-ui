import {  ICheckOutResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_CHECK_OUT_MUTATION_KEY = "create-check-out-mutation-key";

interface ICreateCheckOutOptions {
  onSuccessCallback: (data: ICheckOutResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create CheckOut
 */
export const useCreateCheckOutMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateCheckOutOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_CHECK_OUT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createCheckOut,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateCheckOutMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCheckOutMutation: mutate,
  };
};