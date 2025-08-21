import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError } from "@/utils";
import { errorLogToRemoteUtil } from "@/utils/error-logger";
import { ErrorEventsEnum } from "@/utils/error-logger";
import { ICreateTicketResponse } from "../types";
import { ALL_TICKETS_QUERY_KEY } from "./useAllTicketsQuery";

// Mutation Keys
export const CREATE_TICKET_MUTATION_KEY = "create-ticket-mutation-key";

interface ICreateTicketOptions {
  onSuccessCallback?: (data: ICreateTicketResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create ticket
 */
export const useCreateTicketMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateTicketOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_TICKET_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createTicket,
    onSuccess: (response) => {
      // Invalidate tickets cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [ALL_TICKETS_QUERY_KEY] });
      onSuccessCallback?.(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateTicketMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createTicket: mutate,
  };
};
