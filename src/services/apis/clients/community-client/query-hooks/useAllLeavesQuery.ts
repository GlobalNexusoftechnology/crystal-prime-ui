import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_LEAVES_QUERY_KEY = 'all-leaves-query-key';

export const useAllLeavesQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_LEAVES_QUERY_KEY, ],
    queryFn: () => COMMUNITY_CLIENT.getAllLeaves(),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    refetchLeaves: refetch,
  };
}; 