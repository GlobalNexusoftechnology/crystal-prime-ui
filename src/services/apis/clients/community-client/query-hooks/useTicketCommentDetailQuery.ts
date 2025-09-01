import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const GET_TICKET_COMMENT_DETAIL_QUERY_KEY = "get-ticket-comment-detail-query-key";

interface IGetTicketCommentDetailOptions {
  commentId: string;
  enabled?: boolean;
}

export const useTicketCommentDetailQuery = ({ commentId, enabled = true }: IGetTicketCommentDetailOptions) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [GET_TICKET_COMMENT_DETAIL_QUERY_KEY, commentId],
    networkMode: "always",
    retry: false,
    enabled: enabled && !!commentId,
    queryFn: () => COMMUNITY_CLIENT.getTicketCommentDetail(commentId),
  });

  return {
    ticketCommentDetailData: data,
    isLoading,
    isError,
    error,
    getTicketCommentDetail: refetch,
  };
};
