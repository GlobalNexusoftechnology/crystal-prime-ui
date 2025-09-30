import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const DAILY_TASK_ENTRIES_QUERY_KEY = 'daily-task-entries-query-key';

export interface DailyTaskFilters {
  taskId?: string;
}

export const useAllDailyTaskQuery = (filters: DailyTaskFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [DAILY_TASK_ENTRIES_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.getAllDailyTaskEntries(filters),
    networkMode: 'always',
    enabled: !!filters.taskId
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