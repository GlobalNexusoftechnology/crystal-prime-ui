import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const USER_DETAIL_QUERY_KEY = "User-user-query-key";

/**
 * This fetches the User detail
 */
export const useUserDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [USER_DETAIL_QUERY_KEY, id],
      queryFn: () => COMMUNITY_CLIENT.getUserDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    userDetailById: data,
    onUserDetail: refetch,
  };
};