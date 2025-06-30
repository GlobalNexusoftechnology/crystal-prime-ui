import { ICreateProjectFollowUpResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create project follow up mutation.
 */
const CREATE_PROJECT_FOLLOW_UP_MUTATION_KEY = "create-project-follow-up-mutation-key";
const NOTIFICATIONS_QUERY_KEY = "notifications-query-key";

interface ICreateProjectFollowUpOptions {
  onSuccessCallback: (data: ICreateProjectFollowUpResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create project follow up
 */
export const useCreateProjectFollowUpMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateProjectFollowUpOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_PROJECT_FOLLOW_UP_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createProjectFollowUp,
    onSuccess: (response) => {
      // Invalidate notifications cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateProjectFollowUpMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createClientFollowUp: mutate,
  };
}; 