import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const Role_LIST_QUERY_KEY = "role-list-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export interface RoleListFilters {
  page?: number;
  limit?: number
}

export const useAllRoleListQuery = (filters: RoleListFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [Role_LIST_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllRoleList(filters.page, filters.limit),
    networkMode: "always",
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    refetchRoles: refetch,
  };
};
