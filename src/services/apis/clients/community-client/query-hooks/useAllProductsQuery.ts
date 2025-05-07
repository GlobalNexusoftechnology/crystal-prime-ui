
import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of products from the backend.
 */
const PRODUCTS_LIST_QUERY_KEY = 'products-list-query-key';

/**
 * This hook fetches a list of all the products in the bloom portal.
 */
export const useAllProductsQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [PRODUCTS_LIST_QUERY_KEY],
    queryFn: COMMUNITY_CLIENT.fetchAllProducts,
    networkMode: 'always',
  });

  return {
    error,
    isError,
    data,
    isLoading,
    isPending,
    productsRefetch: refetch,
  };
};
