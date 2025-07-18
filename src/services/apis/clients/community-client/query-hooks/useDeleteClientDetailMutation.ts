import { IClientDetailsResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const DELETE_CLIENT_DETAIL_MUTATION_KEY = "delete-client-detail-mutation-key";

interface IDeleteClientDetailOptions {
  onSuccessCallback: (data: IClientDetailsResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteClientDetailMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteClientDetailOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_CLIENT_DETAIL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteClientDetails,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteClientDetailMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });
  return {
    error,
    isPending,
    onDeleteClientDetail: mutate,
  };
}; 