import { IUser } from "@/services/stores/auth-store/types";
import { IApiError } from "@/utils";

export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IVerifyEmailPayload {
  email: string;
}

export interface ISource {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IStatus {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllStatusResponse {
  status: boolean;
  message: string;
  success: true;
  data: IStatus[];
}

export interface IAllStatusesList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  color?: string;
}

export interface IAllStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllStatusesList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// START LEAD TYPES

export interface ICreateTypesPayload {
  name: string;
}

export interface ICreateTypesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateTypesPayload;
}
export interface IUpdateTypesPayload {
  id: string;
  payload: ICreateTypesPayload;
}

export interface IUpdateTypesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateTypesPayload;
}

export interface IType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: IType[];
}

export interface IAllTypesList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IAllTypesResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllTypesList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}
// delete types
export interface IDeleteTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateTypesPayload;
}
// END LEAD TYPES

// START EI LOG TYPE MASTER
export interface ICreateEILogTypePayload {
  name: string;
}

export interface ICreateEILogTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateEILogTypePayload;
}

export interface IUpdateEILogTypePayload {
  id: string;
  payload: ICreateEILogTypePayload;
}

export interface IUpdateEILogTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateEILogTypePayload;
}

export interface IEILogType {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllEILogTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILogType[];
}

export interface IAllEILogTypeList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IAllEILogTypesResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllEILogTypeList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface IDeleteEILogTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateEILogTypePayload;
}
// END EI LOG TYPE MASTER

// START EI LOG HEAD MASTER
export interface ICreateEILogHeadPayload {
  name: string;
}

export interface ICreateEILogHeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateEILogHeadPayload;
}

export interface IUpdateEILogHeadPayload {
  id: string;
  payload: ICreateEILogHeadPayload;
}

export interface IUpdateEILogHeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateEILogHeadPayload;
}

export interface IEILogHead {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllEILogHeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILogHead[];
}

export interface IAllEILogHeadList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IAllEILogHeadsResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllEILogHeadList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface IDeleteEILogHeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateEILogHeadPayload;
}
// END EI LOG HEAD MASTER

export interface IAllLeadsList {
  id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  deleted: boolean;
  deleted_at: string | null;
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  other_contact: string;
  email: string;
  location: string;
  budget: string;
  possibility_of_conversion?: number | null;
  requirement: string;
  source: ISource;
  status: IStatus;
  type: IType;
  assigned_to: IAllUsersListResponse;
}

export interface IStats {
  totalLeads: number;
  assignedToMe: number;
  profileSent: number;
  convertedLeads: number;
  todayFollowups: 0;
}

export interface IAllLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllLeadsList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
    stats: IStats;
  };
}

//
export interface ICreateStatusResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllStatusesList;
}

export interface ICreateSourcesPayload {
  name: string;
}

export interface ICreateSourcesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateSourcesPayload;
}

//get by id all statuses
export interface IStatusesDetailList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IStatusesDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IStatusesDetailList[];
}

export interface ISourcesDetailList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface ISourcesDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ISourcesDetailList;
}

export interface IRoleDetailsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IRoleData;
}

export interface IAllSourcesList {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
}

export interface IAllSourcesResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllSourcesList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

//get lead attachment
export interface IAllLeadAttachmentList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  file_path: string;
  file_type: string;
  file_name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lead: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploaded_by: any | null;
}

export interface IAllLeadAttachmentResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadAttachmentList[];
}

export interface IVerifyEmailPayload {
  email: string;
}

export interface IVerifyEmailResponse {
  email: string;
}

export interface ISentOtpPayload {
  email: string;
}

export interface ISentOtpResponse {
  email: string;
}

export interface ICreateLeadPayload {
  first_name: string;
  last_name?: string;
  company?: string;
  phone: string;
  other_contact?: string;
  escalate_to: boolean;
  email?: string;
  location?: string;
  budget?: number | null;
  possibility_of_conversion?: number | null;
  requirement?: string;
  source_id?: string;
  status_id?: string;
  type_id?: string;
  assigned_to?: string;
}

export interface ICreateRolePayload {
  role: string;
  permissions: string[];
}

interface IBaseDetails {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

interface ILeadDetails extends ICreateLeadPayload, IBaseDetails {}

export interface ICreateLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ILeadDetails[];
}

export interface ICreateRoleResponse {
  status: "success" | "error";
  message: string;
  data: IRoleData;
}

export interface IRoleData {
  id: string;
  role: string;
  permissions: string[];
  deleted: boolean;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface IUploadAttachmentResponse {
  status: string;
  message: string;
  data: {
    docUrl: string;
    fileType: string;
    fileName: string;
  };
}

export interface IUploadMultipleAttachmentResponse {
  status: string;
  message: string;
  data: string[];
}
export interface IUploadLeadFromExcelResponse {
  status: string;
  message: string;
  data: ILeadDetails;
}

// create lead attachment
export interface ICreateLeadAttachmentPayload {
  lead_id: string;
  uploaded_by: string;
  file_path: string;
  file_type: string;
  file_name: string;
}
export interface ICreateLeadAttachmentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadAttachmentPayload[];
}

// all status
export interface ICreateStatusesPayload {
  name: string;
  color?: string;
}
export interface ICreateStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateStatusesPayload[];
}

export interface IUpdateLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ILeadDetails;
}

