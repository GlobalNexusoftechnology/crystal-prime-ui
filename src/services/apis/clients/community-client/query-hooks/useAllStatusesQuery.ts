
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_STATUSES_QUERY_KEY = 'all-statuses-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export interface StatusesFilters {
  page?: number;
  limit?: number;
}

export const useAllStatusesQuery = (filters: StatusesFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_STATUSES_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllStatuses(filters.page, filters.limit),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allStatusesData: data,
    isLoading,
    isPending,
    allStatuses: refetch,
  };
};
