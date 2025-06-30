import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const GET_ALL_TASK_COMMENTS_QUERY_KEY = "get-all-task-comments-query-key";

interface IGetAllTaskCommentsOptions {
  taskId: string;
  enabled?: boolean;
}

export const useGetAllTaskCommentsQuery = ({ taskId, enabled = true }: IGetAllTaskCommentsOptions) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [GET_ALL_TASK_COMMENTS_QUERY_KEY, taskId],
    networkMode: "always",
    retry: false,
    enabled: enabled && !!taskId,
    queryFn: () => COMMUNITY_CLIENT.getAllTaskComments(taskId),
  });

  return {
    allTaskCommentsData: data,
    isLoading,
    isError,
    error,
    getAllTaskComments: refetch,
  };
}; 