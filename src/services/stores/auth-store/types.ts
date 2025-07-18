import { IRoleData } from "@/services/apis";

/**
 * TODO: Update the IUser based on the response we get from the API.
 * This represents the user information fetched from the backend.
 */
export interface IUser {
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
  activeSession: IActiveSession | null;
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
