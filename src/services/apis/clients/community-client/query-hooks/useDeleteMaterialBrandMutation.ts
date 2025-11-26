import {  useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteMaterialBrandResponse } from "@/services/apis/types";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_MATERIAL_BRAND_MUTATION_KEY = "delete-material-brand-mutation-key";

interface IDeleteMaterialBrandOptions {
  onSuccessCallback: (data: IDeleteMaterialBrandResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This register the user or vender to carpet market.
 */
export const useDeleteMaterialBrandMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteMaterialBrandOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_MATERIAL_BRAND_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteMaterialBrand,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteMaterialBrandMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteMaterialBrand: mutate,
  };
};
