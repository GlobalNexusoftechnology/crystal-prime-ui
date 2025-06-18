import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the all projects query.
 */
const ALL_PROJECTS_QUERY_KEY = "all-projects-query-key";

/**
 * Hook to fetch all projects
 */
export const useAllProjectsQuery = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_PROJECTS_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllProjects,
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
  });

  return {
    allProjectsData: data,
    isLoading,
    error,
    refetchAllProjects: refetch,
  };
}; 