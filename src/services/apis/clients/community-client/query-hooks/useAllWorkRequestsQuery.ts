import { useQuery } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";

export const useAllWorkRequestsQuery = () => {
  return useQuery({
    queryKey: ["all-work-requests"],
    queryFn: () => COMMUNITY_CLIENT.getAllWorkRequests(),
  });
};
