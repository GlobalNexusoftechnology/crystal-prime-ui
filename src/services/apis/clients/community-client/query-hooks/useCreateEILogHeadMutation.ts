import { ICreateEILogHeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create EI Log Head mutation.
 */
const CREATE_EI_LOG_HEAD_MUTATION_KEY = "create-ei-log-head-mutation-key";

interface ICreateEILogHeadOptions {
  onSuccessCallback: (data: ICreateEILogHeadResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create EI Log Heads
 */
export const useCreateEILogHeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateEILogHeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_EI_LOG_HEAD_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createEILogHead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateEILogHeadMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onEILogHeadMutation: mutate,
  };
}; 