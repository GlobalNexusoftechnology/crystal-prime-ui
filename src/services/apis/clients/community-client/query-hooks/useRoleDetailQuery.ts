import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the role details QUERY keys in react query cache.
 */
const ROLE_DETAILS_QUERY_KEY = "role-details-query-key";

/**
 * This fetches the lead detail
 */
export const useRoleDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [ROLE_DETAILS_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getRoleDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    roleDetailsData: data,
    fetchUserRoleDetails: refetch,
  };
};