import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_PROJECT_TEMPLATES_QUERY_KEY = "all-project-templates-query-key";

export const useAllProjectTemplatesQuery = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [ALL_PROJECT_TEMPLATES_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllProjectTemplates, 
    networkMode: "always",
    retry: false,
  });

  return {
    allProjectTemplatesData: data,
    isLoading,
    error,
    refetchAllProjectTemplates: refetch,
  };
}; 