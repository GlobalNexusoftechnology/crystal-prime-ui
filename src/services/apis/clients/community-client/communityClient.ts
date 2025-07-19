import { IApiError } from "@/utils";
import { ApiClient } from "../../api-client";

import {
  IAllClientResponse,
  IAllLeadAttachmentResponse,
  IAllLeadFollowUpResponse,
  IAllLeadResponse,
  IAllLeadStatusHistoryResponse,
  IAllProjectsResponse,
  IAllRoleResponse,
  IAllSourcesResponse,
  IAllStatusesResponse,
  IAllTypesResponse,
  IAllUsersResponse,
  IChangePasswordPayload,
  IChangePasswordResponse,
  IClientDetailResponse,
  ICreateClientPayload,
  ICreateClientResponse,
  ICreateLeadAttachmentPayload,
  ICreateLeadAttachmentResponse,
  ICreateLeadFollowUpPayload,
  ICreateLeadFollowUpResponse,
  ICreateLeadPayload,
  ICreateLeadResponse,
  ICreateLeadStatusHistoryPayload,
  ICreateLeadStatusHistoryResponse,
  ICreateProjectPayload,
  ICreateProjectResponse,
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
  IDeleteClientResponse,
  IDeleteLeadFollowUpResponse,
  IDeleteLeadResponse,
  IDeleteNotification,
  IDeleteProjectResponse,
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
  IMarkAsReadNotificationResponse,
  INotificationsResponse,
  IProjectDetailResponse,
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
  IUpdateClientPayload,
  IUpdateClientResponse,
  IUpdateLeadFollowUpPayload,
  IUpdateLeadFollowUpResponse,
  IUpdateLeadPayload,
  IUpdateLeadResponse,
  IUpdateProjectPayload,
  IUpdateProjectResponse,
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
  ICreateProjectTemplatePayload,
  ICreateProjectTemplateResponse,
  IAllProjectTemplatesResponse,
  IProjectTemplateDetailResponse,
  IUpdateProjectTemplatePayload,
  IUpdateProjectTemplateResponse,
  IDeleteProjectTemplateResponse,
  ICreateProjectTemplateMilestonePayload,
  ICreateProjectTemplateMilestoneResponse,
  IAllProjectTemplateMilestonesResponse,
  IProjectTemplateMilestoneDetailResponse,
  IUpdateProjectTemplateMilestonePayload,
  IUpdateProjectTemplateMilestoneResponse,
  IDeleteProjectTemplateMilestoneResponse,
  ICreateProjectTemplateMilestoneTaskPayload,
  ICreateProjectTemplateMilestoneTaskResponse,
  IAllProjectTemplateMilestoneTasksResponse,
  IProjectTemplateMilestoneTaskDetailResponse,
  IUpdateProjectTemplateMilestoneTaskPayload,
  IUpdateProjectTemplateMilestoneTaskResponse,
  IDeleteProjectTemplateMilestoneTaskResponse,
  IUploadClientFromExcelResponse,
  ICreateProjectFollowUpPayload,
  ICreateProjectFollowUpResponse,
  IAllProjectFollowUpResponse,
  ICreateProjectMilestone,
  IProjectMilestoneResponse,
  ICreateProjectTask,
  IProjectTaskResponse,
  IProjectMilestoneDetailResponse,
  IProjectTaskDetailResponse,
  ICreateTaskCommentPayload,
  ITaskCommentResponse,
  IAllTaskCommentsResponse,
  ICreateDailyTaskEntryPayload,
  ICreateDailyTaskEntryResponse,
  IUpdateDailyTaskEntryPayload,
  IDailyTaskEntryResponse,
  IAllDailyTaskEntriesResponse,
  ICreateEILogTypePayload,
  ICreateEILogTypeResponse,
  IUpdateEILogTypePayload,
  IUpdateEILogTypeResponse,
  IAllEILogTypesResponse,
  IDeleteEILogTypeResponse,
  ICreateEILogHeadPayload,
  ICreateEILogHeadResponse,
  IUpdateEILogHeadPayload,
  IUpdateEILogHeadResponse,
  IAllEILogHeadsResponse,
  IDeleteEILogHeadResponse,
  IAllEILogResponse,
  ICreateEILogPayload,
  ICreateEILogResponse,
  IUpdateEILogPayload,
  IUpdateEILogResponse,
  IDeleteEILogResponse,
  IEILogDetailResponse,
  IEILogFilters,
  IUploadEILogFromExcelResponse,
  IDeleteDailyTaskEntryResponse,
  StaffPerformanceReportResponse,
  ProjectPerformanceReportResponse,
} from "./types";
import {
  changePasswordUrl,
  createLeadUrl,
  createProjectUrl,
  fetchAllLeadsListUrl,
  fetchAllProjectsUrl,
  getLeadDetailByIdUrl,
  getProjectDetailByIdUrl,
  registerUrl,
  resetPasswordUrl,
  loginUrl,
  sentOtpUrl,
  verifyEmailUrl,
  getLeadDownloadExcelByIdUrl,
  fetchAllLeadDownloadExcelUrl,
  deleteLeadUrl,
  deleteProjectUrl,
  createLeadFollowUpUrl,
  fetchAllLeadFollowUpUrl,
  getLeadFollowUpDetailByIdUrl,
  deleteLeadFollowUpUrl,
  fetchAllSourcesUrl,
  fetchAllStatusesUrl,
  updateLeadUrl,
  updateProjectUrl,
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
  getNotificationsUrl,
  markAsReadNotificationUrl,
  deleteNotificationUrl,
  createClientUrl,
  getClientDetailByIdUrl,
  updateClientUrl,
  deleteClientUrl,
  fetchAllClientUrl,
  createProjectTemplateUrl,
  fetchAllProjectTemplatesUrl,
  getProjectTemplateDetailByIdUrl,
  updateProjectTemplateUrl,
  deleteProjectTemplateUrl,
  createProjectTemplateMilestoneUrl,
  fetchAllProjectTemplateMilestonesUrl,
  getProjectTemplateMilestoneDetailByIdUrl,
  updateProjectTemplateMilestoneUrl,
  deleteProjectTemplateMilestoneUrl,
  createProjectTemplateMilestoneTaskUrl,
  fetchAllProjectTemplateMilestoneTasksUrl,
  getProjectTemplateMilestoneTaskDetailByIdUrl,
  updateProjectTemplateMilestoneTaskUrl,
  deleteProjectTemplateMilestoneTaskUrl,
  createClientDetailsUrl,
  deleteClientDetailsUrl,
  updateClientDetailsUrl,
  getClientDetailsByIdUrl,
  getAllClientDetailsUrl,
  fetchAllClientDownloadExcelUrl,
  fetchClientDownloadTemplateExcelUrl,
  uploadClientFromExcelUrl,
  fetchAllProjectFollowUpUrl,
  createProjectFollowUpUrl,
  createMilestoneUrl,
  updateMilestoneUrl,
  deleteMilestoneUrl,
  getMilestoneDetailUrl,
  getAllMilestonesUrl,
  createMilestoneTaskUrl,
  updateMilestoneTaskUrl,
  deleteMilestoneTaskUrl,
  getMilestoneTaskDetailUrl,
  getAllMilestoneTasksUrl,
  createTaskCommentUrl,
  updateTaskCommentUrl,
  deleteTaskCommentUrl,
  getTaskCommentDetailUrl,
  getAllTaskCommentsUrl,
  updateTaskStatusUrl,
  createDailyTaskEntryUrl,
  updateDailyTaskEntryUrl,
  deleteDailyTaskEntryUrl,
  getDailyTaskEntryDetailUrl,
  uploadMultipleAttachmentUrl,
  dashboardSummaryUrl,
  fetchAllEILogTypesUrl,
  createEILogTypeUrl,
  getEILogTypeDetailByIdUrl,
  updateEILogTypeUrl,
  deleteEILogTypeUrl,
  fetchAllEILogHeadsUrl,
  createEILogHeadUrl,
  getEILogHeadDetailByIdUrl,
  updateEILogHeadUrl,
  deleteEILogHeadUrl,
  fetchAllEILogsUrl,
  createEILogUrl,
  updateEILogUrl,
  deleteEILogUrl,
  getEILogDetailByIdUrl,
  fetchAllEILogsDownloadExcelUrl,
  fetchEILogDownloadTemplateExcelUrl,
  uploadEILogFromExcelUrl,
  uploadEILogAttachmentUrl,
  staffPerformanceReportUrl,
  projectPerformanceReportUrl,
} from "./urls";
import { IClientDetails, IClientDetailsResponse, DashboardSummaryApiResponse } from "./types";

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
      throw response?.error
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

  // create client follow up

  public createProjectFollowUp = async (payload: ICreateProjectFollowUpPayload) => {
    const response = await this.post<ICreateProjectFollowUpResponse>(
      createProjectFollowUpUrl(),
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

    // all client follow ups
  public fetchAllProjectFollowUp = async () => {
    const response = await this.get<IAllProjectFollowUpResponse>(
      fetchAllProjectFollowUpUrl(),
      {
        requiresAuth: false,
      }
    )

    if (!response?.success) {
      throw response?.error
    }

    return response?.data.data
  }
  /**
   * Fetches a list of all leads.
   * @returns list of leads
   */
  public fetchAllLeadsList = async (filters: {
    searchText?: string;
    statusId?: string;
    typeId?: string;
    dateRange?: "All" | "Daily" | "Weekly" | "Monthly";
    referenceDate?: string;
    followupFrom?: string;
    followupTo?: string;
  } = {}) => {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters.searchText) params.append('searchText', filters.searchText);
    if (filters.statusId && filters.statusId !== 'All Status') params.append('statusId', filters.statusId);
    if (filters.typeId && filters.typeId !== 'All Type') params.append('typeId', filters.typeId);
    if (filters.dateRange && filters.dateRange !== 'All') params.append('dateRange', filters.dateRange);
    if (filters.referenceDate) params.append('referenceDate', filters.referenceDate);
    if (filters.followupFrom) params.append('followupFrom', filters.followupFrom);
    if (filters.followupTo) params.append('followupTo', filters.followupTo);
    const url = params.toString() ? `${fetchAllLeadsListUrl()}?${params.toString()}` : fetchAllLeadsListUrl();

    const response = await this.get<IAllLeadResponse>(url);

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
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

  public fetchAllLeadAttachment = async (leadId?: string) => {
    const response = await this.get<IAllLeadAttachmentResponse>(
      fetchLeadAttachmentUrl(leadId),
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

  public fetchAllLeadDownloadExcel = async (filters: {
    searchText?: string;
    statusId?: string;
    typeId?: string;
    dateRange?: "All" | "Daily" | "Weekly" | "Monthly";
    referenceDate?: string;
    followupFrom?: string;
    followupTo?: string;
  } = {}) => {
    const params = new URLSearchParams();
    if (filters.searchText) params.append('searchText', filters.searchText);
    if (filters.statusId && filters.statusId !== 'All Status') params.append('statusId', filters.statusId);
    if (filters.typeId && filters.typeId !== 'All Type') params.append('typeId', filters.typeId);
    if (filters.dateRange && filters.dateRange !== 'All') params.append('dateRange', filters.dateRange);
    if (filters.referenceDate) params.append('referenceDate', filters.referenceDate);
    if (filters.followupFrom) params.append('followupFrom', filters.followupFrom);
    if (filters.followupTo) params.append('followupTo', filters.followupTo);
    const url = params.toString() ? `${fetchAllLeadDownloadExcelUrl()}?${params.toString()}` : fetchAllLeadDownloadExcelUrl();

    const response = await this.get<Blob>(url, { responseType: 'blob' });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
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
  public fetchAllLeadStatusHistory = async (leadId?: string) => {
    const response = await this.get<IAllLeadStatusHistoryResponse>(
      fetchLeadStatusHistoryUrl(leadId),
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

  public getNotifications = async () => {
    const response = await this.get<INotificationsResponse>(getNotificationsUrl(), {
      requiresAuth: false,
    })

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data.data
  }

  // mark as read notification
  public updateMarkAsReadNotification = async () => {
    const response = await this.patch<IMarkAsReadNotificationResponse>(
      markAsReadNotificationUrl(),
      {
        requiresAuth: true,
      }
    )

    if (!response?.success) {
      throw response?.errorData
    }

    return response?.data
  }

  //delete notification hook

  //delete lead
  public deleteNotification = async (id: string) => {
    const response = await this.del<IDeleteNotification>(deleteNotificationUrl(id))

    if (!response?.success) {
      throw response?.errorData
    }
    return response?.data
  }

  // Project APIs
  // -----------------------------------------------------

  public createProject = async (payload: ICreateProjectPayload) => {
    const response = await this.post<ICreateProjectResponse>(
      createProjectUrl(),
      payload,
      { requiresAuth: false }
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  //client..................
  //post 

  public createClient = async (payload: ICreateClientPayload) => {
    const response = await this.post<ICreateClientResponse>(
      createClientUrl(),
      payload
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  public fetchAllProjects = async () => {
    const response = await this.get<IAllProjectsResponse>(
      fetchAllProjectsUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
  };

  //get

  public fetchAllClient = async () => {
    const response = await this.get<IAllClientResponse>(
      fetchAllClientUrl(),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
  };

  public getProjectDetailById = async (id: string) => {
    const response = await this.get<IProjectDetailResponse>(
      getProjectDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data?.data;
  };

  //get by id
  /**
   * Fetches client details using client ID.
   * @param id - client ID
   * @returns client details
   */
  public getClientDetailById = async (id: string) => {
    const response = await this.get<IClientDetailResponse>(
      getClientDetailByIdUrl(id),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data.data;
  };

  public updateProject = async ({ id, payload }: IUpdateProjectPayload) => {
    const response = await this.put<IUpdateProjectResponse>(
      updateProjectUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  //update client
  public updateClient = async ({ id, payload }: IUpdateClientPayload) => {
    const response = await this.put<IUpdateClientResponse>(
      updateClientUrl(id),
      payload,
      {
        requiresAuth: true,
      }
    );

    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public deleteProject = async (id: string) => {
    const response = await this.del<IDeleteProjectResponse>(
      deleteProjectUrl(id),
      {
        requiresAuth: false,
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // delete client 
  public deleteClient = async (id: string) => {
    const response = await this.del<IDeleteClientResponse>(deleteClientUrl(id));

    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createProjectTemplate = async (payload: ICreateProjectTemplatePayload) => {
    const response = await this.post<ICreateProjectTemplateResponse>(
      createProjectTemplateUrl(),
      payload
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  public fetchAllProjectTemplates = async () => {
    const response = await this.get<IAllProjectTemplatesResponse>(
      fetchAllProjectTemplatesUrl(),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public getProjectTemplateDetailById = async (id: string) => {
    const response = await this.get<IProjectTemplateDetailResponse>(
      getProjectTemplateDetailByIdUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public updateProjectTemplate = async ({ id, payload }: IUpdateProjectTemplatePayload) => {
    const response = await this.put<IUpdateProjectTemplateResponse>(
      updateProjectTemplateUrl(id),
      payload,
      { requiresAuth: true }
    );
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public deleteProjectTemplate = async (id: string) => {
    const response = await this.del<IDeleteProjectTemplateResponse>(
      deleteProjectTemplateUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createProjectTemplateMilestone = async (payload: ICreateProjectTemplateMilestonePayload) => {
    const response = await this.post<ICreateProjectTemplateMilestoneResponse>(
      createProjectTemplateMilestoneUrl(),
      payload
    );

    if (!response?.success) {
      throw response?.response?.data;
    }

    return response?.data;
  };

  public fetchAllProjectTemplateMilestones = async (templateId: string) => {
    const response = await this.get<IAllProjectTemplateMilestonesResponse>(
      fetchAllProjectTemplateMilestonesUrl(templateId),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public getProjectTemplateMilestoneDetailById = async (id: string) => {
    const response = await this.get<IProjectTemplateMilestoneDetailResponse>(
      getProjectTemplateMilestoneDetailByIdUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public updateProjectTemplateMilestone = async ({ id, payload }: IUpdateProjectTemplateMilestonePayload) => {
    const response = await this.put<IUpdateProjectTemplateMilestoneResponse>(
      updateProjectTemplateMilestoneUrl(id),
      payload,
      { requiresAuth: true }
    );
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public deleteProjectTemplateMilestone = async (id: string) => {
    const response = await this.del<IDeleteProjectTemplateMilestoneResponse>(
      deleteProjectTemplateMilestoneUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createProjectTemplateMilestoneTask = async (payload: ICreateProjectTemplateMilestoneTaskPayload) => {
    const response = await this.post<ICreateProjectTemplateMilestoneTaskResponse>(
      createProjectTemplateMilestoneTaskUrl(),
      payload
    );
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public fetchAllProjectTemplateMilestoneTasks = async (milestoneId: string) => {
    const response = await this.get<IAllProjectTemplateMilestoneTasksResponse>(
      fetchAllProjectTemplateMilestoneTasksUrl(milestoneId),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public getProjectTemplateMilestoneTaskDetailById = async (id: string) => {
    const response = await this.get<IProjectTemplateMilestoneTaskDetailResponse>(
      getProjectTemplateMilestoneTaskDetailByIdUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public updateProjectTemplateMilestoneTask = async ({ id, payload }: IUpdateProjectTemplateMilestoneTaskPayload) => {
    const response = await this.put<IUpdateProjectTemplateMilestoneTaskResponse>(
      updateProjectTemplateMilestoneTaskUrl(id),
      payload,
      { requiresAuth: true }
    );
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public deleteProjectTemplateMilestoneTask = async (id: string) => {
    const response = await this.del<IDeleteProjectTemplateMilestoneTaskResponse>(
      deleteProjectTemplateMilestoneTaskUrl(id),
      { requiresAuth: false }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createClientDetails = async (payload: IClientDetails) => {
    const response = await this.post<IClientDetailsResponse>(createClientDetailsUrl(), payload);
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public getAllClientDetails = async () => {
    const response = await this.get<IClientDetailsResponse[]>(getAllClientDetailsUrl(), { requiresAuth: false });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getClientDetailsById = async (id: string) => {
    const response = await this.get<IClientDetailsResponse>(getClientDetailsByIdUrl(id), { requiresAuth: false });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public updateClientDetails = async ({ id, payload }: { id: string, payload: IClientDetails }) => {
    const response = await this.put<IClientDetailsResponse>(updateClientDetailsUrl(id), payload, { requiresAuth: true });
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public deleteClientDetails = async (id: string) => {
    const response = await this.del<IClientDetailsResponse>(deleteClientDetailsUrl(id), { requiresAuth: false });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public fetchAllClientDownloadExcel = async () => {
    const response = await this.get<Blob>(
      fetchAllClientDownloadExcelUrl(),
      {
        responseType: 'blob'
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  }

  public fetchClientDownloadTemplateExcel = async () => {
    const response = await this.get<Blob>(
      fetchClientDownloadTemplateExcelUrl(),
      {
        responseType: 'blob'
      }
    );

    if (!response?.success) {
      throw response?.errorData;
    }

    return response?.data;
  }

  public uploadClientFromExcel = async (formData: FormData) => {
    const response = await this.post<IUploadClientFromExcelResponse>(
      uploadClientFromExcelUrl(),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        requiresAuth: true,
      }
    );

    if (!response?.success) {
      throw response.response?.data;
    }

    return response?.data;
  }

  public createMilestone = async (payload: ICreateProjectMilestone): Promise<IProjectMilestoneResponse> => {
    const response = await this.post<IProjectMilestoneResponse>(createMilestoneUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public updateMilestone = async (milestoneId: string, payload: ICreateProjectMilestone): Promise<IProjectMilestoneResponse> => {
    const response = await this.put<IProjectMilestoneResponse>(updateMilestoneUrl(milestoneId), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public deleteMilestone = async (milestoneId: string): Promise<void> => {
    const response = await this.del<void>(deleteMilestoneUrl(milestoneId));
    if (!response?.success) {
      throw response?.errorData;
    }
  }

  public getMilestoneDetail = async (milestoneId: string): Promise<IProjectMilestoneDetailResponse> => {
    const response = await this.get<IProjectMilestoneDetailResponse>(getMilestoneDetailUrl(milestoneId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public getAllMilestones = async (projectId: string): Promise<IProjectMilestoneResponse> => {
    const response = await this.get<IProjectMilestoneResponse>(getAllMilestonesUrl(projectId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public createMilestoneTask = async (payload: ICreateProjectTask): Promise<IProjectTaskResponse> => {
    const response = await this.post<IProjectTaskResponse>(createMilestoneTaskUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public updateMilestoneTask = async (taskId: string, payload: ICreateProjectTask): Promise<IProjectTaskResponse> => {
    const response = await this.put<IProjectTaskResponse>(updateMilestoneTaskUrl(taskId), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public deleteMilestoneTask = async (taskId: string): Promise<void> => {
    const response = await this.del<void>(deleteMilestoneTaskUrl(taskId));
    if (!response?.success) {
      throw response?.errorData;
    }
  }

  public getMilestoneTaskDetail = async (taskId: string): Promise<IProjectTaskDetailResponse> => {
    const response = await this.get<IProjectTaskDetailResponse>(getMilestoneTaskDetailUrl(taskId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public getAllMilestoneTasks = async (milestoneId: string): Promise<IProjectTaskResponse> => {
    const response = await this.get<IProjectTaskResponse>(getAllMilestoneTasksUrl(milestoneId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  // Task Comments API methods
  public createTaskComment = async (payload: ICreateTaskCommentPayload): Promise<ITaskCommentResponse> => {
    const response = await this.post<ITaskCommentResponse>(createTaskCommentUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public updateTaskComment = async (commentId: string, payload: Partial<ICreateTaskCommentPayload>): Promise<ITaskCommentResponse> => {
    const response = await this.put<ITaskCommentResponse>(updateTaskCommentUrl(commentId), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public deleteTaskComment = async (commentId: string): Promise<void> => {
    const response = await this.del<void>(deleteTaskCommentUrl(commentId));
    if (!response?.success) {
      throw response?.errorData;
    }
  }

  public getTaskCommentDetail = async (commentId: string): Promise<ITaskCommentResponse> => {
    const response = await this.get<ITaskCommentResponse>(getTaskCommentDetailUrl(commentId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  public getAllTaskComments = async (taskId: string): Promise<ITaskCommentResponse[]> => {
    const response = await this.get<IAllTaskCommentsResponse>(getAllTaskCommentsUrl(taskId));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  }

  public updateTaskStatus = async (taskId: string, status: string) => {
    const response = await this.put<{ status: string }>(
      updateTaskStatusUrl(taskId),
      { status }
    );
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // Daily Task Entries API methods
  public createDailyTaskEntry = async (payload: ICreateDailyTaskEntryPayload): Promise<ICreateDailyTaskEntryResponse> => {
    const response = await this.post<ICreateDailyTaskEntryResponse>(createDailyTaskEntryUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public updateDailyTaskEntry = async ({ id, payload }: IUpdateDailyTaskEntryPayload): Promise<IDailyTaskEntryResponse> => {
    const response = await this.put<ICreateDailyTaskEntryResponse>(updateDailyTaskEntryUrl(id), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public deleteDailyTaskEntry = async (id: string): Promise<IDeleteDailyTaskEntryResponse> => {
    const response = await this.del<IDeleteDailyTaskEntryResponse>(deleteDailyTaskEntryUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getDailyTaskEntryDetail = async (id: string): Promise<IDailyTaskEntryResponse> => {
    const response = await this.get<ICreateDailyTaskEntryResponse>(getDailyTaskEntryDetailUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public getAllDailyTaskEntries = async (filters: {
    status?: string;
    priority?: string;
    from?: string;
    to?: string;
    projectId?: string;
    search?: string;
  } = {}): Promise<IDailyTaskEntryResponse[]> => {
    const params = new URLSearchParams();
    if (filters.projectId) params.append('projectId', filters.projectId);
    if (filters.status) params.append('status', filters.status);
    if (filters.priority) params.append('priority', filters.priority);
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);
    if (filters.search) params.append('search', filters.search);
    const url = `/daily-task?${params.toString()}`;
    const response = await this.get<IAllDailyTaskEntriesResponse>(url);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data.data;
  };

  public uploadMultipleAttachments = async (formData: FormData) => {
    const response = await this.post<unknown>(
      uploadMultipleAttachmentUrl(),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' }, requiresAuth: true }
    );
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public fetchDashboardSummary = async (): Promise<DashboardSummaryApiResponse> => {
    const response = await this.get<DashboardSummaryApiResponse>(dashboardSummaryUrl());
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  }

  // EI Log Type Master Methods
  public fetchAllEILogTypes = async () => {
    const response = await this.get<IAllEILogTypesResponse>(fetchAllEILogTypesUrl());
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createEILogType = async (payload: ICreateEILogTypePayload) => {
    const response = await this.post<ICreateEILogTypeResponse>(createEILogTypeUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public updateEILogType = async ({ id, payload }: IUpdateEILogTypePayload) => {
    const response = await this.put<IUpdateEILogTypeResponse>(updateEILogTypeUrl(id), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public deleteEILogType = async (id: string) => {
    const response = await this.del<IDeleteEILogTypeResponse>(deleteEILogTypeUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getEILogTypeDetailById = async (id: string) => {
    const response = await this.get<IAllEILogTypesResponse>(getEILogTypeDetailByIdUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // EI Log Head Master Methods
  public fetchAllEILogHeads = async () => {
    const response = await this.get<IAllEILogHeadsResponse>(fetchAllEILogHeadsUrl());
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createEILogHead = async (payload: ICreateEILogHeadPayload) => {
    const response = await this.post<ICreateEILogHeadResponse>(createEILogHeadUrl(), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public updateEILogHead = async ({ id, payload }: IUpdateEILogHeadPayload) => {
    const response = await this.put<IUpdateEILogHeadResponse>(updateEILogHeadUrl(id), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public deleteEILogHead = async (id: string) => {
    const response = await this.del<IDeleteEILogHeadResponse>(deleteEILogHeadUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getEILogHeadDetailById = async (id: string) => {
    const response = await this.get<IAllEILogHeadsResponse>(getEILogHeadDetailByIdUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  // EI Log Management Methods
  public fetchAllEILogs = async (filters: IEILogFilters = {}) => {
    // Build query string from filters
    const params = new URLSearchParams();
    if (filters.searchText) params.append('searchText', filters.searchText);
    if (filters.eilogTypeId && filters.eilogTypeId !== 'All Type') params.append('eilogTypeId', filters.eilogTypeId);
    if (filters.eilogHeadId && filters.eilogHeadId !== 'All Head') params.append('eilogHeadId', filters.eilogHeadId);
    if (filters.paymentMode && filters.paymentMode !== 'All Payment Mode') params.append('paymentMode', filters.paymentMode);
    if (filters.dateRange && filters.dateRange !== 'All') params.append('dateRange', filters.dateRange);
    if (filters.referenceDate) params.append('referenceDate', filters.referenceDate);
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    const url = params.toString() ? `${fetchAllEILogsUrl()}?${params.toString()}` : fetchAllEILogsUrl();

    const response = await this.get<IAllEILogResponse>(url);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public createEILog = async (payload: ICreateEILogPayload) => {
    const response = await this.post<ICreateEILogResponse>(createEILogUrl(), payload);
    if (!response?.success) {
      throw response?.response?.data;
    }
    return response?.data;
  };

  public updateEILog = async ({ id, payload }: IUpdateEILogPayload) => {
    const response = await this.put<IUpdateEILogResponse>(updateEILogUrl(id), payload);
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public deleteEILog = async (id: string) => {
    const response = await this.del<IDeleteEILogResponse>(deleteEILogUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public getEILogDetailById = async (id: string) => {
    const response = await this.get<IEILogDetailResponse>(getEILogDetailByIdUrl(id));
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public fetchAllEILogsDownloadExcel = async (filters: IEILogFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.searchText) params.append('searchText', filters.searchText);
    if (filters.eilogTypeId && filters.eilogTypeId !== 'All Type') params.append('eilogTypeId', filters.eilogTypeId);
    if (filters.eilogHeadId && filters.eilogHeadId !== 'All Head') params.append('eilogHeadId', filters.eilogHeadId);
    if (filters.paymentMode && filters.paymentMode !== 'All Payment Mode') params.append('paymentMode', filters.paymentMode);
    if (filters.dateRange && filters.dateRange !== 'All') params.append('dateRange', filters.dateRange);
    if (filters.referenceDate) params.append('referenceDate', filters.referenceDate);
    if (filters.fromDate) params.append('fromDate', filters.fromDate);
    if (filters.toDate) params.append('toDate', filters.toDate);
    const url = params.toString() ? `${fetchAllEILogsDownloadExcelUrl()}?${params.toString()}` : fetchAllEILogsDownloadExcelUrl();

    const response = await this.get<Blob>(url, { responseType: 'blob' });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public fetchEILogDownloadTemplateExcel = async () => {
    const response = await this.get<Blob>(fetchEILogDownloadTemplateExcelUrl(), { responseType: 'blob' });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public uploadEILogFromExcel = async (formData: FormData) => {
    const response = await this.post<IUploadEILogFromExcelResponse>(uploadEILogFromExcelUrl(), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      requiresAuth: true,
    });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public uploadEILogAttachment = async (formData: FormData) => {
    const response = await this.post<IUploadAttachmentResponse>(
      uploadEILogAttachmentUrl(),
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

  public fetchStaffPerformanceReport = async (params: { userId: string; startDate?: string; endDate?: string }) => {
    const url = staffPerformanceReportUrl();
    const response = await this.get<StaffPerformanceReportResponse>(url, { params });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };

  public fetchProjectPerformanceReport = async (params: { projectId?: string; clientId?: string; fromDate?: string; toDate?: string }) => {
    const url = projectPerformanceReportUrl();
    const response = await this.get<ProjectPerformanceReportResponse>(url, { params });
    if (!response?.success) {
      throw response?.errorData;
    }
    return response?.data;
  };
}


/**
 * Exported singleton instance of the CommunityClient to be used across the app.
 */
export const COMMUNITY_CLIENT = CommunityClient.getClientInstance();


