import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteProjectTemplateMilestoneTaskResponse } from "../types";

const DELETE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY = "delete-project-template-milestone-task-mutation-key";

interface IDeleteProjectTemplateMilestoneTaskOptions {
  onSuccessCallback: (data: IDeleteProjectTemplateMilestoneTaskResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete project template milestone task
 */
export const useDeleteProjectTemplateMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteProjectTemplateMilestoneTaskOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteProjectTemplateMilestoneTask,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteProjectTemplateMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteProjectTemplateMilestoneTask: mutate,
  };
}; 