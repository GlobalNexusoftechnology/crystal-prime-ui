// src/services/hooks/useDeleteInventoryHistoryMutation.ts

import { IDeleteInventoryHistoryResponse, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const DELETE_INVENTORY_HISTORY_MUTATION_KEY =
  "delete-inventory-history-mutation-key";

interface IDeleteInventoryHistoryOptions {
  onSuccessCallback: (data: IDeleteInventoryHistoryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useDeleteInventoryHistoryMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteInventoryHistoryOptions) => {
  const { mutate, isPending, error } = useMutation<
    IDeleteInventoryHistoryResponse,
    IApiError,
    string
  >({
    mutationKey: [DELETE_INVENTORY_HISTORY_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteInventoryHistory,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteInventoryHistoryMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    deleteInventoryHistory: mutate,
  };
};
