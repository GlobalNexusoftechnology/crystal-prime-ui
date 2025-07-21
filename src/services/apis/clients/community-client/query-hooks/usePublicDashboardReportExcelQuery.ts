import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils/helpers/downloadFile';

export const usePublicDashboardReportExcelQuery = () => {
  const onDownloadPublicDashboardReportExcel = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchPublicDashboardReportExcel(params);
      downloadBlobFile(blob, 'public-dashboard-report.xlsx');
    } catch (error) {
      console.error('Error downloading public dashboard report Excel:', error);
    }
  };

  return {
    onDownloadPublicDashboardReportExcel,
  };
}; 