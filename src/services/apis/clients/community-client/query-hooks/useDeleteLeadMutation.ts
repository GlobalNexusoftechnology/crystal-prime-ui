import { IDeleteLeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete lead mutation.
 */
const DELETE_LEAD_MUTATION_KEY = "delete-lead-mutation-key";

interface IDeleteLeadOptions {
  onSuccessCallback: (data: IDeleteLeadResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete lead
 */
export const useDeleteLeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteLeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_LEAD_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.deleteLead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in DeleteLeadMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    deleteLead: mutate,
  };
};