import {   ICreateTypesResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_TYPE_MUTATION_KEY = "create-type-mutation-key";

interface ICreateTypesOptions {
  onSuccessCallback: (data: ICreateTypesResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create Type
 */
export const useCreateTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateTypesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_TYPE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateLeadMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onTypeMutation: mutate,
  };
};