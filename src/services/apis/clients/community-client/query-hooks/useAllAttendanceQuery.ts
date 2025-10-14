import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const ALL_ATTENDANCE_QUERY_KEY = 'all-attendance-query-key';

export const useAllAttendanceQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_ATTENDANCE_QUERY_KEY, ],
    queryFn: () => COMMUNITY_CLIENT.getAllAttendance(),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    refetchAttendances: refetch,
  };
}; 