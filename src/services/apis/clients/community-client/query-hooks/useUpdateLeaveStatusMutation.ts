import { IUpdateLeaveStatusResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const UPDATE_LEAVE_MUTATION_KEY = "update-leave-mutation-key";

interface IUpdateLeaveStatusOptions {
  onSuccessCallback: (data: IUpdateLeaveStatusResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateLeaveStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateLeaveStatusOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_LEAVE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateLeaveStatus,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateLeaveStatusMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateLeaveStatus: mutate,
  };
};
