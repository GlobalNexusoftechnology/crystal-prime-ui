import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_PROJECT_TEMPLATE_MILESTONE_TASKS_QUERY_KEY = "all-project-template-milestone-tasks-query-key";

export const useAllProjectTemplateMilestoneTasksQuery = (milestoneId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_PROJECT_TEMPLATE_MILESTONE_TASKS_QUERY_KEY, milestoneId],
    queryFn: () => COMMUNITY_CLIENT.fetchAllProjectTemplateMilestoneTasks(milestoneId),
    networkMode: "always",
    retry: false,
    enabled: !!milestoneId,
  });

  return {
    allProjectTemplateMilestoneTasksData: data,
    isLoading,
    error,
    refetchAllProjectTemplateMilestoneTasks: refetch,
  };
}; 