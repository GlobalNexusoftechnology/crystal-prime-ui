import { useMutation, useQueryClient } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateMaterialResponse } from "@/services/apis/types";

/**
 * This is to track the create material mutation.
 */
const CREATE_MATERIAL_MUTATION_KEY = "create-material-mutation-key";
const NOTIFICATIONS_QUERY_KEY = "notifications-query-key";

interface ICreateMaterialOptions {
  onSuccessCallback: (data: ICreateMaterialResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create Product
 */
export const useCreateMaterialMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateMaterialOptions) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_MATERIAL_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createMaterial,
    onSuccess: (response) => {
      // Invalidate notifications cache to trigger a refetch
      queryClient.invalidateQueries({ queryKey: [NOTIFICATIONS_QUERY_KEY] });
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in usecreateMaterialMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    createMaterial: mutate,
  };
};
