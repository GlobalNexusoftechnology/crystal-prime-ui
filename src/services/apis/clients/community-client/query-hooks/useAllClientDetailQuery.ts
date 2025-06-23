import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_CLIENT_DETAIL_QUERY_KEY = "all-client-detail-query-key";

export const useAllClientDetailQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [ALL_CLIENT_DETAIL_QUERY_KEY],
      queryFn: COMMUNITY_CLIENT.getAllClientDetails,
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    allClientDetails: data,
    refetchAllClientDetails: refetch,
  };
}; 