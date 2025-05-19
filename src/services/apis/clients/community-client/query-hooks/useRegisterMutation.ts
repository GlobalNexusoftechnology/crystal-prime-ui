import { IRegisterResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the register mutation.
 */
const REGITSER_MUTATION_KEY = "register-mutation-key";

interface IRegisterOptions {
  onSuccessCallback: (data: IRegisterResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to register mutation
 */
export const useRegisterMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IRegisterOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [REGITSER_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.register,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useRegisterMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    register: mutate,
  };
};