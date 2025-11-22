
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_MATERIAL_TYPE_QUERY_KEY = 'all-material-type-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export interface MaterialTypeFilters {
  page?: number;
}

export const useAllMaterialTypeQuery = (filters: MaterialTypeFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_MATERIAL_TYPE_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllMaterialType(filters.page),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allMaterialTypeData: data,
    isLoading,
    isPending,
    allMaterialType: refetch,
  };
};
