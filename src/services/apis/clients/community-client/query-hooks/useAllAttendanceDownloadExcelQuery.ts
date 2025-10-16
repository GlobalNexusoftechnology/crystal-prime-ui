import { COMMUNITY_CLIENT } from "../communityClient";
import { IAttendanceExportFilters } from "../types";

export const useAllAttendanceDownloadExcelQuery = () => {
  const onAllAttendanceDownloadExcel = async (filters: IAttendanceExportFilters = {}) => {
    return await COMMUNITY_CLIENT.fetchAllAttendanceDownloadExcel(filters);
  };

  return {
    onAllAttendanceDownloadExcel,
  };
};
