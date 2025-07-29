import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const LEADS_LIST_QUERY_KEY = 'leads-list-query-key';

export interface LeadsListFilters {
  searchText?: string;
  statusId?: string;
  typeId?: string;
  dateRange?: "All" | "Daily" | "Weekly" | "Monthly";
  referenceDate?: string;
  followupFrom?: string;
  followupTo?: string;
  page?: number;
}

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllLeadsListQuery = (filters: LeadsListFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [LEADS_LIST_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllLeadsList(filters),
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
