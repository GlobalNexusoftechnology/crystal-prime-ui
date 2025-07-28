import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of EI Log Heads from the backend.
 */
const ALL_EI_LOG_HEADS_QUERY_KEY = "all-ei-log-heads-query-key";

/**
 * This hook fetches a list of all the EI Log Heads from the backend.
 */
export interface EILogHeadsFilters {
  page?: number;
}

export const useAllEILogHeadsQuery = (filters: EILogHeadsFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_EI_LOG_HEADS_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogHeads(filters.page),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allEILogHeadsData: data,
    isLoading,
    isPending,
    fetchAllEILogHeads: refetch,
  };
}; 