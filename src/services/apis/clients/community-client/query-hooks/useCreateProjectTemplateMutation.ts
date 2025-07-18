import { ICreateProjectTemplateResponse, useMutation } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { COMMUNITY_CLIENT } from "../communityClient";

const CREATE_PROJECT_TEMPLATE_MUTATION_KEY = "create-project-template-mutation-key";

interface ICreateProjectTemplateOptions {
  onSuccessCallback: (data: ICreateProjectTemplateResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

/**
 * Hook to create project template
 */
export const useCreateProjectTemplateMutation = ({
  onSuccessCallback,
  onErrorCallback,
}: ICreateProjectTemplateOptions) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: [CREATE_PROJECT_TEMPLATE_MUTATION_KEY],
    networkMode: "always",
    retry: false,
    mutationFn: COMMUNITY_CLIENT.createProjectTemplate, 
    onSuccess: (response) => {
      onSuccessCallback(response);
    },
    onError: (err: IApiError) => {
      errorLogToRemoteUtil({
        error: err,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: "Error in useCreateProjectTemplateMutation",
        message: err?.message,
      });
      onErrorCallback?.(err);
    },
  });

  return {
    error,
    isPending,
    onCreateProjectTemplate: mutate,
  };
}; 