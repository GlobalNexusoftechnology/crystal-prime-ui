import { IClientDetailsResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const UPDATE_CLIENT_DETAIL_MUTATION_KEY = "update-client-detail-mutation-key";

interface IUpdateClientDetailOptions {
  onSuccessCallback: (data: IClientDetailsResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateClientDetailMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateClientDetailOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_CLIENT_DETAIL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateClientDetails,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateClientDetailMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });
  return {
    error,
    isPending,
    onUpdateClientDetail: mutate,
  };
}; 