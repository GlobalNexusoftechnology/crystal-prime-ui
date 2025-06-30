import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const MILESTONE_TASK_DETAIL_QUERY_KEY = "milestone-task-detail-query-key";

export const useMilestoneTaskDetailQuery = (taskId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [MILESTONE_TASK_DETAIL_QUERY_KEY, taskId],
    queryFn: () => COMMUNITY_CLIENT.getMilestoneTaskDetail(taskId),
    networkMode: "always",
    retry: false,
    enabled: !!taskId,
  });

  return {
    milestoneTaskDetailData: data,
    isLoading,
    error,
    refetchMilestoneTaskDetail: refetch,
  };
}; 