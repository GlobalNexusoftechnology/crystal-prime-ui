import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_CLIENT_DOWNLOAD_EXCEL_QUERY_KEY = 'all-client-download-excel-query-key';

export const useAllClientDownloadExcelQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_CLIENT_DOWNLOAD_EXCEL_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllClientDownloadExcel,
    networkMode: 'always',
    enabled: false
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onAllClientDownloadExcel: refetch,
  };
} 