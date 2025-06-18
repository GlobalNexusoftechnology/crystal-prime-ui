import { IUpdateProjectResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the update project mutation.
 */
const UPDATE_PROJECT_MUTATION_KEY = "update-project-mutation-key";
const PROJECTS_QUERY_KEY = "projects-query-key";
const PROJECT_DETAIL_QUERY_KEY = "project-detail-query-key";

interface IUpdateProjectOptions {
  onSuccessCallback: (data: IUpdateProjectResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update project
 */
export const useUpdateProjectMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateProjectOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_PROJECT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateProject,
    onSuccess: (response) => {
      // Invalidate projects cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [PROJECTS_QUERY_KEY] });
      // Invalidate specific project detail cache
      queryClient.invalidateQueries({ queryKey: [PROJECT_DETAIL_QUERY_KEY, response.data.id] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateProjectMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateProject: mutate,
  };
}; 