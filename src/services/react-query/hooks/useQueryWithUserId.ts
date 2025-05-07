import { UseQueryOptions, QueryKey } from '@tanstack/react-query';

import { IApiError } from '@/utils';

import { useAuthStore } from '../../stores';

import { useQuery } from './reactQueryHooks';

/**
 * `useQueryWithUserId` is a copy of reactQuery useQuery function with custom userId
 * for session api, state, cache management
 */
export const useQueryWithUserId = <
  TQueryFnData = unknown,
  TError = IApiError,
  TData = TQueryFnData,
>({
  queryKey = [],
  ...rest
}: UseQueryOptions<TQueryFnData, TError, TData>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authState = useAuthStore.getState() as  any;
  const userId = authState?.activeSession?.user?.id || '';

  const key: QueryKey = [...queryKey, userId];

  return useQuery({
    ...rest,
    queryKey: key,
  });
};
