import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const PROJECT_TEMPLATE_DETAIL_QUERY_KEY = "project-template-detail-query-key";

export const useProjectTemplateDetailQuery = (id: string) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [PROJECT_TEMPLATE_DETAIL_QUERY_KEY, id],
    queryFn: () => COMMUNITY_CLIENT.getProjectTemplateDetailById(id), 
    networkMode: "always",
    retry: false,
    enabled: !!id,
  });

  return {
    projectTemplateDetailData: data,
    isLoading,
    error,
    refetch,
  };
}; 