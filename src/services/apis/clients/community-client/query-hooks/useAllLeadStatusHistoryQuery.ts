import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_LEAD_STATUS_HISTORY_QUERY_KEY = "all-lead-status-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllLeadStatusHistoryQuery = (leadId?: string) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_LEAD_STATUS_HISTORY_QUERY_KEY, leadId],
    queryFn: () => COMMUNITY_CLIENT.fetchAllLeadStatusHistory(leadId),
    networkMode: "always",
    enabled: !!leadId,
  });

  return {
    error,
    isError,
    allLeadStatusHistoryData: data,
    isLoading,
    isPending,
    allLeadStatusHistory: refetch,
  };
};
