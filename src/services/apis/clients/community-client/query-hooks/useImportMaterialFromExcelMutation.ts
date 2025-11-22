import { useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";
import { IApiError, ErrorEventsEnum, errorLogToRemoteUtil } from "@/utils";

const IMPORT_MATERIAL_FROM_EXCEL_MUTATION_KEY = "import-material-from-excel-mutation-key";

interface IImportMaterialFromExcelOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccessCallback: (data: any) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export const useImportMaterialFromExcelMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IImportMaterialFromExcelOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [IMPORT_MATERIAL_FROM_EXCEL_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.importMaterialFromExcel,
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useImportMaterialFromExcelMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onImportMaterialFromExcel: mutate,
  };
}; 