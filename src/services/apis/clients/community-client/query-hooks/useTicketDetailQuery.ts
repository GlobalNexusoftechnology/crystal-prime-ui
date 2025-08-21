import React from "react";
import { useQuery } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError } from "@/utils";
import { errorLogToRemoteUtil } from "@/utils/error-logger";
import { ErrorEventsEnum } from "@/utils/error-logger";
import { ITicketDetailResponse } from "../types";

// Query Keys
export const TICKET_DETAIL_QUERY_KEY = "ticket-detail-query-key";

interface IGetTicketDetailOptions {
  ticketId: string;
  onSuccessCallback?: (data: ITicketDetailResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to fetch ticket detail
 */
export const useTicketDetailQuery = ({
  ticketId,
  onSuccessCallback,
  onErrorCallback,
}: IGetTicketDetailOptions) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [TICKET_DETAIL_QUERY_KEY, ticketId],
    queryFn: () => COMMUNITY_CLIENT.getTicketDetailById(ticketId),
    enabled: !!ticketId,
  });

  // Handle success and error callbacks using useEffect
  React.useEffect(() => {
    if (data && onSuccessCallback) {
      // Create the full response structure expected by the callback
      const fullResponse: ITicketDetailResponse = {
        status: true,
        message: "Ticket detail fetched successfully",
        success: true,
        data: data,
      };
      onSuccessCallback(fullResponse);
    }
  }, [data, onSuccessCallback]);

  React.useEffect(() => {
    if (error && onErrorCallback) {
      const apiError: IApiError = {
        response: null,
        error: error,
        success: false,
        status: 500,
        type: "SERVER_ERROR",
        message: error.message || "Unknown error occurred",
      };
      errorLogToRemoteUtil({
        error: apiError,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useTicketDetailQuery",
        message: apiError.message,
      });
      onErrorCallback(apiError);
    }
  }, [error, onErrorCallback]);

  return {
    ticketDetailData: data,
    isLoading,
    error,
    ticketDetailRefetch: refetch,
  };
};
