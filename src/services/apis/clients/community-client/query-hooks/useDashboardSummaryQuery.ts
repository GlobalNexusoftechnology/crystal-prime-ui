import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const DASHBOARD_SUMMARY_QUERY_KEY = 'dashboard-summary-query-key';

export const useDashboardSummaryQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [DASHBOARD_SUMMARY_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchDashboardSummary,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    dashboardSummary: data,
    isLoading,
    isPending,
    refetchDashboardSummary: refetch,
  };
}; 