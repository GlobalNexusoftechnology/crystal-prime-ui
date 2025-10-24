import { ITodayStatusResponse, useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const TODAY_STATUS_QUERY_KEY = "today-attendance-status-query-key";

export const useTodayAttendanceStatus = (staffId?: string) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery<ITodayStatusResponse>({
    queryKey: [TODAY_STATUS_QUERY_KEY, staffId],
    queryFn: () => {
      if (!staffId) return Promise.resolve({ isCheckedIn: false });
      return COMMUNITY_CLIENT.getTodayStatus(staffId);
    },
    networkMode: "always",
    enabled: !!staffId,
  });

  return {
    data, // data: ITodayStatusResponse
    isError,
    error,
    isLoading,
    isPending,
    refetchTodayStatus: refetch,
  };
};
