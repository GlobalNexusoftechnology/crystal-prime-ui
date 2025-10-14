import { IUpdateHolidayResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const UPDATE_HOLIDAY_MUTATION_KEY = "update-holiday-mutation-key";

interface IUpdateHolidayOptions {
  onSuccessCallback: (data: IUpdateHolidayResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useUpdateHolidayMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateHolidayOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_HOLIDAY_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateHoliday,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateHolidayMutation",
        message: err?.message,
      });

      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    updateHoliday: mutate,
  };
};
