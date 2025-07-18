import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_MILESTONES_QUERY_KEY = "all-milestones-query-key";

export const useAllMilestonesQuery = (projectId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_MILESTONES_QUERY_KEY, projectId],
    queryFn: () => COMMUNITY_CLIENT.getAllMilestones(projectId),
    networkMode: "always",
    retry: false,
    enabled: !!projectId,
  });

  return {
    allMilestonesData: data,
    isLoading,
    error,
    refetchAllMilestones: refetch,
  };
}; 