import { IMarkAsReadNotificationResponse, useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const MARK_NOTIFICATION_AS_READ_MUTATION_KEY = "mark-notification-as-read";

/**
 * Options for handling mutation callbacks
 */
interface IMarkNotificationAsReadOptions {
  onSuccessCallback: (data: IMarkAsReadNotificationResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Custom mutation hook to mark a notification as read
 */
export const useMarkAsReadNotificationMutation = ({
  // onSuccessCallback,
  onErrorCallback,
}: IMarkNotificationAsReadOptions) => {
  const queryClient = useQueryClient();

  const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationKey: [MARK_NOTIFICATION_AS_READ_MUTATION_KEY],
    mutationFn: () => COMMUNITY_CLIENT.updateMarkAsReadNotification(),
    networkMode: "always",
    retry: false,
    // onSuccess: (response) => {
    //   onSuccessCallback(response);
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-query-key"] });
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useMarkNotificationAsReadMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    markNotificationAsRead: mutate,
  };
};
