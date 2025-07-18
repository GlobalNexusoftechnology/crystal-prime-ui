import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of EI Log Types from the backend.
 */
const ALL_EI_LOG_TYPES_QUERY_KEY = "all-ei-log-types-query-key";

/**
 * This hook fetches a list of all the EI Log Types from the backend.
 */
export const useAllEILogTypesQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_EI_LOG_TYPES_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllEILogTypes,
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