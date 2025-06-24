import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_CLIENT_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY = 'all-client-download-template-excel-query-key';

export const useClientDownloadTemplateExcelQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_CLIENT_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchClientDownloadTemplateExcel,
    networkMode: 'always',
    enabled: false
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onClientDownloadTemplateExcel: refetch,
  };
} 