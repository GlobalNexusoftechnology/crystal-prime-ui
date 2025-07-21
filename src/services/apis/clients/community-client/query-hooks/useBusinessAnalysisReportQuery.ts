import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { BusinessAnalysisParams, BusinessAnalysisReport } from '../types';

const BUSINESS_ANALYSIS_REPORT_QUERY_KEY = 'business-analysis-report-query-key';

export const useBusinessAnalysisReportQuery = (params?: BusinessAnalysisParams) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<BusinessAnalysisReport>({
    queryKey: [BUSINESS_ANALYSIS_REPORT_QUERY_KEY, params],
    queryFn: () => COMMUNITY_CLIENT.fetchBusinessAnalysisReport(params),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    isLoading,
    isPending,
    businessAnalysisData: data,
    fetchBusinessAnalysisReport: refetch,
  };
}; 