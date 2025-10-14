import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_HOLIDAY_QUERY_KEY = 'all-holiday-query-key';

export const useAllHolidayQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_HOLIDAY_QUERY_KEY, ],
    queryFn: () => COMMUNITY_CLIENT.getAllHoliday(),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    refetchHolidays: refetch,
  };
}; 