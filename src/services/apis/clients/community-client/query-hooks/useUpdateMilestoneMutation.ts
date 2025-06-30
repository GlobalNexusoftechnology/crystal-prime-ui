import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectMilestone, IProjectMilestoneResponse } from "../types";

const UPDATE_MILESTONE_MUTATION_KEY = "update-milestone-mutation-key";

interface IUpdateMilestoneOptions {
  onSuccessCallback: (data: IProjectMilestoneResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ milestoneId, payload }: { milestoneId: string; payload: ICreateProjectMilestone }) =>
      COMMUNITY_CLIENT.updateMilestone(milestoneId, payload),
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateMilestone: mutate,
  };
}; 