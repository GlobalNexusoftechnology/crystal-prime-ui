import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of sources from the backend.
 */
const ALL_SOURCES_QUERY_KEY = "all-sources-query-key";

/**
 * This hook fetches a list of all the sources from the backend.
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
    fetchAllSources: refetch,
  };
};
