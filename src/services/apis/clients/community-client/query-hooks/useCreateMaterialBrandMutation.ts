import {    useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateMaterialBrandResponse } from "@/services/apis/types";

const CREATE_MATERIAL_BRAND_MUTATION_KEY = "create-material-brand-mutation-key";

interface ICreateMaterialBrandOptions {
  onSuccessCallback: (data: ICreateMaterialBrandResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateMaterialBrandMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateMaterialBrandOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_MATERIAL_BRAND_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createMaterialBrand,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateMaterialBrandMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onMaterialBrandMutation: mutate,
  };
};