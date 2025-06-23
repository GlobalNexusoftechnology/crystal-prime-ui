import { IClientDetailsResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const CREATE_CLIENT_DETAIL_MUTATION_KEY = "create-client-detail-mutation-key";

interface ICreateClientDetailOptions {
  onSuccessCallback: (data: IClientDetailsResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateClientDetailMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateClientDetailOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_CLIENT_DETAIL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createClientDetails,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateClientDetailMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });
  return {
    error,
    isPending,
    onCreateClientDetail: mutate,
  };
}; 