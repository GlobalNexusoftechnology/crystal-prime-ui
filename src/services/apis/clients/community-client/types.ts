import { IUser } from "@/services/stores";

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
}

export interface IAllStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllStatusesList[];
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
  data: IAllTypesList[];
}
// delete types
export interface IDeleteTypeResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateTypesPayload;
}
// END LEAD TYPES

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
  businessDone: number;
  notInterested: 0;
}

export interface IAllLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: {
    list: IAllLeadsList[];
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
  data: IAllSourcesList[];
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
  last_name: string;
  company: string;
  phone: string;
  other_contact: string;
  escalate_to: boolean;
  email: string;
  location: string;
  budget?: number | null;
  requirement: string;
  source_id: string;
  status_id: string;
  type_id: string;
  assigned_to: string;
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

// reset password
export interface IResetPasswordPayload {
  email: string;
  newPassword: string;
  confirmPassword: string;
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
  data: IAllRoleList[];
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
  password?:string;
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
  data: IUsersDetails[];
}

export interface INotification {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  type: 'LEAD_ASSIGNED' | 'PASSWORD_CHANGE' | 'FOLLOW_UP' | string; // Add more types as needed
  message: string;
  isRead: boolean;
  metadata: {
    leadId?: string;
    leadName?: string;
    assignedBy?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any; // Allow extra keys
  };
  userId: string;
}

export interface IGetNotificationsResponse {
  status: boolean;
  message: string;
  success: true;
  data: INotification[];
}

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
  data: IUpdateUserPayload;
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

//interface for mark as read notification api response
export interface IMarkAsReadNotificationResponse {
  status: string;
  message: string;
  
}


export interface IDeleteNotification {
  status: string;
  message: string;
 
}