// TODO: do routing later.

// import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/services';
import { IApiError } from '@/utils';

import {
  EXPIRED_SESSION_REFRESH_TOKEN,
  sessionTimeoutError,
} from '../helpers';
import { IApiConfiguration } from '../types';

interface IInterceptAxiosRequestConfigPassed {
  type: 'PASSED';
  config: IApiConfiguration;
}

interface IInterceptAxiosRequestConfigFailed {
  type: 'FAILED';
  error: IApiError;
}

type TInterceptAxiosRequestConfigCallbackReturn =
  | IInterceptAxiosRequestConfigPassed
  | IInterceptAxiosRequestConfigFailed;

export const interceptAxiosRequestConfigCallback = async (
  config: IApiConfiguration,
  // router: ReturnType<typeof useRouter> // Accept the router as a parameter
): Promise<TInterceptAxiosRequestConfigCallbackReturn> => {
  const {
    baseURL,
    requiresAuth = true,
    accessToken,
    contentType: requestContentType = 'application/json',
  } = config;

  const { activeSession, removeSession } = useAuthStore.getState();
  const token = accessToken || activeSession?.access_token;

  if (requiresAuth && !token) {
    removeSession();

    const errorObj = {
      ...sessionTimeoutError,
      name: EXPIRED_SESSION_REFRESH_TOKEN,
      config: {
        baseURL,
        url: config.url,
      },
    };

    return {
      type: 'FAILED',
      error: errorObj,
    };
  }

  const requestConfig = {
    baseURL,
    ...config,
    headers: {
      'Accept-Language': 'en',
      'Content-Type': requestContentType,
      ...(token && { Authorization: `Bearer ${token}` }),
      ...config.headers,
    },
  };

  return { type: 'PASSED', config: requestConfig };
};

// Usage example in a React component or custom hook
export const useInterceptAxiosRequest = () => {
  // const router = useRouter();

  const interceptRequest = async (config: IApiConfiguration) => {
    return interceptAxiosRequestConfigCallback(config);
  };

  return { interceptRequest };
};
