import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the all client follow up from the backend.
 */
const CLIENT_FOLLOW_UP_QUERY_KEY = 'client-follow-up-query-key';

/**
 * This hook fetches all client follow up.
 */
export const useAllClientFollowUpQuery = (projectId?: string) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [CLIENT_FOLLOW_UP_QUERY_KEY, projectId],
    queryFn: () => COMMUNITY_CLIENT.fetchAllProjectFollowUp(projectId),
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