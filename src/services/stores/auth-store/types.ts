/**
 * TODO: Update the IUser based on the response we get from the API.
 * This represents the user information fetched from the backend.
 */
export interface IUser {
  id: string;
  businessName: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  userType: string;
  city: string;
  country: string;
  address: string;
  registrationId: string;
  businessLicense: string;
  username: string;
  role: string;
  photo: string;
  isVendorApproved: boolean;
  provider: string;
  providerId: string;
  authToken: string;
  refreshToken: string;
  isSocialLogin: boolean;
}

export interface IUserRegister {
  id: string;
  businessName: string;
  created_at: string;
  updated_at: string;
  name: string;
  email: string;
  phoneNumber: string;
  businessType: string;
  userType: string;
  city: string;
  country: string;
  address: string;
  registrationId: string;
  businessLicense: string;
  username: string;
  role: string;
  photo: string;
  isVendorApproved: boolean;
  provider: string;
  providerId: string;
  authToken: string;
  refreshToken: string;
  isSocialLogin: boolean;
}

export interface IActiveSession {
  access_token: string;
  refresh_token: string;
  user: IUser | null;
}

/**
 * -----------------------------------------------------------------------------
 * These types are used for tracking stateful logic for the Auth Session Store
 */
export interface IAuthState {
  // allUsers: IUserRegister[] | null;
  activeSession: IActiveSession | null;
  // addUserRegister: (newUsers: IUserRegister | IUserRegister[]) => void; // Updated type
  addNewSession: (session: IActiveSession) => void;
  removeSession: () => void;
  updateActiveSession: (session: IActiveSession) => void;
}

export type IPersistAuthStoreTargetState = Partial<
  Pick<IAuthState, "activeSession">
>;

export type TSetAuthState = (
  partial:
    | IAuthState
    | Partial<IAuthState>
    | ((state: IAuthState) => IAuthState | Partial<IAuthState>),
  replace?: false | undefined
) => void;
