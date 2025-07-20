import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils/helpers/downloadFile';

export const useBusinessAnalysisReportExcelQuery = () => {
  const onDownloadBusinessAnalysisReportExcel = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchBusinessAnalysisReportExcel(params);
      downloadBlobFile(blob, 'business-analysis-report.xlsx');
    } catch (error) {
      console.error('Error downloading business analysis report Excel:', error);
    }
  };

  return {
    onDownloadBusinessAnalysisReportExcel,
  };
}; 