import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_SOURCES_QUERY_KEY = "all-sources-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllSourcesQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_SOURCES_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllSources,
    networkMode: "always",
  });

  return {
    error,
    isError,
    allSourcesData: data,
    isLoading,
    isPending,
    allSources: refetch,
  };
};
