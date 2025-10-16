import { IAttendanceFilters, useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const ALL_ATTENDANCE_QUERY_KEY = "all-attendance-query-key";

export const useAllAttendanceQuery = (filters: IAttendanceFilters = {}) => {
  const { data, isError, error, isLoading, isPending, refetch } = useQuery({
    queryKey: [ALL_ATTENDANCE_QUERY_KEY, filters],
    queryFn: () => COMMUNITY_CLIENT.getAllAttendance(filters),
    networkMode: "always",
  });

  // Return normalized data.list for component usage
  return {
    data: data?.data, // data.data contains { list, pagination }
    isError,
    error,
    isLoading,
    isPending,
    refetchAttendances: refetch,
  };
};
