/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateWorkRequestPayload } from "../types";

interface CreateWorkRequestResponse {
  message: string;
  data: any;
}

export const useCreateWorkRequestMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: {
  onSuccessCallback?: (data: CreateWorkRequestResponse) => void;
  onErrorCallback?: (error: any) => void;
} = {}) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: ICreateWorkRequestPayload) =>
      COMMUNITY_CLIENT.createWorkRequest(payload),
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
    onCreateWorkRequest: mutate,
    isPending,
  };
};
