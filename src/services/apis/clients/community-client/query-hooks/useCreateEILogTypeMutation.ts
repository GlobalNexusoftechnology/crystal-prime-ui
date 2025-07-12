import { ICreateEILogTypeResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create EI Log Type mutation.
 */
const CREATE_EI_LOG_TYPE_MUTATION_KEY = "create-ei-log-type-mutation-key";

interface ICreateEILogTypeOptions {
  onSuccessCallback: (data: ICreateEILogTypeResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create EI Log Types
 */
export const useCreateEILogTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateEILogTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_EI_LOG_TYPE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createEILogType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateEILogTypeMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onEILogTypeMutation: mutate,
  };
}; 