import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const GET_ALL_TICKET_COMMENTS_QUERY_KEY = "get-all-ticket-comments-query-key";

interface IGetAllTicketCommentsOptions {
  ticketId: string;
  enabled?: boolean;
}

export const useGetAllTicketCommentsQuery = ({ ticketId, enabled = true }: IGetAllTicketCommentsOptions) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [GET_ALL_TICKET_COMMENTS_QUERY_KEY, ticketId],
    networkMode: "always",
    retry: false,
    enabled: enabled && !!ticketId,
    queryFn: () => COMMUNITY_CLIENT.getAllTicketComments(ticketId),
  });

  return {
    allTicketCommentsData: data,
    isLoading,
    isError,
    error,
    getAllTicketComments: refetch,
  };
};
