import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

const DAILY_TASK_ENTRIES_QUERY_KEY = 'daily-task-entries-query-key';

export interface DailyTaskFilters {
  status?: string;
  priority?: string;
  from?: string;
  to?: string;
  projectId?: string;
  search?: string;
  taskId?: string;
}

export const useAllDailyTaskQuery = (filters: DailyTaskFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [DAILY_TASK_ENTRIES_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.getAllDailyTaskEntries(filters),
    networkMode: 'always',
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