export interface IUpdateRoleResponse {
  status: boolean;
  message: string;
  success: true;
  data: IRoleData;
}

export interface IUpdateStatusesPayload {
  id: string;
  payload: ICreateStatusesPayload;
}

export interface IUpdateStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateStatusesPayload;
}

//update sources

export interface IUpdateSourcesPayload {
  id: string;
  payload: ICreateSourcesPayload;
}

export interface IUpdateSourcesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateSourcesPayload;
}

export interface IUpdateLeadFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadFollowUpPayload;
}

export interface IUpdateLeadPayload {
  id: string;
  payload: ICreateLeadPayload;
}

export interface IUpdateRolePayload {
  id: string;
  payload: ICreateRolePayload;
}

export interface IDeleteLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ILeadDetails;
}

export interface IDeleteRoleResponse {
  status: boolean;
  message: string;
  success: true;
}

// all delete statuses

export interface IDeleteStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateStatusesPayload;
}

// delete sources
export interface IDeleteSourcesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateSourcesPayload;
}

//delete lead follow up
export interface IDeleteLeadFollowUpPayload {
  status: "success" | "error";
  message: string;
}
export interface IDeleteLeadFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: IDeleteLeadFollowUpPayload[];
}

export interface ILeadDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadsList;
}

export interface ILeadFollowUpDetailList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  status:
    | "PENDING"
    | "RESCHEDULE"
    | "AWAITING RESPONSE"
    | "NO RESPONSE"
    | "FAILED"
    | "COMPLETED";
  due_date: string;
  completed_date: string;
  remarks: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  lead: any | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any | null;
}

export interface ILeadFollowUpDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ILeadFollowUpDetailList;
}

export interface ILeadDownloadExcelResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadsList[];
}

export interface IRegisterPayload {
  email: string;
  password: string;
}

export interface IRegisterResponse {
  email: string;
  password: string;
}

// Client Credential types
export interface ICreateClientCredentialPayload {
  email: string;
  password: string;
  clientId: string;
}

export interface ICreateClientCredentialResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    email: string;
    message: string;
  };
}

// reset password
export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
}

export interface IResetPasswordResponse {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

// change password
export interface IChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

// change client password
export interface IChangeClientPasswordPayload {
  userId: string;
  password: string;
}

export interface IChangeClientPasswordResponse {
  status: boolean;
  message: string;
  success: true;
}

export interface IChangePasswordResponse {
  message: string;
  status: string;
  data: ILoginUserResponseData;
}
export interface ILoginUserResponse {
  message?: string;
  status: string;
  data: ILoginUserResponseData;
}

export interface ILoginUserResponseData {
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface ISignupResponse {
  status: string;
  message: string;
  data: ISentOtpPayload;
}

export interface IAllRoleResponse {
  status: boolean;
  message: string;
  data: {
    list: IAllRoleList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface IAllRoleList {
  id: string;
  role: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  permissions: string[];
}
export interface Permission {
  module: string;
  read: boolean;
  edit: boolean;
  add: boolean;
  delete: boolean;
}

export interface ICreateAddRoleResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateAddRolePayload[];
}
export interface ICreateAddRolePayload {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  // permissions: Permission[];
}

//get
export interface IUsersDetails {
  id: string;
  created_at: string;
  updated_at: string;
  role: IRoleData;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role_id: string;
  dob: string;
}
export interface IUserViewDetails {
  id: string;
  created_at: string;
  updated_at: string;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  role_id: string;
  password?: string;
  dob: string;
}

export interface IAllUsersListResponse {
  id: string;
  created_at: string;
  updated_at: string;
  role: string;
  email: string;
  first_name: string;
  last_name: string;
  number: string;
  dob: string;
  role_id: string;
}

export interface IAllUsersResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IUsersDetails[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

// export interface INotification {
//   id: string;
//   created_at: string;
//   updated_at: string;
//   deleted: boolean;
//   deleted_at: string | null;
//   type: 'LEAD_ASSIGNED' | 'PASSWORD_CHANGE' | 'FOLLOW_UP' | string; // Add more types as needed
//   message: string;
//   isRead: boolean;
//   metadata: {
//     leadId?: string;
//     leadName?: string;
//     assignedBy?: string;
//     leadContact?: string;
//     dueDate?: string;
//     remarks?: string;
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     [key: string]: any; // Allow extra keys
//   };
//   userId: string;
// }

// export interface IGetNotificationsResponse {
//   status: boolean;
//   message: string;
//   success: true;
//   data: INotification[];
// }

//post  ...
export interface ICreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone_number: string;
  password: string;
  role_id: string;
}
export interface IUserUpdatePayload {
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  phone_number: string;
  password?: string;
  role_id: string;
}

export interface ICreateUserResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateUserPayload;
}

export interface IUserDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUsersDetails;
}
//update
export interface IUpdateUserPayload {
  id: string;
  payload: IUserUpdatePayload;
}

export interface IUpdateUserResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUser;
}
//delete
export interface IDeleteUserResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateUserPayload;
}

//  Lead Status History APIs Types
// -----------------------------------------------------

// Lead Status History List
export interface IAllLeadStatusHistoryList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  status_remarks: string;
  lead: IAllLeadsList;
  changed_by: IUsersDetails;
  status: IStatus;
}

