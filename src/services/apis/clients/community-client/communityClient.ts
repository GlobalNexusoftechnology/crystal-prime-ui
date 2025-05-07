import { useAuthStore } from "@/services/stores";
import { ApiClient } from "../../api-client";

import { ILoginPayload, IProductsResponse } from "./types";
import {
  fetchAllFeatureProductsUrl,
  fetchAllHandmadeCarpetProductsUrl,
  fetchAllNewArrivalsProductsUrl,
  fetchAllProductsUrl,
  fetchAllTrendingProductsUrl,
  fetchAllVintageCarpetProductsUrl,
} from "./urls";

/**
 * This is provides the API client methods for the application and routes.
 */
export class CommunityClient extends ApiClient {
  private static classInstance?: CommunityClient;

  private constructor() {
    super({
      baseURL:
        process.env
          .NEXT_PUBLIC_NEXT_FRONTEND_BASIC_FOLDER_STRUCTURE_API_BASE_URL,
    });
  }

  /**
   * Applying the dreaded singleton pattern here to reuse the axios instance.
   */
  public static readonly getClientInstance = () => {
    if (!this.classInstance) {
      this.classInstance = new CommunityClient();
    }

    return this.classInstance;
  };

  /**
   * This authenticates the user with the email and password provided
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public userLogin = async (payload: ILoginPayload) => {
    // TODO: Add our own login API
    const { activeSession } = useAuthStore.getState();
    return activeSession;
    /**
     * TODO: Check this API call example to call other API's
     */
    // const response = await this.post<
    //     ICustomerFeedbackResponse,
    //     ICustomerFeedbackRequestPayload,
    //     IServerResponseError
    //   >(postCustomerFeedbackRequestUrl(), payload, {
    //     requiresAuth: true,
    //   });

    //   if (!response?.success) {
    //     throw response?.errorData;
    //   }

    //   return response?.data?.data;
  };

  /**
   * This fetches the list of products on the carpet market platform.
   */
  public fetchAllProducts = async () => {
    const response = await this.get<IProductsResponse>(fetchAllProductsUrl(), {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  /**
   * This fetches the list of products on the carpet market platform.
   */
  public fetchAllFeatureProducts = async () => {
    const response = await this.get<IProductsResponse>(
      fetchAllFeatureProductsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  /**
   * This fetches the list of handmade carpet products on the carpet market platform.
   */
  public fetchAllHandmadeCarpetProducts = async () => {
    const response = await this.get<IProductsResponse>(
      fetchAllHandmadeCarpetProductsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  /**
   * This fetches the list of vintage carpet products on the carpet market platform.
   */
  public fetchAllVintageCarpetProducts = async () => {
    const response = await this.get<IProductsResponse>(
      fetchAllVintageCarpetProductsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  /**
   * This fetches the list of new arrivals products on the carpet market platform.
   */
  public fetchAllNewArrivalsProducts = async () => {
    const response = await this.get<IProductsResponse>(
      fetchAllNewArrivalsProductsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  /**
   * This fetches the list of trending products on the carpet market platform.
   */
  public fetchAllTrendingProducts = async () => {
    const response = await this.get<IProductsResponse>(
      fetchAllTrendingProductsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };
}

/**
 * This creates a new instance of the class. is th base Axios API client Class
 * wrapper for All User Accounts identity related requests like login, logout,
 * password reset, etc.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
