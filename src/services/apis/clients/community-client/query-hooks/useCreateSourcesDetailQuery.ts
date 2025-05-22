import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const SOURCES_DETAIL_QUERY_KEY = "sources-detail-query-key";

/**
 * This fetches the lead detail
 */
export const useSourcesDetailQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [SOURCES_DETAIL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getSourcesDetailById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    sourcesDetailById: data,
    sourcesDetail: refetch,
  };
};