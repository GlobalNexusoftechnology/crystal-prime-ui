import { IUpdateEILogTypeResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the update EI Log Type mutation keys in react query cache.
 */
const UPDATE_EI_LOG_TYPE_MUTATION_KEY = "update-ei-log-type-mutation-key";

interface IUpdateEILogTypeOptions {
  onSuccessCallback: (data: IUpdateEILogTypeResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This updates the EI Log Type.
 */
export const useUpdateEILogTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateEILogTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_EI_LOG_TYPE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For update Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateEILogType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateEILogTypeMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditEILogType: mutate,
  };
}; 