import { COMMUNITY_CLIENT } from '../communityClient';


export const useAllClientDownloadExcelQuery = () => {
  const onAllClientDownloadExcel = async (searchText?: string) => {
    return await COMMUNITY_CLIENT.fetchAllClientDownloadExcel(searchText);
  };

  return {
    onAllClientDownloadExcel,
  };
}; 