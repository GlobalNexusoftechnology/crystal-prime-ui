import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the service requests history listing QUERY keys in react query cache.
 */
const LEAD_DOWNLOAD_EXCEL_QUERY_KEY = "lead-download excel-query-key";

/**
 * This fetches the lead download excel
 */
export const useLeadDownloadExcelQuery = (id: string) => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [LEAD_DOWNLOAD_EXCEL_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getLeadDownloadExcelById(id),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    data,
    leadDownloadExcel: refetch,
  };
};