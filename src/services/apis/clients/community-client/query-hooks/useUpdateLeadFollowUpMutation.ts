import { IUpdateLeadFollowUpPayload, useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const MUT_UPDATE_LEAD_FOLLOW_UP_DETAIL = "lead-follow-up-detail-mutation-key";

/**
 * This fetches the lead detail
 */
export const useUpdateLeadFollowUpMutation = (id: string, payload: IUpdateLeadFollowUpPayload) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [MUT_UPDATE_LEAD_FOLLOW_UP_DETAIL],
      queryFn: () => COMMUNITY_CLIENT.updateLeadFollowUpById(id, payload),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    data,
    updateLeadFollowUp: refetch,
  };
};