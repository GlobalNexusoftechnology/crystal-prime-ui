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
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllStatusesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllStatusesList[];
}

export interface IAllLeadsList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  first_name: string;
  last_name: string;
  company: string;
  phone: string;
  email: string;
  location: string;
  budget: string;
  requirement: string;
  source: ISource;
  status: IStatus;
  assigned_to: IUser;
}

export interface IAllLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadsList[];
}

export interface IAllSourcesList {
  id: string;
  created_at: string;
  updated_at: string;
  deleted: boolean;
  deleted_at: string | null;
  name: string;
}

export interface IAllSourcesResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllSourcesList[];
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
  email: string;
  location: string;
  budget: number;
  requirement: string;
  source_id: string;
  status_id: string;
}
export interface ICreateLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadPayload[];
}

export interface IUpdateLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadPayload;
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

export interface IUpdateLeadFollowUpPayload {
  id: string;
  payload: ICreateLeadFollowUpPayload;
}

export interface ICreateLeadFollowUpPayload {
  lead_id: string;
  user_id?: string | null;
  status:
    | "PENDING"
    | "RESCHEDULE"
    | "AWAITING RESPONSE"
    | "NO RESPONSE"
    | "FAILED"
    | "COMPLETED";
  due_date?: string;
  completed_date?: string;
  remarks?: string;
}
export interface ICreateLeadFollowUpResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadFollowUpPayload[];
}

export interface IDeleteLeadResponse {
  status: boolean;
  message: string;
  success: true;
  data: ICreateLeadFollowUpPayload;
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

export interface IAllLeadDownloadExcelResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadsList[];
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
  email: string;
  oldPassword: string;
  newPassword: string;
}

export interface IChangePasswordResponse {
  email: string;
  oldPassword: string;
  newPassword: string;
}
export interface ILoginUserResponse {
  message?: string;
  status: string;
  access_token: string;
  refresh_token: string;
  user: IUser;
}

export interface ILoginUserResponseData {
  message?: string;
  data: ILoginUserResponse;
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
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  // permissions: Permission[];
}