import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_USERS_QUERY_KEY = "all-users-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllUsersQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_USERS_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllUsers,
    networkMode: "always",
  });

  return {
    error,
    isError,
    allUsersData: data,
    isLoading,
    isPending,
    refetchAllUsers: refetch,
  };
};
