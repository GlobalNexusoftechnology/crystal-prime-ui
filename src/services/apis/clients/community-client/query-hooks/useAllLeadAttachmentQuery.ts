import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_LEAD_ATTACHMENT_QUERY_KEY = "all-lead-attachment-query-key";

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllLeadAttachmentQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_LEAD_ATTACHMENT_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllLeadAttachment,
    networkMode: "always",
  });

  return {
    error,
    isError,
    allLeadAttachmentData: data,
    isLoading,
    isPending,
    allLeadAttachment: refetch,
  };
};
