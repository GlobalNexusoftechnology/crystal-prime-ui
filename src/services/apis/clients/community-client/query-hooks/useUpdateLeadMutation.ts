import { IUpdateLeadResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const UPDATE_LEAD_MUTATION_KEY = "update-lead-mutation-key";
const NOTIFICATIONS_QUERY_KEY = "notifications-query-key";

interface IUpdateLeadOptions {
  onSuccessCallback: (data: IUpdateLeadResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateLeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateLeadOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_LEAD_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateLead,
    onSuccess: (response) => {
      // Invalidate notifications cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateLeadMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditLead: mutate,
  };
};






