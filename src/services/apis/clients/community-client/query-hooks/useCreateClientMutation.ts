import {  ICreateClientResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create client mutation.
 */
const CREATE_CLIENT_MUTATION_KEY = "create-client-mutation-key";

interface ICreateClientOptions {
  onSuccessCallback: (data: ICreateClientResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create client
 */
export const useCreateClientMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateClientOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_CLIENT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createClient,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateClientMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateClient: mutate,
  };
};