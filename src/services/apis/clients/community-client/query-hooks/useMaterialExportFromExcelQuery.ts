import { COMMUNITY_CLIENT } from '../communityClient';
import { downloadBlobFile } from '@/utils/helpers/downloadFile';

export const useMaterialExportFromExcelQuery = () => {
  const onMaterialExport = async (params?: Record<string, string>) => {
    try {
      const blob = await COMMUNITY_CLIENT.fetchMaterialExcel(params);
      downloadBlobFile(blob, 'material-list.xlsx');
    } catch (error) {
      console.error('Error downloading  Excel:', error);
    }
  };

  return {
    onMaterialExport,
  };
}; 