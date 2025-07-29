import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { ProjectPerformanceReportResponse } from '../types';

const PROJECT_PERFORMANCE_REPORT_QUERY_KEY = 'project-performance-report-query-key';

export const useProjectPerformanceReportQuery = (params: { projectId?: string; clientId?: string; fromDate?: string; toDate?: string }) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<ProjectPerformanceReportResponse>({
    queryKey: [PROJECT_PERFORMANCE_REPORT_QUERY_KEY, params],
    queryFn: () => COMMUNITY_CLIENT.fetchProjectPerformanceReport(params),
    networkMode: 'always',
    enabled: !!params.projectId || !!params.clientId,
  });

  return {
    error,
    isError,
    isLoading,
    isPending,
    projectPerformanceData: data,
    fetchProjectPerformanceReport: refetch,
  };
}; 