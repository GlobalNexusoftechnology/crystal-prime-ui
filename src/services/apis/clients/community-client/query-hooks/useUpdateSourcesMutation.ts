import {  IUpdateSourcesResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const UPDATE_SOURCES_MUTATION_KEY = "update-sources-mutation-key";

interface IUpdateSourcesOptions {
  onSuccessCallback: (data: IUpdateSourcesResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateSourcesMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateSourcesOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_SOURCES_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateSources,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateSourcesMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditSources: mutate,
  };
};