// Create Lead Status History Payload
export interface ICreateLeadStatusHistoryPayload {
  lead_id: string;
  status_id: string;
  status_remarks: string;
  changed_by: string;
}

// All Lead Status History Response
export interface IAllLeadStatusHistoryResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadStatusHistoryList[];
}

// Create Lead Status History Response
export interface ICreateLeadStatusHistoryResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadStatusHistoryList;
}

/// Lead Followups APIs Types
//------------------------------------------------------

export interface LeadFollowupsList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  status: LeadFollowupStatus;
  due_date: string;
  completed_date: string | null;
  remarks: string;
  lead: ILeadDetails;
  user: IUsersDetails;
}
export enum LeadFollowupStatus {
  PENDING = "PENDING",
  RESCHEDULE = "RESCHEDULE",
  AWAITING_RESPONSE = "AWAITING RESPONSE",
  NO_RESPONSE = "NO RESPONSE",
  FAILED = "FAILED",
  COMPLETED = "COMPLETED",
}

export interface IUpdateLeadFollowUpPayload {
  id: string;
  payload: ICreateLeadFollowUpPayload;
}

export interface ICreateLeadFollowUpPayload {
  lead_id: string;
  user_id?: string;
  status: string;
  due_date?: string;
  remarks?: string;
}
export interface ICreateLeadFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: LeadFollowupsList;
}

export interface IAllLeadFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: LeadFollowupsList[];
}

// Client Followups APIs Types
//------------------------------------------------------

export interface IProjectFollowupsList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  status: ProjectFollowupStatus;
  due_date: string;
  completed_date: string | null;
  remarks: string;
  user: IUsersDetails;
}

export enum ProjectFollowupStatus {
  PENDING = "PENDING",
  RESCHEDULE = "RESCHEDULE",
  AWAITING_RESPONSE = "AWAITING RESPONSE",
  NO_RESPONSE = "NO RESPONSE",
  FAILED = "FAILED",
  COMPLETED = "COMPLETED",
}

export interface ICreateProjectFollowUpPayload {
  client_id: string; // Added for client followup
  user_id?: string;
  status: string;
  due_date?: string;
  remarks?: string;
  project_task_id?: string;
}

export interface ICreateProjectFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectFollowupsList;
}

export interface IAllProjectFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectFollowupsList[];
}

//interface for mark as read notification api response
export interface IMarkAsReadNotificationResponse {
  status: string;
  message: string;
}

export interface IDeleteNotification {
  status: string;
  message: string;
}

interface INotificationMetadata {
  leadId: string;
  leadName: string;
  assignedBy?: string;
  dueDate?: string;
  remarks?: string;
  followupId?: string;
  leadContact?: string;
  reminderDate?: string;
}

export interface INotification {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  type:
    | "LEAD_ASSIGNED"
    | "FOLLOWUP_REMINDER"
    | "FOLLOWUP_CREATED"
    | "QUOTATION_SENT"
    | "BUSINESS_DONE"
    | "LEAD_ESCALATED";
  message: string;
  isRead: boolean;
  metadata: INotificationMetadata;
  userId: string;
  user: IUser;
}

export interface INotificationsResponse {
  data: INotification[];
}

// Project APIs Types
// -----------------------------------------------------

// --- Project Schema Additions (matches backend Zod schema) ---

export interface ICreateProjectTask {
  title: string;
  description?: string;
  due_date?: string;
  status?: string;
  assigned_to?: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  milestone_id: string;
}

export interface IProjectTaskResponse {
  id: string;
  title: string;
  description?: string;
  due_date?: string;
  status?: string;
  assigned_to?: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  delay_days?: number | null;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  milestone: IProjectMilestoneResponse;
  deleted_at: string | null;
}

export interface IProjectTaskDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectTaskResponse;
}

export interface IAllTasksResponse {
  status: boolean;
  data: IProjectTaskResponse[];
  total?: number;
}

export interface ICreateProjectMilestone {
  name: string;
  description: string;
  start_date?: string;
  end_date?: string;
  actual_date?: string;
  estimated_date?: string;
  assigned_to?: string;
  status: string;
  remark?: string;
  project_id: string;
}

export interface IProjectMilestoneResponse {
  id?: string;
  project: IProjectResponse;
  name: string;
  description: string;
  start_date?: string;
  end_date?: string;
  actual_date?: string;
  estimated_date?: string;
  assigned_to?: string;
  status: string;
  remark?: string;
  tasks?: IProjectTaskResponse[];
  tickets?: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: string | null;
    image_url?: string;
    remark: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string | null;
  }[];
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
}

export interface IProjectMilestoneDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectMilestoneResponse;
}

export interface ICreateProjectAttachment {
  file_path: string;
  file_type: string;
  file_name: string;
  uploaded_by?: string;
}

export interface IProjectAttachmentResponse {
  id?: string;
  file_path: string;
  file_type: string;
  file_name: string;
  uploaded_by?: IUser;
  created_at?: string;
  project: IProjectAttachmentResponse;
}

export enum ProjectRenewalType {
  NONE = "NONE",
  MONTHLY = "MONTHLY",
  QUARTERLY = "QUARTERLY",
  YEARLY = "YEARLY",
  CUSTOM = "CUSTOM",
}

