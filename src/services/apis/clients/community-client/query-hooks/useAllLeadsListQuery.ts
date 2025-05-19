
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const LEADS_LIST_QUERY_KEY = 'leads-list-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllLeadsListQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [LEADS_LIST_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllLeadsList,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    leadsRefetch: refetch,
  };
};
