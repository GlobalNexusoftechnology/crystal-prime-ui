import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import type { LeadsListFilters } from './useAllLeadsListQuery';

/**
 * This is to track the list of leads list from the backend.
 */
const ALL_LEAD_DOWNLOAD_EXCEL_QUERY_KEY = 'all-lead-download-excel-query-key';

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
