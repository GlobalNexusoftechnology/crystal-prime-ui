/* eslint-disable @typescript-eslint/no-explicit-any */
// src/services/hooks/useInventoryHistoryByMaterialQuery.ts

import { IGetInventoryHistoryByMaterialResponse, useQuery } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

import { ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const INVENTORY_HISTORY_BY_MATERIAL_QUERY_KEY =
  "inventory-history-by-material-query-key";

export const useInventoryHistoryByMaterialQuery = (materialId: string) => {
  const {
    data,
    isFetching,
    isLoading,
    error,
    refetch,
  } = useQuery<IGetInventoryHistoryByMaterialResponse>({
    queryKey: [INVENTORY_HISTORY_BY_MATERIAL_QUERY_KEY, materialId],
    enabled: !!materialId,
    networkMode: "always",
    retry: false,
    queryFn: () => COMMUNITY_CLIENT.getInventoryHistoryByMaterial(materialId),
  });

  if (error) {
    errorLogToRemoteUtil({
      error,
      errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
      errorTitle: "Error in useInventoryHistoryByMaterialQuery",
      message: (error as any)?.message,
    });
  }

  return {
    data,
    isFetching,
    isLoading,
    error,
    refetch,
  };
};
