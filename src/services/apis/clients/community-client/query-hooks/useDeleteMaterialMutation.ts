import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";
import { IDeleteMaterialResponse } from "@/services/apis/types";

/**
 * This is to track the material mutation keys in react query cache.
 */
const DELETE_MATERIAL_MUTATION_KEY = "delete-material-mutation-key";

interface IDeleteMaterialOptions {
  onSuccessCallback: (data: IDeleteMaterialResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}

/**
 * This register the user or vender to carpet market.
 */
export const useDeleteMaterialMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteMaterialOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_MATERIAL_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteMaterial,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteMaterialMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteMaterial: mutate,
  };
};
