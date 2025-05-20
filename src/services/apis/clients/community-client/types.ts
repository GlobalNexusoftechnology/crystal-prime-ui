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

export interface ILeadDetailResponse {
  status: boolean;
  message: string;
  success: true;
  data: IAllLeadsList;
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
