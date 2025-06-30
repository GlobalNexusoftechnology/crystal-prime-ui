import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_MILESTONE_TASKS_QUERY_KEY = "all-milestone-tasks-query-key";

export const useAllMilestoneTasksQuery = (milestoneId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_MILESTONE_TASKS_QUERY_KEY, milestoneId],
    queryFn: () => COMMUNITY_CLIENT.getAllMilestoneTasks(milestoneId),
    networkMode: "always",
    retry: false,
    enabled: !!milestoneId,
  });

  return {
    allMilestoneTasksData: data,
    isLoading,
    error,
    refetchAllMilestoneTasks: refetch,
  };
}; 