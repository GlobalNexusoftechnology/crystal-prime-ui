import { useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";
import { ICreateProjectTemplateResponse } from "../types";

const DELETE_PROJECT_TEMPLATE_MUTATION_KEY = "delete-project-template-mutation-key";

interface IDeleteProjectTemplateOptions {
  onSuccessCallback: (data: ICreateProjectTemplateResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to delete project template
 */
export const useDeleteProjectTemplateMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: IDeleteProjectTemplateOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [DELETE_PROJECT_TEMPLATE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.deleteProjectTemplate, 
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useDeleteProjectTemplateMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onDeleteProjectTemplate: mutate,
  };
}; 