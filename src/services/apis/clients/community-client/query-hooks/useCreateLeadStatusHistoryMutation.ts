import { ICreateLeadStatusHistoryResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead follow up mutation.
 */
const CREATE_LEAD_STATUS_HISTORY_MUTATION_KEY =
  "create-lead-status-history-mutation-key";

interface ICreateLeadStatusHistoryOptions {
  onSuccessCallback: (data: ICreateLeadStatusHistoryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create lead follow up
 */
export const useCreateLeadStatusHistoryMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateLeadStatusHistoryOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_LEAD_STATUS_HISTORY_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createLeadStatusHistory,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateLeadStatusHistoryMutation",
        message: err?.message,
      });

      // Call optional error callback
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createLeadStatusHistory: mutate,
  };
};
