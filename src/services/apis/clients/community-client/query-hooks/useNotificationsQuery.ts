import { useQueryWithUserId } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";


/**
 * This is to track the notifications listing QUERY keys in react query cache.
 */
const NOTIFICATIONS_QUERY_KEY = "notifications-query-key";

/**
 * This fetches the notifications
 */
export const useNotificationsQuery = () => {
  const { data, isError, error, isLoading, isPending, refetch } =
    useQueryWithUserId({
      queryKey: [NOTIFICATIONS_QUERY_KEY],
      queryFn: () => COMMUNITY_CLIENT.getNotifications(),
      networkMode: "always",
    });

  return {
    error,
    isError,
    isLoading,
    isPending,
    notifications: data,
    onNotifications: refetch,
  };
}; 