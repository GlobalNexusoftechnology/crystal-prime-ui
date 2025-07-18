import { ICreateProjectResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create project mutation.
 */
const CREATE_PROJECT_MUTATION_KEY = "create-project-mutation-key";
const PROJECTS_QUERY_KEY = "projects-query-key";

interface ICreateProjectOptions {
  onSuccessCallback: (data: ICreateProjectResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create project
 */
export const useCreateProjectMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateProjectOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_PROJECT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createProject,
    onSuccess: (response) => {
      // Invalidate projects cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateProjectMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateProject: mutate,
  };
};