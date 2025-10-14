import {   ICreateHolidayResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the create lead mutation.
 */
const CREATE_HOLIDAY_MUTATION_KEY = "create-holiday-mutation-key";

interface ICreateHolidayOptions {
  onSuccessCallback: (data: ICreateHolidayResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create Holiday
 */
export const useCreateHolidayMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateHolidayOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_HOLIDAY_MUTATION_KEY],
    networkMode: "always", // Ensures the call happens even in offline mode
    retry: false, // Do not retry failed requests
    mutationFn: COMMUNITY_CLIENT.createHoliday,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateHolidayMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onHolidayMutation: mutate,
  };
};