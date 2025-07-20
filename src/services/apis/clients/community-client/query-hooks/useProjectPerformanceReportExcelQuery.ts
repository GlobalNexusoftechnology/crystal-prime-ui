import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils';

export const useProjectPerformanceReportExcelQuery = () => {
  const onDownloadProjectPerformanceReportExcel = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchProjectPerformanceReportExcel(params);
      downloadBlobFile(blob, 'project-performance-report.xlsx');
    } catch (error) {
      console.error('Error downloading project performance report Excel:', error);
    }
  };

  return {
    onDownloadProjectPerformanceReportExcel,
  };
}; 