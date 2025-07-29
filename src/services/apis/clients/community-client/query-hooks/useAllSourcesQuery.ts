import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of sources from the backend.
 */
const ALL_SOURCES_QUERY_KEY = "all-sources-query-key";

/**
 * This hook fetches a list of all the sources from the backend.
 */
export interface SourcesFilters {
  page?: number;
}

export const useAllSourcesQuery = (filters: SourcesFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_SOURCES_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllSources(filters.page),
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
