import { useQuery } from "@/services";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of materials from the backend.
 */
const ALL_MATERIALS_QUERY_KEY = "all-material-query-key";

/**
 * Interface for material filters
 */
export interface MaterialFilters {
  searchText?: string;
  page?: number;
  limit?: number;
}

/**
 * This hook fetches a list of all materials from the backend.
 */
export const useAllMaterialsQuery = (filters: MaterialFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_MATERIALS_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllMaterials(filters),
    networkMode: "always",
  });

  return {
    error,
    isError,
    allMaterialsData: data,
    isLoading,
    isPending,
    fetchAllMaterials: refetch,
  };
}; 