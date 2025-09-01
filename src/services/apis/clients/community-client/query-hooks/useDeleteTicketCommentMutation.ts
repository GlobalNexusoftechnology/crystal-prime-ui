import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const DELETE_TICKET_COMMENT_MUTATION_KEY = "delete-ticket-comment-mutation-key";

interface IDeleteTicketCommentOptions {
  onSuccessCallback: () => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteTicketCommentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteTicketCommentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_TICKET_COMMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: (commentId: string) => COMMUNITY_CLIENT.deleteTicketComment(commentId),
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteTicketCommentMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteTicketComment: mutate,
  };
};
