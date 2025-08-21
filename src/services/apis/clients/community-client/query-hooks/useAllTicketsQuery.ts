import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of tickets from the backend.
 */
export const ALL_TICKETS_QUERY_KEY = 'all-tickets-query-key';

/**
 * This hook fetches a list of all tickets for a project.
 */
export interface TicketFilters {
  searchText?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const useAllTicketsQuery = (projectId: string, filters: TicketFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_TICKETS_QUERY_KEY, projectId, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllTickets(projectId, filters),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    ticketsData: data,
    isLoading,
    isPending,
    ticketsRefetch: refetch,
  };
};
