import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_PROJECT_TEMPLATE_MILESTONES_QUERY_KEY = "all-project-template-milestones-query-key";

export const useAllProjectTemplateMilestonesQuery = (templateId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_PROJECT_TEMPLATE_MILESTONES_QUERY_KEY, templateId],
    queryFn: () => COMMUNITY_CLIENT.fetchAllProjectTemplateMilestones(templateId),
    networkMode: "always",
    retry: false,
    enabled: !!templateId,
  });

  return {
    allProjectTemplateMilestonesData: data,
    isLoading,
    error,
    refetchAllProjectTemplateMilestones: refetch,
  };
}; 