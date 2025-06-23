import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const CLIENT_DETAIL_QUERY_KEY = "client-detail-query-key";

/**
 * This fetches the client detail
 */
export const useClientDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [CLIENT_DETAIL_QUERY_KEY, id],
      queryFn: () => COMMUNITY_CLIENT.getClientDetailsById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    clientDetail: data,
    refetchClientDetail: refetch,
  };
};