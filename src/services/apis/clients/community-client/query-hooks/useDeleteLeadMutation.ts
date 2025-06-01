import { IDeleteLeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_LEAD_MUTATION_KEY = "delete-lead-mutation-key";

interface IDeleteLeadOptions {
  onSuccessCallback: (data: IDeleteLeadResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}
  
/**
 * This register the user or vender to carpet market.
 */
export const useDeleteLeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteLeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_LEAD_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteLead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useAdminDeleteVendorOptionsMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteLead: mutate,
  };
};