import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_MATERIAL_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY = 'all-material-download-template-excel-query-key';

export const useMaterialDownloadTemplateExcelQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_MATERIAL_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchMaterialDownloadTemplateExcel,
    networkMode: 'always',
    enabled: false
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onMaterialDownloadTemplateExcel: refetch,
  };
} 