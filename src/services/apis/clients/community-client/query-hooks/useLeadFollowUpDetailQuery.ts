import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const LEAD_FOLLOW_UP_DETAIL_QUERY_KEY = "lead-follow-up-detail-query-key";

/**
 * This fetches the lead detail
 */
export const useLeadFollowUpDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [LEAD_FOLLOW_UP_DETAIL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getLeadFollowUpDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    data,
    leadFollowUpDetail: refetch,
  };
};