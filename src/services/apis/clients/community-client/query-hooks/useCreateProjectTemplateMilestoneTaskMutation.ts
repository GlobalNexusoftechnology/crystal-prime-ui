import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectTemplateMilestoneTaskResponse } from "../types";

const CREATE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY = "create-project-template-milestone-task-mutation-key";

interface ICreateProjectTemplateMilestoneTaskOptions {
  onSuccessCallback: (data: ICreateProjectTemplateMilestoneTaskResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create project template milestone task
 */
export const useCreateProjectTemplateMilestoneTaskMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateProjectTemplateMilestoneTaskOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_PROJECT_TEMPLATE_MILESTONE_TASK_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createProjectTemplateMilestoneTask,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateProjectTemplateMilestoneTaskMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateProjectTemplateMilestoneTask: mutate,
  };
}; 