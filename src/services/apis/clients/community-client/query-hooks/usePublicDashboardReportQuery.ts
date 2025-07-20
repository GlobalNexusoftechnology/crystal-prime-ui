import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { PublicDashboardParams, PublicDashboardReport } from '../types';

const PUBLIC_DASHBOARD_REPORT_QUERY_KEY = 'public-dashboard-report-query-key';

export const usePublicDashboardReportQuery = (params?: PublicDashboardParams) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<PublicDashboardReport>({
    queryKey: [PUBLIC_DASHBOARD_REPORT_QUERY_KEY, params],
    queryFn: () => COMMUNITY_CLIENT.fetchPublicDashboardReport(params),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    isLoading,
    isPending,
    publicDashboardData: data,
    fetchPublicDashboardReport: refetch,
  };
}; 