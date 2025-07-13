import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const EI_LOG_DETAIL_QUERY_KEY = "ei-log-detail-query-key";

/**
 * This fetches the EI log detail
 */
export const useEILogDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [EI_LOG_DETAIL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getEILogDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    eiLogDetailById: data,
    eiLogDetail: refetch,
  };
}; 