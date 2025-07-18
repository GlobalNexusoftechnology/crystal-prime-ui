import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IProjectMilestoneResponse } from "../types";

const CREATE_MILESTONE_MUTATION_KEY = "create-milestone-mutation-key";

interface ICreateMilestoneOptions {
  onSuccessCallback: (data: IProjectMilestoneResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createMilestone,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateMilestone: mutate,
  };
}; 