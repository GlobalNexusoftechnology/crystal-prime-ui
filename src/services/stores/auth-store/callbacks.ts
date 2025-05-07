import {
  IActiveSession,
  TSetAuthState,
  IPersistAuthStoreTargetState,
} from "./types";
import { localStorageUtil } from "@/utils";

// Local Storage Key for Persisted Auth State
export const STORAGE_KEY_AUTH_STATE = "error-logs.0.0.t";

/**
 * This tracks persisted session state in local storage.
 * Covers (activeSession|activityLog|allSessionsById|allSessionsByIndex)
 */
export const loadPersistedAuthStore =
  (): IPersistAuthStoreTargetState | null => {
    // Call get method to retrieve the stored data
    const storedData = localStorageUtil.get<IPersistAuthStoreTargetState>(
      STORAGE_KEY_AUTH_STATE
    );

    // If the stored data is not null and is an object, return it
    if (storedData && typeof storedData === "object") {
      return storedData as IPersistAuthStoreTargetState; // Cast to the expected type
    }

    return null; // Return null if storedData is null or not an object
  };

/**
 * This persists the session information to secure local storage.
 */
export const persistAuthStore = (targetState: IPersistAuthStoreTargetState) => {
  const prevState = loadPersistedAuthStore();

  // Ensure prevState is an object or default to an empty object
  const newState = {
    ...(prevState ?? {}), // If prevState is null, default to an empty object
    ...targetState,
  };

  localStorageUtil.set(STORAGE_KEY_AUTH_STATE, newState);
};

/**
 * Adds a new session instance to track across the app.
 */
export function addNewSessionCallback(set: TSetAuthState) {
  return function addNewSession(newSession: IActiveSession) {
    set(() => {
      const updatedState = {
        activeSession: newSession,
      };

      persistAuthStore(updatedState);

      return updatedState;
    });
  };
}

/**
 * This removes the session instance from the application state & local storage.
 */
export function removeSessionCallback(set: TSetAuthState) {
  return function removeSession() {
    set(() => {
      const updatedState = {
        activeSession: null,
      };

      persistAuthStore(updatedState);

      return updatedState;
    });
  };
}

/**
 * This updates the active session in both local & app memory.
 */
export function updateActiveSessionCallback(set: TSetAuthState) {
  return function updateActiveSession(updatedData: Partial<IActiveSession>) {
    set((state) => {
      const updatedActiveSession: IActiveSession = {
        ...state.activeSession,
        ...updatedData,
        access_token: updatedData.access_token || state.activeSession?.access_token || "",
        refresh_token: updatedData.refresh_token || state.activeSession?.refresh_token || "",
        user: updatedData.user || state.activeSession?.user || null,
      };

      const updatedState: IPersistAuthStoreTargetState = {
        activeSession: updatedActiveSession,
      };

      persistAuthStore(updatedState); // Persist the updated active session
      return updatedState;
    });
  };
}
