import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError } from "@/utils";
import { errorLogToRemoteUtil } from "@/utils/error-logger";
import { ErrorEventsEnum } from "@/utils/error-logger";
import { IUpdateTicketResponse } from "../types";
import { ALL_TICKETS_QUERY_KEY } from "./useAllTicketsQuery";
import { ALL_TICKETS_ACROSS_PROJECTS_QUERY_KEY } from "./useAllTicketsAcrossProjectsQuery";

export const UPDATE_TICKET_STATUS_MUTATION_KEY = "update-ticket-status-mutation-key";

interface IUpdateTicketStatusOptions {
  onSuccessCallback?: (data: IUpdateTicketResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateTicketStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateTicketStatusOptions = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_TICKET_STATUS_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      COMMUNITY_CLIENT.updateTicketStatus(id, status),
    onSuccess: (response) => {
      // Invalidate tickets caches (per-project and across projects)
      queryClient.invalidateQueries({ queryKey: [ALL_TICKETS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ALL_TICKETS_ACROSS_PROJECTS_QUERY_KEY] });
      onSuccessCallback?.(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateTicketStatusMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateTicketStatus: mutate,
  };
};


