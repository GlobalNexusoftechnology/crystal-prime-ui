import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";

import {
  IAllLeadDownloadExcelResponse,
  IAllLeadResponse,
  IAllSourcesResponse,
  IAllStatusesResponse,
  IChangePasswordPayload,
  IChangePasswordResponse,
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  ICreateLeadPayload,
  ICreateLeadResponse,
  IDeleteLeadFollowUpResponse,
  IDeleteLeadResponse,
  ILeadDetailResponse,
  ILeadDownloadExcelResponse,
  ILeadFollowUpDetailResponse,
  ILoginPayload,
  ILoginUserResponse,
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
  IUpdateLeadPayload,
  IUpdateLeadResponse,
  IVerifyEmailPayload,
  IVerifyEmailResponse,
} from "./types";
import {
  changePasswordUrl,
  createLeadUrl,
  fetchAllLeadsListUrl,
  getLeadDetailByIdUrl,
  registerUrl,
  resetPasswordUrl,
  loginUrl,
  postRegisterUrl,
  sentOtpUrl,
  verifyEmailUrl,
  getLeadDownloadExcelByIdUrl,
  fetchAllLeadDownloadExcelUrl,
  deleteLeadUrl,
  createLeadFollowUpUrl,
  fetchAllLeadFollowUpUrl,
  getLeadFollowUpDetailByIdUrl,
  deleteLeadFollowUpUrl,
  fetchAllSourcesUrl,
  fetchAllStatusesUrl,
  updateLeadUrl,
  updateLeadFollowUpUrl,
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

  public updateLead = async ({ id, payload }: IUpdateLeadPayload) => {
    const response = await this.put<IUpdateLeadResponse>(
      updateLeadUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public updateLeadFollowUp = async ({ id, payload }: IUpdateLeadFollowUpPayload) => {
    const response = await this.put<IUpdateLeadFollowUpResponse>(
      updateLeadFollowUpUrl(id),
      payload,
      {
        requiresAuth: true,
      }
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
  public deleteLead = async (id: string) => {
    const response = await this.del<IDeleteLeadResponse>(
      deleteLeadUrl(id),
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // delete lead follow up
   public deleteLeadFollowUp = async (id: string) => {
    const response = await this.del<IDeleteLeadFollowUpResponse>(
      deleteLeadFollowUpUrl(id),
      {
        requiresAuth: true,
      }
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

    // TODO: Remove this comment once the isMock is removed above.
    return response.data.data;
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

  public fetchAllSources = async () => {
    const response = await this.get<IAllSourcesResponse>(fetchAllSourcesUrl(), {
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

  public fetchAllStatuses = async () => {
    const response = await this.get<IAllStatusesResponse>(
      fetchAllStatusesUrl(),
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
 * Exported singleton instance of the CommunityClient to be used across the app.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
