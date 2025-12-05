// src/services/hooks/useCreateInventoryHistoryMutation.ts

import { ICreateInventoryHistoryPayload, ICreateInventoryHistoryResponse, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

const CREATE_INVENTORY_HISTORY_MUTATION_KEY =
  "create-inventory-history-mutation-key";

interface ICreateInventoryHistoryOptions {
  onSuccessCallback: (data: ICreateInventoryHistoryResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateInventoryHistoryMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateInventoryHistoryOptions) => {
  const { mutate, isPending, error } = useMutation<
    ICreateInventoryHistoryResponse,
    IApiError,
    ICreateInventoryHistoryPayload
  >({
    mutationKey: [CREATE_INVENTORY_HISTORY_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createInventoryHistory,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateInventoryHistoryMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    createInventoryHistory: mutate,
  };
};
