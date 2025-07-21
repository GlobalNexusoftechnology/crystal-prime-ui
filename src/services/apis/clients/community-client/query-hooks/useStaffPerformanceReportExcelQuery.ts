import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils';

export const useStaffPerformanceReportExcelQuery = () => {
  const onDownloadStaffPerformanceReportExcel = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchStaffPerformanceReportExcel(params);
      downloadBlobFile(blob, 'staff-performance-report.xlsx');
    } catch (error) {
      console.error('Error downloading staff performance report Excel:', error);
    }
  };

  return {
    onDownloadStaffPerformanceReportExcel,
  };
}; 