export interface ICreateProjectPayload {
  client_id?: string;
  name: string;
  description?: string;
  project_type?: string;
  budget?: number;
  estimated_cost?: number;
  cost_of_labour?: number;
  extra_cost?: number;
  overhead_cost?: number;
  start_date?: string;
  end_date?: string;
  template_id?: string | null;
  renewal_type?: ProjectRenewalType | null;
  renewal_date?: string;
  is_renewal?: boolean;
  milestones?: Array<{
    name: string;
    description?: string;
    assigned_to?: string;
    status?: string;
    start_date?: string;
    end_date?: string;
    tasks?: Array<{
      title: string;
      description?: string;
      assigned_to?: string;
      status?: string;
      priority?: "Critical" | "High" | "Medium" | "Low";
      due_date?: string;
    }>;
  }>;
  attachments?: Array<{
    file_path: string;
    file_type: string;
    file_name: string;
  }>;
}

export interface IProjectResponse extends ICreateProjectPayload {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  status: string;
  client: IClientList;
  milestones: IProjectMilestoneResponse[];
  attachments: IProjectAttachmentResponse[];
  actual_cost?: number;
  actual_start_date?: string;
  actual_end_date?: string;
}

export interface ICreateProjectResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectResponse;
}

export interface IAllProjectsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectResponse[];
}

export interface IProjectDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectResponse;
}

export interface IUpdateProjectPayload {
  id: string;
  payload: Partial<ICreateProjectPayload>;
}

export interface IUpdateProjectResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectResponse;
}

export interface IDeleteProjectResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectResponse;
}

// Client APIs Types
// -----------------------------------------------------

export interface ICreateClientPayload {
  name: string;
  contact_number: string;
  email: string;
  address: string;
  website: string;
  company_name: string;
  contact_person: string;
  lead_id?: string;
}

export interface ICreateClientResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientPayload;
}

export interface IClientUser {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  password: string;
}

export interface IClientList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
  email: string;
  contact_number: string;
  address: string;
  website: string;
  company_name: string;
  contact_person: string;
  lead_id: null;
  client_details?: IClientDetails[];
  gst_number?: string;
  isCredential?: boolean;
  user?: IClientUser;
}

export interface IAllClientResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IClientList[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface IClientDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IClientList;
}

export interface IUpdateClientPayload {
  id: string;
  payload: ICreateClientPayload;
}

export interface IUpdateClientResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateClientPayload;
}

export interface IDeleteClientResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientPayload;
}

// Project Templates APIs Types
// -----------------------------------------------------

export interface ICreateProjectTemplatePayload {
  name: string;
  description?: string;
  project_type?: string;
  estimated_days?: number;
}

export interface ICreateProjectTemplateResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplatePayload;
}

export interface IUpdateProjectTemplatePayload {
  id: string;
  payload: Partial<ICreateProjectTemplatePayload>;
}

export interface IUpdateProjectTemplateResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplatePayload;
}

export interface IDeleteProjectTemplateResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplatePayload;
}

export interface IProjectTemplateTask {
  id: string;
  title: string;
  description: string;
  estimated_days: number;
  created_at: string;
  updated_at: string;
}

export interface IProjectTemplateMilestone {
  id: string;
  name: string;
  description: string;
  estimated_days: number;
  project_task_master: IProjectTemplateTask[];
  created_at: string;
  updated_at: string;
}

export interface IProjectTemplate extends ICreateProjectTemplatePayload {
  id: string;
  project_milestone_master: IProjectTemplateMilestone[];
  created_at: string;
  updated_at: string;
}

export interface IAllProjectTemplatesResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    templates: IProjectTemplate[];
    total: number;
  };
}

export interface IProjectTemplateDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IProjectTemplate;
}

// Project Template Milestones APIs Types
// -----------------------------------------------------
export interface ICreateProjectTemplateMilestonePayload {
  template_id: string;
  name: string;
  description?: string;
  estimated_days?: number;
}

export interface ICreateProjectTemplateMilestoneResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestonePayload;
}

export interface IUpdateProjectTemplateMilestonePayload {
  id: string;
  payload: Partial<ICreateProjectTemplateMilestonePayload>;
}

export interface IUpdateProjectTemplateMilestoneResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestonePayload;
}

export interface IDeleteProjectTemplateMilestoneResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestonePayload;
}

export interface IAllProjectTemplateMilestonesResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestonePayload[];
}

export interface IProjectTemplateMilestoneDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestonePayload;
}

// Project Template Milestone Tasks APIs Types
// -----------------------------------------------------
export interface ICreateProjectTemplateMilestoneTaskPayload {
  milestone_master_id: string;
  title: string;
  description?: string;
  estimated_days?: number;
}

export interface ICreateProjectTemplateMilestoneTaskResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestoneTaskPayload;
}

export interface IUpdateProjectTemplateMilestoneTaskPayload {
  id: string;
  payload: Partial<ICreateProjectTemplateMilestoneTaskPayload>;
}

export interface IUpdateProjectTemplateMilestoneTaskResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestoneTaskPayload;
}

export interface IDeleteProjectTemplateMilestoneTaskResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestoneTaskPayload;
}

export interface IAllProjectTemplateMilestoneTasksResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestoneTaskPayload[];
}

export interface IProjectTemplateMilestoneTaskDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateProjectTemplateMilestoneTaskPayload;
}

// Client Details APIs Types
// -----------------------------------------------------
export interface ICreateClientDetailPayload {
  client_id: string;
  client_contact: string;
  contact_person: string;
  email: string;
  other_contact: string;
  designation: string;
}

