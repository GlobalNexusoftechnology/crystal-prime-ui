import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ITicketCommentResponse } from "../types";

const CREATE_TICKET_COMMENT_MUTATION_KEY = "create-ticket-comment-mutation-key";

interface ICreateTicketCommentOptions {
  onSuccessCallback: (data: ITicketCommentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateTicketCommentMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateTicketCommentOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_TICKET_COMMENT_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createTicketComment,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateTicketCommentMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateTicketComment: mutate,
  };
};
