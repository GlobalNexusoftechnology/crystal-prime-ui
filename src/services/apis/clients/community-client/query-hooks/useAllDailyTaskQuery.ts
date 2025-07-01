import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const DAILY_TASK_ENTRIES_QUERY_KEY = 'daily-task-entries-query-key';

export const useAllDailyTaskQuery = (projectId?: string) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [DAILY_TASK_ENTRIES_QUERY_KEY, projectId],
    queryFn: () => COMMUNITY_CLIENT.getAllDailyTaskEntries(projectId),
    networkMode: 'always'
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    refetchDailyTasks: refetch,
  };
}; 