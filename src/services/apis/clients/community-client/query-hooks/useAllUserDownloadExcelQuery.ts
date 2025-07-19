import { COMMUNITY_CLIENT } from '../communityClient';

/**
 * This is to track the list of leads list from the backend.
 */

/**
 * This hook fetches a list of all the leads list in the bloom portal.
 */
export const useAllUserDownloadExcelQuery = () => {
  const downloadAllUserExcel = async (searchText?: string) => {
    return await COMMUNITY_CLIENT.fetchAllUserDownloadExcel(searchText);
  };

  return {
    downloadAllUserExcel,
  };
};
