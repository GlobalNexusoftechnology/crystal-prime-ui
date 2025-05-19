import { ICreateLeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_LEAD_MUTATION_KEY = "create-lead-mutation-key";

interface ICreateLeadOptions {
  onSuccessCallback: (data: ICreateLeadResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create lead
 */
export const useCreateLeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateLeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_LEAD_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createLead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in usecreateLeadMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createLead: mutate,
  };
};