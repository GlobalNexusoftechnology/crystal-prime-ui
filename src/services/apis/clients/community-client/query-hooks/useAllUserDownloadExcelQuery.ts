
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_USER_DOWNLOAD_EXCEL_QUERY_KEY = 'all-user-download-excel-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllUserDownloadExcelQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_USER_DOWNLOAD_EXCEL_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllUserDownloadExcel,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    allUserDownloadExcel: refetch,
  };
};
