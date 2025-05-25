
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_LEAD_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY = 'all-lead-download-template-excel-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useLeadDownloadTemplateExcelQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_LEAD_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchLeadDownloadTemplateExcel,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onLeadDownloadTemplateExcel: refetch,
  };
};
