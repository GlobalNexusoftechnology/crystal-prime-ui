
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_STATUSES_QUERY_KEY = 'all-statuses-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllStatusesQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_STATUSES_QUERY_KEY ],
    queryFn: COMMUNITY_CLIENT.fetchAllStatuses,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    allStatuses: refetch,
  };
};
