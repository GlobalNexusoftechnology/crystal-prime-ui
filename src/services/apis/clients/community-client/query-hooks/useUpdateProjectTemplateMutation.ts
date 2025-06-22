import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectTemplateResponse } from "../types";

const UPDATE_PROJECT_TEMPLATE_MUTATION_KEY = "update-project-template-mutation-key";

interface IUpdateProjectTemplateOptions {
  onSuccessCallback: (data: ICreateProjectTemplateResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to update project template
 */
export const useUpdateProjectTemplateMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IUpdateProjectTemplateOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [UPDATE_PROJECT_TEMPLATE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.updateProjectTemplate, 
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useUpdateProjectTemplateMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onUpdateProjectTemplate: mutate,
  };
}; 