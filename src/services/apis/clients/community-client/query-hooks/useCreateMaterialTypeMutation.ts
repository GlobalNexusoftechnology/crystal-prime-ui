import {    useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateMaterialTypeResponse } from "@/services/apis/types";

const CREATE_MATERIAL_TYPE_MUTATION_KEY = "create-material-type-mutation-key";

interface ICreateMaterialTypeOptions {
  onSuccessCallback: (data: ICreateMaterialTypeResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useCreateMaterialTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateMaterialTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_MATERIAL_TYPE_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createMaterialType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateMaterialTypeMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onMaterialTypeMutation: mutate,
  };
};