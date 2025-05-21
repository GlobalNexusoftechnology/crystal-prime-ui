
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the all lead follow up  from the backend.
 */
const LEADS_LIST_QUERY_KEY = 'lead-follow-up-query-key';

/**
 * This hook fetches  all lead follow up.
 */
export const useAlLeadFollowUpQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [LEADS_LIST_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllLeadFollowUp,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    LeadFollowUp: refetch,
  };
};
