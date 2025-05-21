
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of status from the backend.
 */
const GET_ALL_STATUS_QUERY_KEY = 'get-all-status-query-key';

/**
 * This hook fetches a list of all the status in the bloom portal.
 */
export const useAllStatusQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [GET_ALL_STATUS_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllStatus,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    allstatus: refetch,
  };
};
