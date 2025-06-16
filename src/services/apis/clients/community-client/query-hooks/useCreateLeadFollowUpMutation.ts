import { ICreateLeadFollowUpResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead follow up mutation.
 */
const CREATE_LEAD_Follow_UP_MUTATION_KEY = "create-lead-follow-up-mutation-key";
const NOTIFICATIONS_QUERY_KEY = "notifications-query-key";

interface ICreateLeadFollowUpOptions {
  onSuccessCallback: (data: ICreateLeadFollowUpResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create lead follow up
 */
export const useCreateLeadFollowUpMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateLeadFollowUpOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_LEAD_Follow_UP_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createLeadFollowUp,
    onSuccess: (response) => {
      // Invalidate notifications cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in usecreateLeadFollowUpMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createLeadFollowUp: mutate,
  };
};