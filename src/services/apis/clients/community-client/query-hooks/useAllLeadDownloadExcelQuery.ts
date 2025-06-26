import { COMMUNITY_CLIENT } from '../communityClient';
import type { LeadsListFilters } from './useAllLeadsListQuery';

/**
 * This is to track the list of leads list from the backend.
 */

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllLeadDownloadExcelQuery = () => {
  const onAllLeadDownloadExcel = async (filters: LeadsListFilters) => {
    return await COMMUNITY_CLIENT.fetchAllLeadDownloadExcel(filters);
  };

  return {
    onAllLeadDownloadExcel,
  };
};
