import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";

import {
  IAllLeadAttachmentResponse,
  IAllLeadFollowUpResponse,
  IAllLeadResponse,
  IAllLeadStatusHistoryResponse,
  IAllRoleResponse,
  IAllSourcesResponse,
  IAllStatusesResponse,
  IAllTypesResponse,
  IAllUsersResponse,
  IChangePasswordPayload,
  IChangePasswordResponse,
  ICreateLeadAttachmentPayload,
  ICreateLeadAttachmentResponse,
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  ICreateLeadPayload,
  ICreateLeadResponse,
  ICreateLeadStatusHistoryPayload,
  ICreateLeadStatusHistoryResponse,
  ICreateRolePayload,
  ICreateRoleResponse,
  ICreateSourcesPayload,
  ICreateSourcesResponse,
  ICreateStatusesPayload,
  ICreateStatusesResponse,
  ICreateTypesPayload,
  ICreateTypesResponse,
  ICreateUserPayload,
  ICreateUserResponse,
  IDeleteLeadFollowUpResponse,
  IDeleteLeadResponse,
  IDeleteRoleResponse,
  IDeleteSourcesResponse,
  IDeleteStatusesResponse,
  IDeleteTypeResponse,
  IDeleteUserResponse,
  ILeadDetailResponse,
  ILeadDownloadExcelResponse,
  ILeadFollowUpDetailResponse,
  ILoginPayload,
  ILoginUserResponse,
  IRegisterPayload,
  IRegisterResponse,
  IResetPasswordPayload,
  IResetPasswordResponse,
  IRoleDetailsResponse,
  ISentOtpPayload,
  ISentOtpResponse,
  ISignupPayload,
  ISignupResponse,
  ISourcesDetailResponse,
  IStatusesDetailResponse,
  IUpdateLeadFollowUpPayload,
  IUpdateLeadFollowUpResponse,
  IUpdateLeadPayload,
  IUpdateLeadResponse,
  IUpdateRolePayload,
  IUpdateRoleResponse,
  IUpdateSourcesPayload,
  IUpdateSourcesResponse,
  IUpdateStatusesPayload,
  IUpdateStatusesResponse,
  IUpdateTypesPayload,
  IUpdateTypesResponse,
  IUpdateUserPayload,
  IUpdateUserResponse,
  IUploadAttachmentResponse,
  IUploadLeadFromExcelResponse,
  IUserDetailResponse,
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
  fetchAllRoleListUrl,
  getStatusesDetailByIdUrl,
  updateStatusesUrl,
  deleteStatusesUrl,
  createSourcesUrl,
  createStatusesUrl,
  getSourcesDetailByIdUrl,
  updateSourcesUrl,
  deleteSourcesUrl,
  fetchLeadAttachmentUrl,
  createLeadAttachmentUrl,
  fetchAllUsersUrl,
  createUserUrl,
  deleteUserUrl,
  getUserDetailByIdUrl,
  updateUserUrl,
  fetchLeadStatusHistoryUrl,
  createLeadStatusHistoryUrl,
  uploadAttachmentUrl,
  fetchAllUserDownloadExcelUrl,
  fetchLeadDownloadTemplateExcelUrl,
  createRoleUrl,
  updateRoleUrl,
  deleteRoleUrl,
  uploadLeadFromExcelUrl,
  getRoleDetailByIdUrl,
  createTypeUrl,
  deleteTypeUrl,
  updateTypeUrl,
  fetchAllTypesUrl,
} from "./urls";

/**
 * CommunityClient class handles all API requests related to
 * authentication and lead management in the community platform.
 */
export class CommunityClient extends ApiClient {
  private static classInstance?: CommunityClient

  private constructor() {
    super({
      baseURL: process.env.NEXT_PUBLIC_SATKAR_API_BASE_URL,
    })
  }

