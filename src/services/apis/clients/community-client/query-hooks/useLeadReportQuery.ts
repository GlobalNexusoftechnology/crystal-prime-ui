import { useQuery } from '@/services';
import { COMMUNITY_CLIENT } from '../communityClient';
import { LeadReportResponse } from '../types';

const LEAD_REPORT_QUERY_KEY = 'lead-report-query-key';

export const useLeadReportQuery = (params?: { 
  fromDate?: string; 
  toDate?: string; 
  sourceId?: string; 
  statusId?: string;
  userId?: string;
  typeId?: string;
}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<LeadReportResponse>({
    queryKey: [LEAD_REPORT_QUERY_KEY, params],
    queryFn: () => COMMUNITY_CLIENT.fetchLeadReport(params),
    networkMode: 'always',
  });

  return {
    error,
    isError,
    isLoading,
    isPending,
    leadReportData: data?.data,
    fetchLeadReport: refetch,
  };
}; 