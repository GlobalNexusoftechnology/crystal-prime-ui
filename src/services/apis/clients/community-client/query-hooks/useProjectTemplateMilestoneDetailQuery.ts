import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const PROJECT_TEMPLATE_MILESTONE_DETAIL_QUERY_KEY = "project-template-milestone-detail-query-key";

export const useProjectTemplateMilestoneDetailQuery = (milestoneId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PROJECT_TEMPLATE_MILESTONE_DETAIL_QUERY_KEY, milestoneId],
    queryFn: () => COMMUNITY_CLIENT.getProjectTemplateMilestoneDetailById(milestoneId),
    networkMode: "always",
    retry: false,
    enabled: !!milestoneId,
  });

  return {
    projectTemplateMilestoneDetailData: data,
    isLoading,
    error,
    refetch,
  };
}; 