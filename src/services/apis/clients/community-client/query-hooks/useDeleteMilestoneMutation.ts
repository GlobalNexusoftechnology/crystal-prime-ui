import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const DELETE_MILESTONE_MUTATION_KEY = "delete-milestone-mutation-key";

interface IDeleteMilestoneOptions {
  onSuccessCallback: () => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteMilestone,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteMilestone: mutate,
  };
}; 