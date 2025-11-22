import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IChangeMaterialStatusResponse } from "@/services/apis/types";

const CHANGE_MATERIAL_STATUS_MUTATION_KEY =
  "change-material-status-mutation-key";

interface IChangeMaterialStatusOptions {
  onSuccessCallback: (data: IChangeMaterialStatusResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useChangeMaterialStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IChangeMaterialStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CHANGE_MATERIAL_STATUS_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      COMMUNITY_CLIENT.changeMaterialStatus(id, active),
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useChangeMaterialStatusMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });
  return {
    error,
    isPending,
    onChangeMaterialStatus: mutate,
  };
};
