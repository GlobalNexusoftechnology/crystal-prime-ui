import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError } from "@/utils";
import { errorLogToRemoteUtil } from "@/utils/error-logger";
import { ErrorEventsEnum } from "@/utils/error-logger";
import { IUpdateTicketResponse, IUpdateTicketRequestPayload } from "../types";
import { ALL_TICKETS_QUERY_KEY } from "./useAllTicketsQuery";

// Mutation Keys
export const UPDATE_TICKET_MUTATION_KEY = "update-ticket-mutation-key";

interface IUpdateTicketOptions {
  onSuccessCallback?: (data: IUpdateTicketResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update ticket
 */
export const useUpdateTicketMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateTicketOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_TICKET_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: ({ id, payload }: IUpdateTicketRequestPayload) =>
      COMMUNITY_CLIENT.updateTicket({ id, payload }),
    onSuccess: (response) => {
      // Invalidate tickets cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [ALL_TICKETS_QUERY_KEY] });
      onSuccessCallback?.(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateTicketMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateTicket: mutate,
  };
};
