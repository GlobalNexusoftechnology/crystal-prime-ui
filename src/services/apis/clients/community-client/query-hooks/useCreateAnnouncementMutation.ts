import {  IAnnouncementResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_ANNOUNCEMENT_MUTATION_KEY = "create-announcement-mutation-key";

interface ICreateAnnouncementOptions {
  onSuccessCallback: (data: IAnnouncementResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create Announcement
 */
export const useCreateAnnouncementMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateAnnouncementOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_ANNOUNCEMENT_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createAnnouncement,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateAnnouncementMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onAnnouncementMutation: mutate,
  };
};