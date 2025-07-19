import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { StaffPerformanceReportResponse } from '../types';

const STAFF_PERFORMANCE_REPORT_QUERY_KEY = 'staff-performance-report-query-key';

export const useStaffPerformanceReportQuery = (params: { userId: string; startDate?: string; endDate?: string }) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<StaffPerformanceReportResponse>({
    queryKey: [STAFF_PERFORMANCE_REPORT_QUERY_KEY, params],
    queryFn: () => COMMUNITY_CLIENT.fetchStaffPerformanceReport(params),
    networkMode: 'always',
    enabled: !!params.userId,
  });

  return {
    error,
    isError,
    isLoading,
    isPending,
    staffPerformanceData: data,
    fetchStaffPerformanceReport: refetch,
  };
}; 

