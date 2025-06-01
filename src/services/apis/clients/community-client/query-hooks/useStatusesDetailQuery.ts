import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const STATUSES_DETAIL_QUERY_KEY = "statuses-detail-query-key";

/**
 * This fetches the statuses detail
 */
export const useStatusesDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [STATUSES_DETAIL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getStatusesDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    statusesDetailById: data,
    statusesDetail: refetch,
  };
};