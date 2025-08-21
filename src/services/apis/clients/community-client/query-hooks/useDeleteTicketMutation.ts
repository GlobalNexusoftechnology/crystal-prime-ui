import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError } from "@/utils";
import { errorLogToRemoteUtil } from "@/utils/error-logger";
import { ErrorEventsEnum } from "@/utils/error-logger";
import { IDeleteTicketResponse } from "../types";
import { ALL_TICKETS_QUERY_KEY } from "./useAllTicketsQuery";

// Mutation Keys
export const DELETE_TICKET_MUTATION_KEY = "delete-ticket-mutation-key";

interface IDeleteTicketOptions {
  onSuccessCallback?: (data: IDeleteTicketResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete ticket
 */
export const useDeleteTicketMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteTicketOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_TICKET_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.deleteTicket,
    onSuccess: (response) => {
      // Invalidate tickets cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [ALL_TICKETS_QUERY_KEY] });
      onSuccessCallback?.(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteTicketMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    deleteTicket: mutate,
  };
};
