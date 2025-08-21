import { ICreateClientCredentialResponse, useMutation } from "@/services";
import { ErrorEventsEnum, IApiError, errorLogToRemoteUtil } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const CREATE_CLIENT_CREDENTIAL_MUTATION_KEY = "create-client-credential-mutation-key";

interface ICreateClientCredentialOptions {
  onSuccessCallback: (data: ICreateClientCredentialResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateClientCredentialMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateClientCredentialOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_CLIENT_CREDENTIAL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createClientCredential,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateClientCredentialMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateClientCredential: mutate,
  };
};


