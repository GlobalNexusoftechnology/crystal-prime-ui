/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosResponse } from "axios";
// import { useRouter } from 'next/navigation';
import { useAuthStore } from "@/services";
import { ErrorEventsEnum, errorLogToRemoteUtil, IApiError } from "@/utils";
import { generateCustomErrorFromAPICall } from "../helpers";
import {
  IApiClient,
  IApiConfiguration,
  IApiResponse,
  TApiResponseError,
} from "../types";
import { interceptAxiosRequestConfigCallback } from "./interceptAxiosRequestConfigCallback";

/**
 * -----------------------------------------------------------------------------
 * This is the base class to be extended by all the other API clients.
 * It's the direct gateway to axios methods and creates type-safe wrappers
 * around the axios methods to be implemented by the instance clients
 * - such as the `UserAccountsAPIClient`.
 *
 * - It adds error handling logic through interceptors and overrides successful
 * request to add additional success keys.
 * - Also injects tokens on sessions that require auth, and check for token
 * validity or refreshes it behind the scenes if valid. Will log suspend calls
 * if token is expired.
 *
 * @param IApiConfiguration config - axios Request Config.
 * @link [AxiosRequestConfig](https://github.com/axios/axios#request-config)
 */
export abstract class ApiClient implements IApiClient {
  protected readonly client: AxiosInstance;

  /**
   * Creates an instance of the `ApiClient`.
   * @param config IApiConfiguration
   */
  public constructor(config: IApiConfiguration) {
    this.client = ApiClient.createAxiosClient(config);
    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  protected static createAxiosClient(
    apiConfiguration: IApiConfiguration
  ): AxiosInstance {
    const JSON_HEADER = "application/json";
    const { accessToken, responseType, timeout, contentType, acceptHeader } =
      apiConfiguration;

    return axios.create({
      baseURL: apiConfiguration.baseURL,
      responseType: responseType ?? "json",
      timeout: timeout ?? 20 * 1000, // Fallback to 20 seconds
      headers: {
        "Content-Type": contentType ?? JSON_HEADER,
        Accept: acceptHeader ?? JSON_HEADER,
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });
  }

  private readonly interceptAxiosRequestConfig = async (
    config: IApiConfiguration
  ) => {
    // Obtain router from the hook
    // const router = useRouter();

    const requestConfig = await interceptAxiosRequestConfigCallback({
      ...config,
    });

    if (requestConfig.type === "PASSED") {
      return requestConfig.config;
    }

    throw requestConfig.error;
  };

  private readonly interceptAxiosRequestError = (error: Error) =>
    Promise.reject(error);

  private readonly initializeRequestInterceptor = () => {
    this.client.interceptors.request.use(
      // ts-expect-error We made the header optional for in the axios config
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.interceptAxiosRequestConfig,
      this.interceptAxiosRequestError
    );
  };

  private readonly interceptAxiosResponse = (response: AxiosResponse) => ({
    ...(response || {}),
    success: true,
  });

  protected interceptAxiosResponseError = async (error: TApiResponseError) => {
    const errorObject = generateCustomErrorFromAPICall(error);

    const { removeSession } = useAuthStore.getState();

    // Handle 401 and 419 errors without token refresh
    if (error.response?.status === 401 || error.response?.status === 419) {
      removeSession();

      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: errorObject.type,
        message: errorObject.message,
      });

      throw errorObject; // Re-throw the error for further handling
    } else {
      errorLogToRemoteUtil({
        error,
        errorCode: ErrorEventsEnum.ERROR_IN_API_CALL,
        errorTitle: errorObject.type,
        message: errorObject.message,
      });

      throw errorObject; // Re-throw the error for further handling
    }
  };

  private readonly initializeResponseInterceptor = () => {
    this.client.interceptors.response.use(
      this.interceptAxiosResponse,
      this.interceptAxiosResponseError
    );
  };

  /**
   * Wrapper around the axios post request to `POST` request calls to the axios
   * client.
   *
   * @param endpoint The URL of the request
   * @param payload
   * @param config
   * @returns
   */
  public post = async <
    TResponseData = any,
    TRequestPayload = any,
    TResponseError = IApiError
  >(
    endpoint: string,
    payload: TRequestPayload,
    config?: IApiConfiguration<TRequestPayload>
  ): Promise<IApiResponse<TResponseData> | TResponseError> => {
    try {
      const response = await this.client.post<
        TResponseData,
        IApiResponse<TResponseData>
      >(endpoint, payload, config);

      return response;
    } catch (error) {
      return error as TResponseError;
    }
  };

  public patch = async <TResponseData = unknown, TRequestPayload = unknown>(
    endpoint: string,
    payload: TRequestPayload,
    config?: IApiConfiguration<TRequestPayload>
  ): Promise<IApiResponse<TResponseData> | IApiError> => {
    try {
      return await this.client.patch<
        TResponseData,
        IApiResponse<TResponseData>
      >(endpoint, payload, config);
    } catch (error) {
      return error as IApiError;
    }
  };

  public put = async <TResponseData = unknown, TRequestPayload = unknown>(
    endpoint: string,
    payload: TRequestPayload,
    config?: IApiConfiguration<TRequestPayload>
  ): Promise<IApiResponse<TResponseData> | IApiError> => {
    try {
      return await this.client.put<TResponseData, IApiResponse<TResponseData>>(
        endpoint,
        payload,
        config
      );
    } catch (error) {
      return error as IApiError;
    }
  };

  public get = async <TResponseData = unknown, TRequestConfig = unknown>(
    endpoint: string,
    config?: IApiConfiguration<TRequestConfig>
  ): Promise<IApiResponse<TResponseData> | IApiError> => {
    try {
      return await this.client.get<TResponseData, IApiResponse<TResponseData>>(
        endpoint,
        config
      );
    } catch (error) {
      return error as IApiError;
    }
  };

  public del = async <TResponseData = unknown, TRequestPayload = unknown>(
    endpoint: string,
    config?: IApiConfiguration<TRequestPayload>
  ): Promise<IApiResponse<TResponseData> | IApiError> => {
    try {
      return await this.client.delete<
        TResponseData,
        IApiResponse<TResponseData>
      >(endpoint, config);
    } catch (error) {
      return error as IApiError;
    }
  };
}
