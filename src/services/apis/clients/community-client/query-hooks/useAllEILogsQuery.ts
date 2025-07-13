import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { IEILogFilters } from '../types';

/**
 * This is to track the list of EI logs from the backend.
 */
const ALL_EI_LOGS_QUERY_KEY = 'all-ei-logs-query-key';

/**
 * This hook fetches a list of all the EI logs from the backend.
 */
export const useAllEILogsQuery = (filters: IEILogFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_EI_LOGS_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogs(filters),
    networkMode: 'always',
    enabled: !! filters
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    eiLogsRefetch: refetch,
  };
}; 