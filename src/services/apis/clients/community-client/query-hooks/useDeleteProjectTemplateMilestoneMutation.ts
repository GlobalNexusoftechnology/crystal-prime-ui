import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteProjectTemplateMilestoneResponse } from "../types";

const DELETE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY = "delete-project-template-milestone-mutation-key";

interface IDeleteProjectTemplateMilestoneOptions {
  onSuccessCallback: (data: IDeleteProjectTemplateMilestoneResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete project template milestone
 */
export const useDeleteProjectTemplateMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteProjectTemplateMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteProjectTemplateMilestone,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteProjectTemplateMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteProjectTemplateMilestone: mutate,
  };
}; 