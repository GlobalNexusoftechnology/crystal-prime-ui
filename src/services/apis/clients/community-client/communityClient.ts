import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";

import {
  IAllLeadDownloadExcelResponse,
  IAllLeadResponse,
  IAllStatusResponse,
  IChangePasswordPayload,
  IChangePasswordResponse,
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  ICreateLeadPayload,
  ICreateLeadResponse,
  IDeleteLeadFollowUpPayload,
  IDeleteLeadFollowUpResponse,
  IDeleteLeadPayload,
  IDeleteLeadResponse,
  ILeadDetailResponse,
  ILeadDownloadExcelResponse,
  ILeadFollowUpDetailResponse,
  ILoginPayload,
  ILoginUserResponse,
  IProductsResponse,
  IRegisterPayload,
  IRegisterResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  ISentOtpPayload,
  ISentOtpResponse,
  ISignupPayload,
  ISignupResponse,
  IUpdateLeadFollowUpPayload,
  IUpdateLeadFollowUpResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse,
} from "./types";
import {
  changePasswordUrl,
  createLeadUrl,
  fetchAllFeatureProductsUrl,
  fetchAllHandmadeCarpetProductsUrl,
  fetchAllLeadsListUrl,
  fetchAllNewArrivalsProductsUrl,
  fetchAllProductsUrl,
  fetchAllTrendingProductsUrl,
  fetchAllVintageCarpetProductsUrl,
  getLeadDetailByIdUrl,
  registerUrl,
  resetPasswordUrl,
  loginUrl,
  postRegisterUrl,
  sentOtpUrl,
  verifyEmailUrl,
  getLeadDownloadExcelByIdUrl,
  fetchAllLeadDownloadExcelUrl,
  fetchAllStatusUrl,
  deleteLeadUrl,
  createLeadFollowUpUrl,
  fetchAllLeadFollowUpUrl,
  getLeadFollowUpDetailByIdUrl,

  updateLeadFollowUpByIdUrl,
  deleteLeadFollowUpUrl,
} from "./urls";

/**
 * This is provides the API client methods for the application and routes.
 */
export class CommunityClient extends ApiClient {
  private static classInstance?: CommunityClient;

  private constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_SATKAR_API_BASE_URL,
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
    /**
     * TODO: Check this API call example to call other API's
     */
    const response = await this.post<
      ILoginUserResponse,
      ILoginPayload,
      IApiError
    >(loginUrl(), payload, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.error;
    }
    // const profileData = await this.fetchUserProfileList(
    //   response.data.access_token
    // );

    return { data: response?.data };
  };

  public verifyEmail = async (payload: IVerifyEmailPayload) => {
    const response = await this.post<IVerifyEmailResponse>(
      verifyEmailUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public sentOtp = async (payload: ISentOtpPayload) => {
    const response = await this.post<ISentOtpResponse>(sentOtpUrl(), payload, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // reset password
  public resetPassword = async (payload: IResetPasswordPayload) => {
    const response = await this.post<IResetPasswordResponse>(
      resetPasswordUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  //change password
  public changePassword = async (payload: IChangePasswordPayload) => {
    const response = await this.post<IChangePasswordResponse>(
      changePasswordUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  //create lead

  public createLead = async (payload: ICreateLeadPayload) => {
    const response = await this.post<ICreateLeadResponse>(
      createLeadUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };



  public updateLeadFollowUpById = async (id: string, payload: IUpdateLeadFollowUpPayload) => {
    const response = await this.post<IUpdateLeadFollowUpResponse>(
      updateLeadFollowUpByIdUrl(id),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };



  // create lead follow up

  public createLeadFollowUp = async (payload: ICreateLeadFollowUpPayload) => {
    const response = await this.post<ICreateLeadFollowUpResponse>(
      createLeadFollowUpUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  //delete lead
  public deleteLead = async (payload: IDeleteLeadPayload) => {
    const response = await this.post<IDeleteLeadResponse>(
      deleteLeadUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // delete lead follow up

    public deleteLeadFollowUp = async (payload: IDeleteLeadFollowUpPayload) => {
    const response = await this.post<IDeleteLeadFollowUpResponse>(
      deleteLeadFollowUpUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public register = async (payload: IRegisterPayload) => {
    const response = await this.post<IRegisterResponse>(
      registerUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getLeadDetailById = async (id: string) => {
    const response = await this.get<ILeadDetailResponse>(
      getLeadDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    );

    const isMock = true;

    if (!response?.success && !isMock) {
      throw response?.errorData;
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response;
  };

  public getLeadFollowUpDetailById = async (id: string) => {
    const response = await this.get<ILeadFollowUpDetailResponse>(
      getLeadFollowUpDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    );

    const isMock = true;

    if (!response?.success && !isMock) {
      throw response?.errorData;
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response;
  };

  public getLeadDownloadExcelById = async (id: string) => {
    const response = await this.get<ILeadDownloadExcelResponse>(
      getLeadDownloadExcelByIdUrl(id),
      {
        requiresAuth: false,
      }
    );

    const isMock = true;

    if (!response?.success && !isMock) {
      throw response?.errorData;
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response;
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
  public fetchAllLeadsList = async () => {
    const response = await this.get<IAllLeadResponse>(fetchAllLeadsListUrl(), {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
  };

  // all lead follow ups
  public fetchAllLeadFollowUp = async () => {
    const response = await this.get<IAllLeadResponse>(
      fetchAllLeadFollowUpUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
  };

  public fetchAllLeadDownloadExcel = async () => {
    const response = await this.get<IAllLeadDownloadExcelResponse>(
      fetchAllLeadDownloadExcelUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
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

  public fetchAllStatus = async () => {
    const response = await this.get<IAllStatusResponse>(fetchAllStatusUrl(), {
      requiresAuth: false,
    });

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

  /**
   * This post the register of user.
   */
  public userRegister = async (payload: ISignupPayload) => {
    const response = await this.post<
      ISignupResponse,
      ISignupPayload,
      IApiError
    >(postRegisterUrl(), payload, {
      requiresAuth: false,
    });
    if (!response?.success) {
      throw response;
    }

    return response?.data;
  };
}

/**
 * This creates a new instance of the class. is th base Axios API client Class
 * wrapper for All User Accounts identity related requests like login, logout,
 * password reset, etc.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
