import { IDeleteHolidayResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";

import { COMMUNITY_CLIENT } from "../communityClient";

/**
 * This is to track the login mutation keys in react query cache.
 */
const DELETE_HOLIDAY_MUTATION_KEY = "delete-holiday-mutation-key";

interface IDeleteHolidayOptions {
  onSuccessCallback: (data: IDeleteHolidayResponse) => void;
  onErrorCallback?: (error: IApiError) => void;
}
  
/**
 * This register the user or vender to carpet market.
 */
export const useDeleteHolidayMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteHolidayOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_HOLIDAY_MUTATION_KEY],
    networkMode: "always", // Even make calls when offline
    retry: false, // For login Request, do not retry failed requests.
    mutationFn: COMMUNITY_CLIENT.deleteHoliday,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteHolidayMutation",
        message: error?.message,
      });

      onErrorCallback?.(err);

      return err;
    },
  });

  return {
    error,
    isPending,
    onDeleteHoliday: mutate,
  };
};