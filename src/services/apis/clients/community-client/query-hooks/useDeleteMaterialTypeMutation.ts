import {  useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteMaterialTypeResponse } from "@/services/apis/types";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_MATERIAL_TYPE_MUTATION_KEY = "delete-material-type-mutation-key";

interface IDeleteMaterialTypeOptions {
  onSuccessCallback: (data: IDeleteMaterialTypeResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This register the user or vender to carpet market.
 */
export const useDeleteMaterialTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteMaterialTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_MATERIAL_TYPE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteMaterialType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteMaterialTypeMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteMaterialType: mutate,
  };
};
