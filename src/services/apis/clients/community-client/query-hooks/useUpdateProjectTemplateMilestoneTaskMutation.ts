import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateProjectTemplateMilestoneTaskResponse } from "../types";

const UPDATE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY = "update-project-template-milestone-task-mutation-key";

interface IUpdateProjectTemplateMilestoneTaskOptions {
  onSuccessCallback: (data: IUpdateProjectTemplateMilestoneTaskResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update project template milestone task
 */
export const useUpdateProjectTemplateMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateProjectTemplateMilestoneTaskOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateProjectTemplateMilestoneTask,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateProjectTemplateMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateProjectTemplateMilestoneTask: mutate,
  };
}; 