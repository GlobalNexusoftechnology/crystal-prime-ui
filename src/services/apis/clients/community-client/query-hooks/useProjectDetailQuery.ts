import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the project detail query.
 */
const PROJECT_DETAIL_QUERY_KEY = "project-detail-query-key";

/**
 * Hook to fetch project details by ID
 */
export const useProjectDetailQuery = (projectId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PROJECT_DETAIL_QUERY_KEY, projectId],
    queryFn: () => COMMUNITY_CLIENT.getProjectDetailById(projectId),
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    enabled: !!projectId, // Only run query if projectId is provided
  });

  return {
    projectDetailData: data,
    isLoading,
    error,
    refetch,
  };
}; 