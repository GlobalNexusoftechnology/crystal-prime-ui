import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of tickets across all projects from the backend.
 */
export const ALL_TICKETS_ACROSS_PROJECTS_QUERY_KEY = 'all-tickets-across-projects-query-key';

/**
 * This hook fetches a list of all tickets across all projects.
 */
export interface TicketAcrossProjectsFilters {
  searchText?: string;
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
}

export const useAllTicketsAcrossProjectsQuery = (filters: TicketAcrossProjectsFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_TICKETS_ACROSS_PROJECTS_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllTicketsAcrossProjects(filters),
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
