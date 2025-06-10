import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const DELETE_NOTIFICATION_MUTATION_KEY = "delete-notification-mutation-key";

interface IDeleteNotificationOptions {
  onSuccessCallback?: () => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteNotificationMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteNotificationOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_NOTIFICATION_MUTATION_KEY],
    mutationFn: ({ id }: { id: string }) =>
      COMMUNITY_CLIENT.deleteNotification(id),
    onSuccess: () => {
      // Refresh the notification list
      queryClient.invalidateQueries({ queryKey: ["notifications-query-key"] });
      onSuccessCallback?.();
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteNotificationMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    deleteNotification: mutate,
    isPending,
    error,
  };
};
