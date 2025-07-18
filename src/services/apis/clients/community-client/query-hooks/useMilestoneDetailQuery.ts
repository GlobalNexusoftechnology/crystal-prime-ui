import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const MILESTONE_DETAIL_QUERY_KEY = "milestone-detail-query-key";

export const useMilestoneDetailQuery = (milestoneId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [MILESTONE_DETAIL_QUERY_KEY, milestoneId],
    queryFn: () => COMMUNITY_CLIENT.getMilestoneDetail(milestoneId),
    networkMode: "always",
    retry: false,
    enabled: !!milestoneId,
  });

  return {
    milestoneDetailData: data,
    isLoading,
    error,
    refetchMilestoneDetail: refetch,
  };
}; 