export interface ICreateClientDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientDetailPayload;
}

export interface IUpdateClientDetailPayload {
  id: string;
  payload: Partial<ICreateClientDetailPayload>;
}

export interface IUpdateClientDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientDetailPayload;
}

export interface IDeleteClientDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientDetailPayload;
}

export interface IAllClientDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientDetailPayload[];
}

export interface IClientDetailByIdResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateClientDetailPayload;
}

export interface IClientDetails {
  id: string;
  client_id: string;
  client_contact: string;
  contact_person: string;
  email: string;
  other_contact: string;
  designation: string;
}

export interface IClientDetailsResponse {
  status: boolean;
  message: string;
  success: true;
  data: IClientDetails;
}

export interface IUploadClientFromExcelResponse {
  status: string;
  message: string;
  data: IClientList[];
}

// Task Comment APIs Types
// -----------------------------------------------------

export interface ICreateTaskCommentPayload {
  task_id: string;
  assigned_to: string;
  remarks: string;
}

export interface ITaskCommentResponse {
  id: string;
  remarks: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  task: IProjectTaskResponse;
  assignedTo: IUsersDetails;
}

export interface ICreateTaskCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITaskCommentResponse;
}

export interface IAllTaskCommentsResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITaskCommentResponse[];
}

export interface IUpdateTaskCommentPayload {
  id: string;
  payload: Partial<ICreateTaskCommentPayload>;
}

export interface IUpdateTaskCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITaskCommentResponse;
}

export interface IDeleteTaskCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITaskCommentResponse;
}

// Daily Task Entries APIs Types
// -----------------------------------------------------
export interface ICreateDailyTaskEntryPayload {
  project_id: string;
  assigned_to: string;
  task_title: string;
  task_id: string;
  entry_date: string;
  description?: string;
  status?: string;
  remarks?: string;
  priority?: string;
}

export interface IUpdateDailyTaskEntryPayload {
  id: string;
  payload: Partial<ICreateDailyTaskEntryPayload>;
}

export interface IDailyTaskEntryResponse {
  id: string;
  project: IProjectResponse;
  user?: IUsersDetails;
  assigned_to?: string;
  task_title: string;
  entry_date: string;
  description?: string;
  remarks?: string;
  hours_spent?: number;
  status: string;
  priority?: "High" | "Medium" | "Low";
  task_id?: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
}

export interface ICreateDailyTaskEntryResponse {
  status: boolean;
  message: string;
  success: true;
  data: IDailyTaskEntryResponse;
}

export interface IAllDailyTaskEntriesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IDailyTaskEntryResponse[];
}

export interface IDeleteDailyTaskEntryResponse {
  status: boolean;
  message: string;
  success: true;
}

export interface IUpdateDailyTaskStatusPayload {
  status: string;
}

export interface IUpdateDailyTaskStatusResponse {
  status: string;
  message: string;
  data: {
    id: string;
    status: string;
  };
}

export interface IUploadMultipleAttachmentsOptions {
  onSuccessCallback: (data: IUploadMultipleAttachmentResponse) => void;
  onErrorCallback?: (err: IApiError) => void;
}

export interface ProjectSnapshot {
  data: {
    inProgress: number;
    completed: number;
    percentCompleted: number;
    percentInProgress: number;
    total: number;
  };
  colors: Record<string, string>;
}

export interface ChartData {
  labels: string[];
  income: number[];
  expense: number[];
}

export interface LeadAnalyticsChartDataMap {
  [key: string]: ChartData;
}

export interface LeadTypeChartDataMap {
  [key: string]: ChartData;
}

export interface LeadTypeColors {
  [key: string]: string;
}

export interface ProjectRenewalItem {
  name: string;
  renewal_date: string;
  completion: number;
}

export interface ProjectRenewalData {
  [category: string]: ProjectRenewalItem[];
}

export interface ExpensesDataMap {
  yearly: ChartData;
  monthly: ChartData;
  weekly: ChartData;
}

export interface LeadTypeChartItem {
  type: string;
  count: number;
  percent: number;
  color: string;
}

export interface DashboardStatCard {
  count: string;
  title: string;
  subtitle: string;
}

export interface ProjectSnapshotData {
  name: string;
  value: number;
}

export interface ExpensesData {
  labels: string[];
  income: number[];
  expense: number[];
}

// Add Category and Project interfaces for projectRenewalData
export interface Project {
  name: string;
  company_name: string;
  date: string;
  status: number;
}

// Updated Category to match new API response
export interface Category {
  category: string;
  projects: Project[];
}

// Updated DashboardSummary to match new API response
export interface DashboardSummary {
  stats: DashboardStatCard[];
  projectSnapshot: {
    inProgress: number;
    completed: number;
    open: number;
  };
  leadAnalytics: {
    weekly: { status: string; count: number }[];
    monthly: { status: string; count: number }[];
    yearly: { status: string; count: number }[];
  };
  leadType: {
    weekly: { type: string | null; count: number }[];
    monthly: { type: string | null; count: number }[];
    yearly: { type: string | null; count: number }[];
  };
  // projectRenewalData is now an object with month keys and array of categories as values
  projectRenewalData: {
    [month: string]: Category[];
  };
  expenses: {
    weekly: {
      labels: string[];
      income: number[];
      expense: number[];
    };
    monthly: {
      labels: string[];
      income: number[];
      expense: number[];
    };
    yearly: {
      labels: string[];
      income: number[];
      expense: number[];
    };
  };
}

