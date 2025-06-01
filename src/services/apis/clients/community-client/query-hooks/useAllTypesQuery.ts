import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of type from the backend.
 */
const ALL_SOURCES_QUERY_KEY = "all-type-query-key";

/**
 * This hook fetches a list of all the type from the backend.
 */
export const useAllTypesQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_SOURCES_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllTypes,
    networkMode: "always",
  });

  return {
    error,
    isError,
    allTypesData: data,
    isLoading,
    isPending,
    fetchAllTypes: refetch,
  };
};
