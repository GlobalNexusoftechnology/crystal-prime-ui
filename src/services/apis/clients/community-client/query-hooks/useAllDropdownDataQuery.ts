import { useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * Custom hook to fetch all dropdown data without pagination limits
 */
export const useAllDropdownDataQuery = () => {
  // Fetch all sources without pagination
  const { data: allSourcesData, isLoading: sourcesLoading } = useQuery({
    queryKey: ["all-sources-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllSources(1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all statuses without pagination
  const { data: allStatusesData, isLoading: statusesLoading } = useQuery({
    queryKey: ["all-statuses-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllStatuses(1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all users without pagination
  const { data: allUsersData, isLoading: usersLoading } = useQuery({
    queryKey: ["all-users-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllUsers(undefined, 1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all types without pagination
  const { data: allTypesData, isLoading: typesLoading } = useQuery({
    queryKey: ["all-types-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllTypes(1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all roles without pagination
  const { data: allRoleData, isLoading: roleLoading } = useQuery({
    queryKey: ["all-roles-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllRoleList(1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all EI types without pagination
  const { data: allEILogTypesData, isLoading: eiLogTypesLoading } = useQuery({
    queryKey: ["all-ei-logs-types-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogTypes(1, 10000000000000), 
    networkMode: "always",
  });

  // Fetch all EI types without pagination
  const { data: allEILogHeadsData, isLoading: eiLogHeadsLoading } = useQuery({
    queryKey: ["all-ei-logs-heads-dropdown"],
    queryFn: () => COMMUNITY_CLIENT.fetchAllEILogHeads(1, 10000000000000), 
    networkMode: "always",
  });

  return {
    allSourcesData,
    allStatusesData,
    allUsersData,
    allTypesData,
    allRoleData,
    allEILogTypesData,
    allEILogHeadsData,
    isLoading: sourcesLoading || statusesLoading || usersLoading || typesLoading || roleLoading || eiLogTypesLoading || eiLogHeadsLoading,
  };
};
