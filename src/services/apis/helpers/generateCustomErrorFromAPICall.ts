import axios, { AxiosError } from "axios";

import { useAuthStore } from "@/services";
import { IApiError, IError, IResponse } from "@/utils";

/**
 * The error code thrown when the app session expires and cannot be renewed by
 * the refresh token.
 */
export const EXPIRED_SESSION_REFRESH_TOKEN = "EXPIRED_SESSION_REFRESH_TOKEN";

export const sessionTimeoutError: IApiError = {
  /* Axios/fetch response isn’t available here, so use a neutral placeholder */
  response: null,
  description: "Your session has expired. Please log in again.",
  error: Error("Session has Expired"),
  message: "Session has expired.",
  success: false,
  status: false,
  statusCode: "419",
  type: "SESSION_ERROR",
};

/**
 * This handles errors returned by network requests such as Axios bad requests,
 * failed server responses, and retrieving the thrown error and returning a
 * formatted error object for the UI Error sections & boundaries.
 *
 * @link [Axios Docs : Handling Errors](https://axios-http.com/docs/handling_errors)
 */
export const generateCustomErrorFromAPICall = (
  error: AxiosError<IError>
): IApiError => {
  /**
   * Setup the default error. Later override the keys to update them depending
   * on the filtered out error case.
   */
  const removeSession = useAuthStore.getState()?.removeSession;
  const errorResponse: IApiError = {
    /* full Axios response, or null if unavailable */
    response: (error.response ?? null) as IResponse | null,
    error,
    errorData: error.response?.data?.error,
    message: error.response?.data.error ?? "An unexpected error occurred.",
    description:
      error.response?.data.error_description ?? "An unexpected error occurred.",
    success: false,
    status: error?.response?.data?.status || false,
    type: "JS_TYPE_ERROR",
  };

  /**
   * If the error is thrown by the API interceptor and it's a session timeout
   */
  if (error?.name === EXPIRED_SESSION_REFRESH_TOKEN) {
    removeSession();

    return sessionTimeoutError;
  }

  if (!axios.isAxiosError(error)) {
    return errorResponse;
  }

  /**
   * The request was made and the server responded with a status code that falls
   * out of the range of 2xx.
   */
  if (error.response) {
    /**
     * There was an error in the payload. Such as an invalid password in a login
     * request. Usually, the server responds with a proper message, use that first
     * unless otherwise.
     */
    if (error.response.status === 400) {
      return {
        ...errorResponse,
        message:
          error.response?.data.error ||
          error.response.data?.message ||
          "Bad Request. Please check your input.",
        description:
          error.response?.data.error_description ||
          "Bad Request. Please check your input.",
        status: error.response.data?.status || false,
        type: "SERVER_ERROR",
      };
    }

    /**
     * Wrong endpoint called & server returned with `404`. Happens when the API was
     * migrated or server is down.
     */
    if (error.response.status === 404) {
      return {
        ...errorResponse,
        message: "Not Found. The requested resource could not be found.",
        description: "The requested resource could not be found on the server.",
        status: error.response.data?.status || false,
        type: "SERVER_ERROR",
      };
    }

    /**
     * Some server error that is specific to Backend Failing.
     */
    if (error.response.status === 500) {
      return {
        ...errorResponse,
        message: error.response.data.error || "Internal Server Error.",
        description:
          error.response.data.error ||
          "An unexpected error occurred on the server.",
        status: error?.response.data?.status || false,
        errorServer: {
          title: "You might be having some invalid inputs",
          message: error?.response.data.errorMessage ?? "",
        },
        type: "SERVER_ERROR",
      };
    }
  } else if (error.request) {
    /**
     * The request was made but no response was received. Note the `error.request`
     * is an instance of `XMLHttpRequest` in the browser and an instance of
     * `http.ClientRequest` in node.js.
     * This is usually caused by network issues, timeouts, or hanged JS threads.
     */

    /**
     * Error in network connection, thrown when `axios` failed to establish a
     * connection to the server.
     */
    if (error.code === "ERR_NETWORK") {
      return {
        ...errorResponse,
        message: "Network Error. Please check your internet connection.",
        description: "Unable to connect to the server. Please try again later.",
        status: false,
        type: "NETWORK_ERROR",
      };
    }

    /**
     * Request timed out based on what was set in the `config.timeout`,
     * thrown by `axios` when the server takes longer than expected to respond.
     */
    if (error.code === "ECONNABORTED") {
      return {
        ...errorResponse,
        message: "Request timed out. Please try again later.",
        description: "The server took too long to respond.",
        status: false,
        type: "NETWORK_ERROR",
      };
    }
  } else {
    /**
     * Something happened in setting up the request that triggered an Error
     * Return the generic error object.
     */
    return errorResponse;
  }

  /**
   * Worst-case scenario, that something happened in setting up the request that
   * triggered an Error.
   *
   * - Only God & the devil know what happened to this API call 🥹
   * Though might be caused by runtime error such as indexing something undefined.
   * - Let's make a silent prayer for our customers and hope for the best. 🤞
   */
  return errorResponse;
};
