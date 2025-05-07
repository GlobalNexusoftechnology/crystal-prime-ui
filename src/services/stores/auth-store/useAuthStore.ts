import { createZustandStore } from "../../zustand"

import { IAuthState } from "./types"

import {
  addNewSessionCallback,
  loadPersistedAuthStore,
  removeSessionCallback,
  updateActiveSessionCallback,
} from "./callbacks"

/**
 * This tracks changes to the active session when the user logins, user, their
 * activity log and flushes them when they log out.
 */
export const useAuthStore = createZustandStore<IAuthState>((set) => {
  const localAuthData = loadPersistedAuthStore()
  return {
    activeSession: localAuthData?.activeSession ?? null,
    addNewSession: addNewSessionCallback(set),
    removeSession: removeSessionCallback(set),
    updateActiveSession: updateActiveSessionCallback(set),
  };
})
