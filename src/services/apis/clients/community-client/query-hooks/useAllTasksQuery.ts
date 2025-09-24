import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_TASKS_QUERY_KEY = "all-project-tasks-query-key";

export const useAllTasksQuery = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_TASKS_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchAllTasks(),
    networkMode: "always",
    retry: false,
  });

  return {
    allTasksData: data,
    isLoading,
    error,
    refetchAllTasks: refetch,
  };
};