export interface DashboardSummaryApiResponse {
  status: string;
  data: DashboardSummary;
}

export interface DailyTask {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  task_title: string;
  assigned_to: string;
  description: string;
  entry_date: string;
  hours_spent: string;
  status: string;
  remarks: string;
  priority?: "High" | "Medium" | "Low";
  project: {
    id: string;
    name: string;
  };
}

// START EI LOG MANAGEMENT
export interface ICreateEILogPayload {
  eilogType: string;
  eilogHead: string;
  description: string;
  income?: number;
  expense?: number;
  paymentMode?: string;
  attachment?: string;
}

export interface ICreateEILogResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILog;
}

export interface IUpdateEILogPayload {
  id: string;
  payload: Partial<ICreateEILogPayload>;
}

export interface IUpdateEILogResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILog;
}

export interface IEILog {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  description: string;
  income?: number;
  expense?: number;
  payment_mode?: string;
  attachment?: string;
  ei_log_type: IEILogType;
  ei_log_head: IEILogHead;
}

export interface IAllEILogList {
  id: string;
  created_at: string;
  updated_at: string;
  description: string;
  income?: string;
  expense?: number | null;
  paymentMode?: string;
  attachment?: string | null;
  eilogType: {
    id: string;
    name: string;
  };
  eilogHead: {
    id: string;
    name: string;
  };
  createdBy?: {
    id: string;
    firstName: string;
    lastName: string;
  };
}

export interface IAllEILogResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: {
      data: IAllEILogList[];
      pagination?: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
      };
    };
    stats: {
      totalCount: number;
      totalIncome: number;
      totalExpense: number;
      netAmount: number;
      todayIncome: number;
      todayExpense: number;
      todayNet: number;
      monthIncome: number;
      monthExpense: number;
      monthNet: number;
    };
  };
}

export interface IEILogDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILog;
}

export interface IDeleteEILogResponse {
  status: boolean;
  message: string;
  success: true;
  data: IEILog;
}

export interface IUploadEILogFromExcelResponse {
  status: string;
  message: string;
  data: IEILog;
}

export interface IEILogFilters {
  searchText?: string;
  eilogTypeId?: string;
  eilogHeadId?: string;
  paymentMode?: string;
  dateRange?: "All" | "Daily" | "Weekly" | "Monthly";
  referenceDate?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
}
// END EI LOG MANAGEMENT

export interface StaffPerformanceReportResponse {
  status: string;
  message: string;
  data: {
    staffInfo: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };
    taskSummary: {
      totalTasksAssigned: number;
      completedTasks: number;
      completionRate: string;
      avgDaysToComplete: string;
      delayedTasks: number;
    };
    milestoneFileActivity: {
      milestonesManaged: number;
      filesUploaded: number;
    };
    followUpPerformance: {
      totalFollowUps: number;
      completedFollowUps: number;
      pendingFollowUps: number;
      missedFollowUps: number;
      avgResponseTime: string;
    };
  };
}

export interface ProjectPerformanceReportResponse {
  status: string;
  message: string;
  data: {
    basicProjectInfo: {
      projectType: string;
      projectManager: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      } | null;
      estimatedStartDate: string | null;
      estimatedEndDate: string | null;
      actualStartDate: string | null;
      actualEndDate: string | null;
      assignedTeam: Array<{
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      }>;
      projectPhase: string;
      currentStatus: string;
    };
    costBudgetAnalysis: {
      budget: string;
      estimatedCost: string;
      actualCost: string;
      budgetUtilization: string;
      overrun: string;
    };
    taskMetrics: {
      totalTasks: number;
      completedTasks: number;
      inProgressTasks: number;
      overdueTasks: number;
      avgTaskCompletionTime: string;
      taskReassignmentCount: number;
      topPerformer: string;
      chart: Array<{ label: string; value: number }>;
    };
    documentSummary: {
      totalFiles: number;
      files: Array<{
        file_type?: string;
        count?: number;
        last_updated?: string | null;
        file_name?: string;
        file_url?: string;
      }>;
    };
    followUpMatrix: {
      totalFollowUpsLogged: number;
      followUpsCompleted: number;
      pendingFollowUps: number;
      missedOrDelayedFollowUps: number;
      avgResponseTimeHours: string;
      escalatedItems: number;
    };
    timelineAnalysis: {
      daysSinceStart: number;
      plannedDurationDays: number;
      progressPercent: number;
      delayRisk: string;
    };
    milestoneSummary: Array<{
      milestoneId: string;
      name: string;
      status: string;
      start_date: string | null;
      end_date: string | null;
      actual_date: string | null;
      assigned_to: {
        id: string;
        name: string;
        email: string;
        phone: string;
        role: string;
      } | null;
      delayDays: number | null;
    }>;
    resourceUtilization: Array<{
      id: string;
      name: string;
      email: string;
      phone: string;
      role: string;
      assignedTasks: number;
      completedTasks: number;
      loadPercent: string;
      followUpsHandled: number;
      activeIssues: number;
    }>;
  };
}

