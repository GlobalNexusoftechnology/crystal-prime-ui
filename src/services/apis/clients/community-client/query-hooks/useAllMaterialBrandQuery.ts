
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_MATERIAL_BRAND_QUERY_KEY = 'all-material-brand-query-key';

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export interface MaterialBrandFilters {
  page?: number;
}

export const useAllMaterialBrandQuery = (filters: MaterialBrandFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_MATERIAL_BRAND_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.fetchAllMaterialBrand(filters.page),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    allMaterialBrandData: data,
    isLoading,
    isPending,
    allMaterialBrand: refetch,
  };
};
