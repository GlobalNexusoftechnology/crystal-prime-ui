import { IChangeClientPasswordResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const CHANGE_CLIENT_PASSWORD_MUTATION_KEY = "change-client-password-mutation-key";

interface IChangeClientPasswordOptions {
  onSuccessCallback: (data: IChangeClientPasswordResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useChangeClientPasswordMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IChangeClientPasswordOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CHANGE_CLIENT_PASSWORD_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.changeClientPassword,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useChangeClientPasswordMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onChangeClientPassword: mutate,
  };
};