export interface LeadReportResponse {
  status: string;
  message: string;
  data: {
    leadFunnelChart: {
      totalLeads: number;
      lostLeads: number;
      convertedLeads: number;
      dropOfStage: {
        stage: string;
        count: number;
      };
    };
    kpiMetrics: {
      conversionRate: number;
      avgLeadAge: number;
      avgFollowupsLead: number;
      topPerformingSource: string;
      avgTimeToConvert: number;
      pendingFollowups: number;
      hotLeadsCount: number;
      averageResponseTime: number;
    };
    sourceWiseConversionRates: Array<{
      source: string;
      conversionRate: number;
    }>;
    leadFunnelStages: Array<{
      stage: string;
      count: number;
      isHighlighted: boolean;
    }>;
    monthlyLeadsChart: {
      labels: string[];
      leads: number[];
    };
    staffConversionPerformance: Array<{
      staffName: string;
      conversionRate: number;
    }>;
    summary: {
      totalLeads: number;
      convertedLeads: number;
      lostLeads: number;
      activeLeads: number;
      conversionRate: number;
    };
  };
}

// Business Analysis Report Types
export interface BusinessAnalysisParams {
  fromDate?: string;
  toDate?: string;
}

export interface BusinessAnalysisReport {
  leadFunnelMetrics: {
    totalLeads: number;
    qualifiedLeads: number;
    convertedLeads: number;
    dropOfStage: string;
    conversionRate: number;
    avgTimeToConvert: number;
    avgFollowups: number;
    bestLeadSource: string;
  };
  projectDeliveryMetrics: {
    totalProjects: number;
    completedProjects: number;
    onTimeDeliveryRate: number;
    budgetOverrunProjects: number;
    avgProjectProfitability: number;
    avgProjectDuration: number;
    resourceUtilization: number;
    clientSatisfactionIndex: number;
  };
  financialSummary: {
    totalIncome: number;
    amountReceivedInBank: number;
    amountReceivedInUPI: number;
    amountReceivedInCash: number;
    amountReceivedInOnline: number;
    amountSpentInBank: number;
    amountSpentInUPI: number;
    amountSpentInCash: number;
    amountSpentInOnline: number;
  };
  teamStaffPerformance: {
    activeStaffMembers: number;
    topPerformer: string;
    taskCompletionRate: number;
    delayedTasks: number;
    avgFollowupsPerStaff: number;
    documentContributions: number;
  };
  monthlyTrends: {
    labels: string[];
    started: (number | null)[];
    completed: (number | null)[];
    newLeads: (number | null)[];
    revenue: (number | null)[];
  };
  summary: {
    totalRevenue: number;
    totalProjects: number;
    totalLeads: number;
    totalStaff: number;
    overallPerformance: number;
  };
}

export interface BusinessAnalysisReportResponse {
  status: string;
  message: string;
  data: BusinessAnalysisReport;
}

// Public Dashboard Report Types
export interface PublicDashboardParams {
  fromDate?: string;
  toDate?: string;
}

export interface PublicDashboardReport {
  businessOverview: {
    totalProjectsDelivered: number;
    ongoingProjects: number;
    clientsServed: number;
  };
  leadClientInterest: {
    leadsThisMonth: number;
    conversionsThisMonth: number;
    avgConversionTime: number;
    topSourceOfLeads: string;
  };
  trendChart: {
    labels: string[];
    newProject: number[];
    completedProject: number[];
  };
  monthlyLeadsChart: {
    labels: string[];
    leads: number[];
  };
  teamPerformance: {
    topPerformer: string;
    onTimeDeliveryRate: number;
    avgTaskCompletionRate: number;
  };
}

export interface PublicDashboardReportResponse {
  status: string;
  message: string;
  data: PublicDashboardReport;
}

export interface IForgotPasswordPayload {
  email: string;
}

export interface IForgotPasswordResponse {
  message: string;
}

export interface IVerifyOtpPayload {
  email: string;
  otp: string;
}

export interface IVerifyOtpResponse {
  message: string;
}

// Ticket Management Types
export interface ITicketData {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  image_url?: string | null;
  // remark: string;
  assigned_to?: string | null;
  milestone?: {
    id: string;
    name: string;
    description: string;
    start_date: string;
    end_date: string;
    actual_date?: string | null;
    estimated_date?: string | null;
    assigned_to?: string | null;
    status: string;
    remark?: string | null;
  };
  project?: {
    id: string;
    name: string;
    description: string;
    status: string;
    budget: string;
    estimated_cost: string;
    actual_cost?: string | null;
    cost_of_labour: string;
    overhead_cost: string;
    extra_cost: string;
    start_date: string;
    end_date: string;
    actual_start_date: string;
    actual_end_date?: string | null;
    renewal_type?: string | null;
    renewal_date?: string | null;
    is_renewal: boolean;
  };
  task?: {
    id: string;
    title: string;
    description: string;
    due_date?: string | null;
    status: string;
    assigned_to: string;
    milestone?: {
      id: string;
      name: string;
      description: string;
      start_date: string;
      end_date: string;
      actual_date?: string | null;
      estimated_date?: string | null;
      assigned_to?: string | null;
      status: string;
      remark?: string | null;
    };
  } | null;
}

export interface ITicketDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketData;
}

