import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of EI Log Types from the backend.
 */
const ALL_EI_LOG_TYPES_QUERY_KEY = "all-ei-log-types-query-key";

/**
 * This hook fetches a list of all the EI Log Types from the backend.
 */
export interface EILogTypesFilters {
  page?: number;
}

export const useAllEILogTypesQuery = (filters: EILogTypesFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_EI_LOG_TYPES_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogTypes(filters.page),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allEILogTypesData: data,
    isLoading,
    isPending,
    fetchAllEILogTypes: refetch,
  };
}; 