import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const LEAD_DETAIL_QUERY_KEY = "lead-detail-query-key";

/**
 * This fetches the lead detail
 */
export const useLeadDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [LEAD_DETAIL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getLeadDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    leadDetailById: data,
    leadDetail: refetch,
  };
};