export interface IAllTicketsResponse {
  status: string;
  message: string;
  data: {
    list: ITicketData[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export interface ICreateTicketPayload {
  title: string;
  description: string;
  status: string;
  priority: string;
  project_id: string;
  task_id?: string;
  image_url?: string;
  image_file?: File;
  // remark: string;
  assigned_to?: string | null;
}

export interface ICreateTicketResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketData;
}

export interface IUpdateTicketPayload {
  id: string;
  payload: Partial<ICreateTicketPayload>;
}

export interface IUpdateTicketRequestPayload {
  id: string;
  payload: Partial<ICreateTicketPayload>;
}

export interface IUpdateTicketResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketData;
}

export interface IDeleteTicketResponse {
  status: boolean;
  message: string;
  success: true;
}

export interface ITicketFilters {
  searchText?: string;
  status?: string;
  priority?: string;
  createdBy?: string;
  dateRange?: string;
  fromDate?: string;
  toDate?: string;
  page?: number;
}

// Ticket Comments APIs Types
// -----------------------------------------------------

export interface ICreateTicketCommentPayload {
  ticket_id: string;
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  remark?: string;
}

export interface ITicketCommentResponse {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  remark: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  ticket: {
    id: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    assigned_to: string | null;
    image_url?: string;
    remark?: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string | null;
    project: {
      id: string;
      name: string;
      description?: string;
      status?: string;
      budget?: string;
      estimated_cost?: string;
      actual_cost?: string | null;
      cost_of_labour?: string;
      overhead_cost?: string;
      extra_cost?: string;
      start_date?: string;
      end_date?: string;
      actual_start_date?: string | null;
      actual_end_date?: string | null;
      renewal_type?: string | null;
      renewal_date?: string | null;
      is_renewal?: boolean;
    };
    milestone: {
      id: string;
      name: string;
      description?: string;
      start_date?: string;
      end_date?: string;
      actual_date?: string | null;
      estimated_date?: string | null;
      assigned_to?: string;
      status?: string;
      remark?: string | null;
    };
  };
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone_number?: string | null;
    dob?: string | null;
    otp?: string | null;
    otpExpiresAt?: string | null;
    isOtpVerified?: boolean;
    password?: string;
  };
}

export interface ICreateTicketCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketCommentResponse;
}

export interface IAllTicketCommentsResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: ITicketCommentResponse[];
    total: number;
  };
}

export interface IUpdateTicketCommentPayload {
  id: string;
  payload: Partial<ICreateTicketCommentPayload>;
}

export interface IUpdateTicketCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketCommentResponse;
}

export interface IDeleteTicketCommentResponse {
  status: boolean;
  message: string;
  success: true;
  data: ITicketCommentResponse;
}

// Create Holiday

export interface ICreateHolidayPayload {
  holidayName: string;
  date: string;
}

export interface ICreateHolidayResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateHolidayPayload;
}

// get all holiday
export interface IHoliday {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  holidayName: string;
  date: string;
}

export interface IHolidaysResponse {
  status: boolean;
  message: string;
  data: IHoliday[];
}

export interface IDeleteHolidayResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateHolidayPayload;
}

// update holiday
export interface IUpdateHolidayPayload {
  id: string;
  payload: ICreateHolidayPayload;
}
export interface IUpdateHolidayResponse {
  status: boolean;
  message: string;
  success: true;
  data: IUpdateHolidayPayload;
}

// create leave

export interface ICreateLeavePayload {
  staffId: string;
  appliedDate: string;
  fromDate: string;
  toDate: string;
  leaveType: string;
  description: string;
}

export interface ICreateLeaveResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeavePayload;
}

export interface ICheckInPayload {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  staffId: string;
  inTime: string;
  outTime: string;
  date: string;
  totalHours: string;
}

export interface ICheckInResponse {
  status: boolean;
  message: string;
  data: ICheckInPayload;
}

export interface ICheckOutPayload {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  staffId: string;
  inTime: string;
  outTime: string;
  date: string;
  totalHours: string;
}

export interface ICheckOutResponse {
  status: boolean;
  message: string;
  data: ICheckOutPayload;
}

// all attendance
export interface IAttendance {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  staffId: string;
  inTime: string;
  outTime: string;
  date: string;
  totalHours: string;
  staff: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string | null;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    dob: string | null;
    otp: string | null;
    otpExpiresAt: string | null;
    isOtpVerified: boolean;
    password: string;
  };
}

export interface IAttendancesResponse {
  status: boolean;
  message: string;
  data: IAttendance[];
}

// get all leaves
export interface IStaff {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  email: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  dob: string | null;
  otp: string | null;
  otpExpiresAt: string | null;
  isOtpVerified: boolean;
  password: string;
}
export interface ILeaves {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  staffId: string;
  appliedDate: string;
  fromDate: string;
  toDate: string;
  leaveType: string;
  description: string;
  status: string;
  adminRemark: string | null;
  staff: IStaff;
}
export interface ILeavesResponse {
  status: boolean;
  message: string;
  data: ILeaves[];
}

// update leave status
export interface IUpdateLeaveStatusPayload {
  id: string;
  payload: {
    status: "Approved" | "Pending" | "Not Approved";
    adminRemark: string | null;
  };
}

// Response from API
export interface IUpdateLeaveStatusResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    deleted: boolean;
    deleted_at: string | null;
    staffId: string;
    appliedDate: string;
    fromDate: string;
    toDate: string;
    leaveType: string;
    description: string;
    status: string;
    adminRemark: string | null;
  };
}