  /**
   * Returns a singleton instance of CommunityClient to reuse the Axios instance.
   */
  public static readonly getClientInstance = () => {
    if (!this.classInstance) {
      this.classInstance = new CommunityClient()
    }
    return this.classInstance
  }

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
    })

    if (!response?.success) {
      throw response?.error
    }

    return response?.data
  }

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
    >(registerUrl(), payload, {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response
    }

    return response?.data
  }

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
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  /**
   * Sends OTP to the user's email or mobile for verification.
   * @param payload - target for OTP
   * @returns OTP send confirmation
   */
  public sentOtp = async (payload: ISentOtpPayload) => {
    const response = await this.post<ISentOtpResponse>(sentOtpUrl(), payload, {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // reset password
  public resetPassword = async (payload: IResetPasswordPayload) => {
    const response = await this.post<IResetPasswordResponse>(
      resetPasswordUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  //change password
  public changePassword = async (payload: IChangePasswordPayload) => {
    const response = await this.post<IChangePasswordResponse>(
      changePasswordUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  //create lead

  public createLead = async (payload: ICreateLeadPayload) => {
    const response = await this.post<ICreateLeadResponse>(
      createLeadUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.response?.data
    }

    return response?.data
  }

  public createRole = async (payload: ICreateRolePayload) => {
    const response = await this.post<ICreateRoleResponse>(
      createRoleUrl(),
      payload,
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data;
  }

  // create lead attachment

  public createLeadAttachment = async (
    payload: ICreateLeadAttachmentPayload
  ) => {
    const response = await this.post<ICreateLeadAttachmentResponse>(
      createLeadAttachmentUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  public uploadAttachment = async (formData: FormData) => {
    const response = await this.post<IUploadAttachmentResponse>(
      uploadAttachmentUrl(),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        requiresAuth: true, // if no auth required, else set true
      }
    )

    if (!response?.success) {
      throw response.response?.data
    }

    return response?.data
  }

    public uploadLeadFromExcel = async (formData: FormData) => {
    const response = await this.post<IUploadLeadFromExcelResponse>(
      uploadLeadFromExcelUrl(),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        requiresAuth: true, 
      }
    )

    if (!response.success) {
      throw response
    }

    return response?.data
  }

  // create sources
  public createSources = async (payload: ICreateSourcesPayload) => {
    const response = await this.post<ICreateSourcesResponse>(
      createSourcesUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response
    }
    return response?.data
  }
  // create sources
  public createType = async (payload: ICreateTypesPayload) => {
    const response = await this.post<ICreateTypesResponse>(
      createTypeUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response
    }
    return response?.data
  }

  // all statuses

  public createStatuses = async (payload: ICreateStatusesPayload) => {
    const response = await this.post<ICreateStatusesResponse>(
      createStatusesUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response
    }

    return response?.data
  }

  public updateLead = async ({ id, payload }: IUpdateLeadPayload) => {
    const response = await this.put<IUpdateLeadResponse>(
      updateLeadUrl(id),
      payload,
    )

    if (!response?.success) {
      throw response?.response?.data
    }
    return response?.data
  }

  public updateRole = async ({ id, payload }: IUpdateRolePayload) => {
    const response = await this.put<IUpdateRoleResponse>(
      updateRoleUrl(id),
      payload,
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // update statuses
  public updateStatuses = async ({ id, payload }: IUpdateStatusesPayload) => {
    const response = await this.put<IUpdateStatusesResponse>(
      updateStatusesUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response
    }
    return response?.data
  }

  //update Sources
  public updateSources = async ({ id, payload }: IUpdateSourcesPayload) => {
    const response = await this.put<IUpdateSourcesResponse>(
      updateSourcesUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response
    }
    return response?.data
  }

  //update Sources
  public updateType = async ({ id, payload }: IUpdateTypesPayload) => {
    const response = await this.put<IUpdateTypesResponse>(
      updateTypeUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response
    }
    return response?.data
  }

  public updateLeadFollowUp = async ({
    id,
    payload,
  }: IUpdateLeadFollowUpPayload) => {
    const response = await this.put<IUpdateLeadFollowUpResponse>(
      updateLeadFollowUpUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // create lead follow up

  public createLeadFollowUp = async (payload: ICreateLeadFollowUpPayload) => {
    const response = await this.post<ICreateLeadFollowUpResponse>(
      createLeadFollowUpUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  //delete lead
  public deleteLead = async (id: string) => {
    const response = await this.del<IDeleteLeadResponse>(deleteLeadUrl(id))

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  public deleteRole = async (id: string) => {
    const response = await this.del<IDeleteRoleResponse>(deleteRoleUrl(id))

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // delete statuses

  public deleteStatuses = async (id: string) => {
    const response = await this.del<IDeleteStatusesResponse>(
      deleteStatusesUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // delete sources

  public deleteSources = async (id: string) => {
    const response = await this.del<IDeleteSourcesResponse>(
      deleteSourcesUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  public deleteType = async (id: string) => {
    const response = await this.del<IDeleteTypeResponse>(
      deleteTypeUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // delete lead follow up
  public deleteLeadFollowUp = async (id: string) => {
    const response = await this.del<IDeleteLeadFollowUpResponse>(
      deleteLeadFollowUpUrl(id),
      {
        requiresAuth: true,
      }
    )
    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  public register = async (payload: IRegisterPayload) => {
    const response = await this.post<IRegisterResponse>(
      registerUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

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
    )

    if (!response?.success) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response.data.data
  }

  // get by id Sources
  public getSourcesDetailById = async (id: string) => {
    const response = await this.get<ISourcesDetailResponse>(
      getSourcesDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response.data.data
  }

  // get role details by id.
  public getRoleDetailById = async (id: string) => {
    const response = await this.get<IRoleDetailsResponse>(
      getRoleDetailByIdUrl(id),
    )

    if (!response?.success) {
      throw response
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response.data;
  }

  // all statuses get by id

  public getStatusesDetailById = async (id: string) => {
    const response = await this.get<IStatusesDetailResponse>(
      getStatusesDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response.data.data
  }

  public getLeadFollowUpDetailById = async (id: string) => {
    const response = await this.get<ILeadFollowUpDetailResponse>(
      getLeadFollowUpDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    )

    const isMock = true

    if (!response?.success && !isMock) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response
  }

  public getLeadDownloadExcelById = async (id: string) => {
    const response = await this.get<ILeadDownloadExcelResponse>(
      getLeadDownloadExcelByIdUrl(id),
      {
        requiresAuth: false,
      }
    )

    const isMock = true

    if (!response?.success && !isMock) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response
  }

  /**
   * Fetches a list of all leads.
   * @returns list of leads
   */
  public fetchAllLeadsList = async () => {
    const response = await this.get<IAllLeadResponse>(fetchAllLeadsListUrl())

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  public fetchAllSources = async () => {
    const response = await this.get<IAllSourcesResponse>(fetchAllSourcesUrl())

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  public fetchAllTypes = async () => {
    const response = await this.get<IAllTypesResponse>(fetchAllTypesUrl())

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data.data
  }

  // All lead attachment

  public fetchAllLeadAttachment = async () => {
    const response = await this.get<IAllLeadAttachmentResponse>(
      fetchLeadAttachmentUrl(),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.error
    }

    return response?.data.data
  }

  // all lead follow ups
  public fetchAllLeadFollowUp = async (leadId?: string) => {
    const response = await this.get<IAllLeadFollowUpResponse>(
      fetchAllLeadFollowUpUrl(leadId),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.error
    }

    return response?.data.data
  }

  public fetchAllLeadDownloadExcel = async () => {
    const response = await this.get<Blob>(
      fetchAllLeadDownloadExcelUrl(),
      {
        responseType: 'blob'
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  public fetchLeadDownloadTemplateExcel = async () => {
    const response = await this.get<Blob>(
      fetchLeadDownloadTemplateExcelUrl(),
      {
        responseType: 'blob'
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data;
  }

  public fetchAllUserDownloadExcel = async () => {
    const response = await this.get<Blob>(
      fetchAllUserDownloadExcelUrl(),
      {
        responseType: 'blob'
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  public fetchAllStatuses = async () => {
    const response = await this.get<IAllStatusesResponse>(
      fetchAllStatusesUrl(),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data?.data
  }

  public fetchAllRoleList = async () => {
    const response = await this.get<IAllRoleResponse>(fetchAllRoleListUrl(), {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data.data
  }
  // staff

  public fetchAllUsers = async () => {
    const response = await this.get<IAllUsersResponse>(fetchAllUsersUrl(), {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data.data
  }

  //post
  public createUser = async (payload: ICreateUserPayload) => {
    const response = await this.post<ICreateUserResponse>(
      createUserUrl(),
      payload
    )

    if (!response?.success) {
      throw response?.response?.data
    }
    return response?.data
  }

  // get by id

  public getUserDetailById = async (id: string) => {
    const response = await this.get<IUserDetailResponse>(
      getUserDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    // TODO: Remove this comment once the isMock is removed above.
    return response.data.data
  }

  //update
  public updateUser = async ({ id, payload }: IUpdateUserPayload) => {
    const response = await this.put<IUpdateUserResponse>(
      updateUserUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response?.response?.data
    }
    return response?.data
  }

  public deleteUser = async (id: string) => {
    const response = await this.del<IDeleteUserResponse>(deleteUserUrl(id), {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // All lead status history
  public fetchAllLeadStatusHistory = async () => {
    const response = await this.get<IAllLeadStatusHistoryResponse>(
      fetchLeadStatusHistoryUrl(),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data.data
  }

  // create lead follow up
  public createLeadStatusHistory = async (
    payload: ICreateLeadStatusHistoryPayload
  ) => {
    const response = await this.post<ICreateLeadStatusHistoryResponse>(
      createLeadStatusHistoryUrl(),
      payload,
      { requiresAuth: false }
    )

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }
}

/**
 * Exported singleton instance of the CommunityClient to be used across the app.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();
