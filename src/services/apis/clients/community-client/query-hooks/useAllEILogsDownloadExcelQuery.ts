import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { IEILogFilters } from '../types';
import { downloadFile } from '@/utils';

/**
 * This is to track the EI logs download excel query key.
 */
const ALL_EI_LOGS_DOWNLOAD_EXCEL_QUERY_KEY = 'all-ei-logs-download-excel-query-key';

/**
 * This hook downloads all EI logs as Excel file.
 */
export const useAllEILogsDownloadExcelQuery = () => {
  const { data, isError, error, isLoading, isPending } = useQuery({
    queryKey: [ALL_EI_LOGS_DOWNLOAD_EXCEL_QUERY_KEY],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogsDownloadExcel(),
    networkMode: 'always',
    enabled: false, // Don't run automatically
  });

  const onAllEILogsDownloadExcel = async (filters: IEILogFilters = {}) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchAllEILogsDownloadExcel(filters);
      const url = window.URL.createObjectURL(blob);
      downloadFile(url, 'ei-logs.xlsx');
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading EI logs:', error);
    }
  };

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    onAllEILogsDownloadExcel,
  };
}; 