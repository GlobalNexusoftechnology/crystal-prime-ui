import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils';

export const useLeadReportExcelQuery = () => {
  const onDownloadLeadReportExcel = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchLeadReportExcel(params);
      downloadBlobFile(blob, 'lead-report.xlsx');
    } catch (error) {
      console.error('Error downloading lead report Excel:', error);
    }
  };

  return {
    onDownloadLeadReportExcel,
  };
}; 