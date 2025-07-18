import { IUpdateEILogHeadResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the update EI Log Head mutation keys in react query cache.
 */
const UPDATE_EI_LOG_HEAD_MUTATION_KEY = "update-ei-log-head-mutation-key";

interface IUpdateEILogHeadOptions {
  onSuccessCallback: (data: IUpdateEILogHeadResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This updates the EI Log Head.
 */
export const useUpdateEILogHeadMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateEILogHeadOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_EI_LOG_HEAD_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For update Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateEILogHead,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateEILogHeadMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditEILogHead: mutate,
  };
}; 