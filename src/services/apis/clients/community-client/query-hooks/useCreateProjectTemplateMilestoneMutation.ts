import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectTemplateMilestoneResponse } from "../types";

const CREATE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY = "create-project-template-milestone-mutation-key";

interface ICreateProjectTemplateMilestoneOptions {
  onSuccessCallback: (data: ICreateProjectTemplateMilestoneResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create project template milestone
 */
export const useCreateProjectTemplateMilestoneMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateProjectTemplateMilestoneOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_PROJECT_TEMPLATE_MILESTONE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createProjectTemplateMilestone,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateProjectTemplateMilestoneMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateProjectTemplateMilestone: mutate,
  };
}; 