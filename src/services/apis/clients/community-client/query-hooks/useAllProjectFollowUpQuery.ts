import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the all client follow up from the backend.
 */
const CLIENT_FOLLOW_UP_QUERY_KEY = 'client-follow-up-query-key';

/**
 * This hook fetches all client follow up.
 */
export const useAllClientFollowUpQuery = (filters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [CLIENT_FOLLOW_UP_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllProjectFollowUp(filters),
    networkMode: 'always'
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    ProjectFollowUp: refetch,
  };
}; 