
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of client list from the backend.
 */
const ALL_CLIENT_QUERY_KEY = 'all-client-query-key';

/**
 * This hook fetches a list of all the client list in the bloom portal.
 */
export const useAllClientQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_CLIENT_QUERY_KEY ],
    queryFn: COMMUNITY_CLIENT.fetchAllClient,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allClientData: data,
    isLoading,
    isPending,
    refetchClient: refetch,
  };
};
