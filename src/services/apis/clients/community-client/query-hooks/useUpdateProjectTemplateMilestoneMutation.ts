import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateProjectTemplateMilestoneResponse } from "../types";

const UPDATE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY = "update-project-template-milestone-mutation-key";

interface IUpdateProjectTemplateMilestoneOptions {
  onSuccessCallback: (data: IUpdateProjectTemplateMilestoneResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update project template milestone
 */
export const useUpdateProjectTemplateMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateProjectTemplateMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateProjectTemplateMilestone,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateProjectTemplateMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateProjectTemplateMilestone: mutate,
  };
}; 