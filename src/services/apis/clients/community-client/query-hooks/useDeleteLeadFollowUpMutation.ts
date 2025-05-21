import { IDeleteLeadFollowUpResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete lead mutation.
 */
const DELETE_LEAD_FOLLOW_UP_MUTATION_KEY = "delete-lead-follow-up-mutation-key";

interface IDeleteLeadFollowUpOptions {
  onSuccessCallback: (data: IDeleteLeadFollowUpResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete lead
 */
export const useDeleteLeadFollowUpMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteLeadFollowUpOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_LEAD_FOLLOW_UP_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.deleteLeadFollowUp,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in DeleteLeadFollowUpMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    deleteLeadFollowUp: mutate,
  };
};