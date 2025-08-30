import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ITicketCommentResponse } from "../types";

const UPDATE_TICKET_COMMENT_MUTATION_KEY = "update-ticket-comment-mutation-key";

interface IUpdateTicketCommentOptions {
  onSuccessCallback: (data: ITicketCommentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateTicketCommentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateTicketCommentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_TICKET_COMMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ commentId, payload }: { commentId: string; payload: Partial<{ ticket_id: string; title?: string; description?: string; status?: string; priority?: string; remark?: string }> }) =>
      COMMUNITY_CLIENT.updateTicketComment(commentId, payload),
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateTicketCommentMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateTicketComment: mutate,
  };
};
