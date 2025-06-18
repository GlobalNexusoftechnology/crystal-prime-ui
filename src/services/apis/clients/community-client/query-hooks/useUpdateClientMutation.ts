import { IUpdateClientResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the update client mutation.
 */
const UPDATE_CLIENT_MUTATION_KEY = "update-client-mutation-key";

interface IUpdateClientOptions {
  onSuccessCallback: (data: IUpdateClientResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update client
 */
export const useUpdateClientMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateClientOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_CLIENT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateClient,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateClientMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateClient: mutate,
  };
};