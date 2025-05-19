import { IUser } from "@/services/stores";

/**
 * Sample format to be passed to the login form
 */
export interface ILoginPayload {
  email: string;
  password: string;
}

export interface IVerifyEmailPayload {
  email: string;
}

export type TProduct = {
  id: number;
  name: string;
  price: number;
  category: string;
  brand: string;
  color: string;
  quantity: number;
  sizes: string[];
  material: string;
  image: string;
  slug: string;
};

/**
 * This API response of all the products on the platform
 */
export interface IProductsResponse {
  status: boolean;
  message: string;
  success: true;
  data: TProduct[];
}

export interface IProductProps {
  productData: TProduct;
  relatedProducts?: TProduct[];
}

export interface IAllProductProps {
  allProductData: TProduct[];
}

export interface ICreateProductPayload {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  width: number;
  height: number;
  material: string;
  color: string;
  fabric: string;
  weight: number;
  shape: string;
  quantity: number;
  category: string;
  gallery: string[];
  isApproved: boolean;
  vendorId: string;
  subCategory: string;
}

//
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
  assigned_to: string | null;
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
  first_name : string;
  last_name : string;
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
  user :IUser

}

export interface ILoginUserResponseData {
  message?: string;
  data: ILoginUserResponse;
}


export interface ISignupPayload {
  name: string;
  email: string;
  password: string;
  role: string; // Add role as it's part of the response

}


export interface ISignupResponse {
  status: string;
  message: string;
  data: ISentOtpPayload
}