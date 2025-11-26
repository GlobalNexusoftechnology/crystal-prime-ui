import {   useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateMaterialBrandResponse } from "@/services/apis/types";


const UPDATE_MATERIAL_BRAND_MUTATION_KEY = "update-material-brand-mutation-key";

interface IUpdateMaterialBrandOptions {
  onSuccessCallback: (data: IUpdateMaterialBrandResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateMaterialBrandMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateMaterialBrandOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_MATERIAL_BRAND_MUTATION_KEY],
    networkMode: "always", 
    retry: false, 
    mutationFn: COMMUNITY_CLIENT.updateMaterialBrand,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateMaterialBrandMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditMaterialBrand: mutate,
  };
};






