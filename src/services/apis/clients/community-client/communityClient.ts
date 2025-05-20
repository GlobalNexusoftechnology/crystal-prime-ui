import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";

import {
  IAllLeadResponse,
  ICreateLeadPayload,
  ICreateLeadResponse,
  ILeadDetailResponse,
  ILoginPayload,
  ILoginUserResponse,
  ISentOtpPayload,
  ISentOtpResponse,
  ISignupPayload,
  ISignupResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse,
} from "./types";
import {
  createLeadUrl,
  fetchAllLeadsListUrl,
  getLeadDetailByIdUrl,
  loginUrl,
  postRegisterUrl,
  sentOtpUrl,
  verifyEmailUrl,
} from "./urls";

/**
 * CommunityClient class handles all API requests related to 
 * authentication and lead management in the community platform.
 */
export class CommunityClient extends ApiClient {
  private static classInstance?: CommunityClient;

  private constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_SATKAR_API_BASE_URL,
    });
  }

  /**
   * Returns a singleton instance of CommunityClient to reuse the Axios instance.
   */
  public static readonly getClientInstance = () => {
    if (!this.classInstance) {
      this.classInstance = new CommunityClient();
    }
    return this.classInstance;
  };

  /**
   * Authenticates the user with email and password.
   * @param payload - login credentials
   * @returns access token and user info
   */
  public userLogin = async (payload: ILoginPayload) => {
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

    return { data: response?.data };
  };

  /**
   * Registers a new user.
   * @param payload - signup information
   * @returns registered user data
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

  /**
   * Verifies user's email using the provided verification code.
   * @param payload - email and code
   * @returns verification status
   */
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

  /**
   * Sends OTP to the user's email or mobile for verification.
   * @param payload - target for OTP
   * @returns OTP send confirmation
   */
  public sentOtp = async (payload: ISentOtpPayload) => {
    const response = await this.post<ISentOtpResponse>(sentOtpUrl(), payload, {
      requiresAuth: false,
    });

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  };

  /**
   * Creates a new lead entry.
   * @param payload - lead creation data
   * @returns created lead details
   */
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

  /**
   * Fetches lead details using lead ID.
   * @param id - lead ID
   * @returns lead details
   */
  public getLeadDetailById = async (id: string) => {
    const response = await this.get<ILeadDetailResponse>(
      getLeadDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    );


    if (!response?.success) {
      throw response?.errorData;
    }

    return response.data.data;
  };

  /**
   * Fetches a list of all leads.
   * @returns list of leads
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
}

/**
 * Exported singleton instance of the CommunityClient to be used across the app.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
