import {   useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateMaterialTypeResponse } from "@/services/apis/types";

/**
 * This is to track the login mutation keys in react query cache.
 */
const UPDATE_MATERIAL_TYPE_MUTATION_KEY = "update-material-type-mutation-key";

interface IUpdateMaterialTypeOptions {
  onSuccessCallback: (data: IUpdateMaterialTypeResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * This religion the admin Mu college.
 */
export const useUpdateMaterialTypeMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateMaterialTypeOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_MATERIAL_TYPE_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.updateMaterialType,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateMaterialTypeMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onEditMaterialType: mutate,
  };
};






