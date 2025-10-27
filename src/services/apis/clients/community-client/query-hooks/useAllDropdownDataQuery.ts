import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * Custom hook to fetch all dropdown data without pagination limits
 */
export const useAllDropdownDataQuery = () => {
  // Fetch all sources without pagination
  const { data: allSourcesData, isLoading: sourcesLoading } = useQuery({
    queryKey: ["all-sources-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllSources(1, 1000000), 
    networkMode: "always",
  });

  // Fetch all statuses without pagination
  const { data: allStatusesData, isLoading: statusesLoading } = useQuery({
    queryKey: ["all-statuses-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllStatuses(1, 1000000), 
    networkMode: "always",
  });

  // Fetch all users without pagination
  const { data: allUsersData, isLoading: usersLoading } = useQuery({
    queryKey: ["all-users-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllUsers(undefined, 1, 1000000), 
    networkMode: "always",
  });

  // Fetch all types without pagination
  const { data: allTypesData, isLoading: typesLoading } = useQuery({
    queryKey: ["all-types-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllTypes(1, 1000000), 
    networkMode: "always",
  });

  return {
    allSourcesData,
    allStatusesData,
    allUsersData,
    allTypesData,
    isLoading: sourcesLoading || statusesLoading || usersLoading || typesLoading,
  };
};
