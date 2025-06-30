import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const PROJECT_TEMPLATE_MILESTONE_TASK_DETAIL_QUERY_KEY = "project-template-milestone-task-detail-query-key";

export const useProjectTemplateMilestoneTaskDetailQuery = (taskId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PROJECT_TEMPLATE_MILESTONE_TASK_DETAIL_QUERY_KEY, taskId],
    queryFn: () => COMMUNITY_CLIENT.getProjectTemplateMilestoneTaskDetailById(taskId),
    networkMode: "always",
    retry: false,
    enabled: !!taskId,
  });

  return {
    projectTemplateMilestoneTaskDetailData: data,
    isLoading,
    error,
    refetch,
  };
}; 