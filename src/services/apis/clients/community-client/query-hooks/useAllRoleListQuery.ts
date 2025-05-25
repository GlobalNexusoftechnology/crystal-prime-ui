import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const Role_LIST_QUERY_KEY = "role-list-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllRoleListQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [Role_LIST_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllRoleList,
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
