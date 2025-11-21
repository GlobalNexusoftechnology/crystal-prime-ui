/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IUpdateWorkRequestStatusPayload } from "../types";

interface UpdateWorkRequestStatusResponse {
  message: string;
  data: any;
}

export const useUpdateWorkRequestStatusMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: (data: UpdateWorkRequestStatusResponse) => void;
  onErrorCallback?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IUpdateWorkRequestStatusPayload;
    }) => COMMUNITY_CLIENT.updateWorkRequestStatus({ id, payload }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-work-requests"] });
      if (onSuccessCallback) {
        onSuccessCallback(data);
      }
    },
    onError: (error) => {
      if (onErrorCallback) {
        onErrorCallback(error);
      }
    },
  });

  return {
    updateWorkRequestStatus: mutate,
    isPending,
  };
};
