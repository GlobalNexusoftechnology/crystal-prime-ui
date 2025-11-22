import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateMaterialResponse } from "@/services/apis/types";

/**
 * This is to track the update material mutation.
 */
const UPDATE_MATERIAL_MUTATION_KEY = "update-material-mutation-key";

interface IUpdateMaterialOptions {
  onSuccessCallback: (data: IUpdateMaterialResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update Material
 */
export const useUpdateMaterialMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateMaterialOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_MATERIAL_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.updateMaterial,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateMaterialMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateMaterial: mutate,
  };
};
