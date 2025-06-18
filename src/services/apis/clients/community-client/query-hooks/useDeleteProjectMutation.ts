import { IDeleteProjectResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the delete project mutation.
 */
const DELETE_PROJECT_MUTATION_KEY = "delete-project-mutation-key";
const PROJECTS_QUERY_KEY = "projects-query-key";

interface IDeleteProjectOptions {
  onSuccessCallback: (data: IDeleteProjectResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete project
 */
export const useDeleteProjectMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteProjectOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_PROJECT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.deleteProject,
    onSuccess: (response) => {
      // Invalidate projects cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteProjectMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteProject: mutate,
  };
}; 