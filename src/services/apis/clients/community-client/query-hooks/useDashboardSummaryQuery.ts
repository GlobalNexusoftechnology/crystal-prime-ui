import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import type { DashboardSummaryApiResponse } from '../types';

const DASHBOARD_SUMMARY_QUERY_KEY = 'dashboard-summary-query-key';

export const useDashboardSummaryQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<DashboardSummaryApiResponse>({
    queryKey: [DASHBOARD_SUMMARY_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchDashboardSummary,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    dashboardSummary: data?.data, // direct access to dashboard summary
    isLoading,
    isPending,
    refetchDashboardSummary: refetch,
  };
};

export type { DashboardSummaryApiResponse }; 