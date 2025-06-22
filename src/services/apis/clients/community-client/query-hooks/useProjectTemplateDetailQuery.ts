import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const PROJECT_TEMPLATE_DETAIL_QUERY_KEY = "project-template-detail-query-key";

export const useProjectTemplateDetailQuery = (projectTemplateId: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PROJECT_TEMPLATE_DETAIL_QUERY_KEY, projectTemplateId],
    queryFn: () => COMMUNITY_CLIENT.getProjectTemplateDetailById(projectTemplateId), 
    networkMode: "always",
    retry: false,
    enabled: !!projectTemplateId,
  });

  return {
    projectTemplateDetailData: data,
    isLoading,
    error,
    refetch,
  };
}; 