import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadFile } from '@/utils';

/**
 * This is to track the EI log download template excel query key.
 */
const EI_LOG_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY = 'ei-log-download-template-excel-query-key';

/**
 * This hook downloads EI log template as Excel file.
 */
export const useEILogDownloadTemplateExcelQuery = () => {
  const { data, isError, error, isLoading, isPending } = useQuery({
    queryKey: [EI_LOG_DOWNLOAD_TEMPLATE_EXCEL_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchEILogDownloadTemplateExcel(),
    networkMode: 'always',
    enabled: false, // Don't run automatically
  });

  const onEILogDownloadTemplateExcel = async () => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchEILogDownloadTemplateExcel();
      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(blob);
      downloadFile(url, 'ei-log-template.xlsx');
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading EI log template:', error);
    }
  };

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onEILogDownloadTemplateExcel,
  };
}; 