import { useMemo } from "react";
import { parsePermissions, getModuleValueByKey, getActionValueByKey } from "../helpers";
import { useAuthStore } from "@/services";

export function usePermission() {
  const { activeSession } = useAuthStore();
  const parsed = useMemo(() => {
    const userPermissions = activeSession?.user?.role?.permissions || [];
    return parsePermissions(userPermissions);
  }, [activeSession]);
  console.log("active session", {activeSession});
  
  function hasPermission(moduleKey: string, actionKeys: string | string[]): boolean {
    const moduleValue = getModuleValueByKey(moduleKey);
    if (!moduleValue) return false;

    const allowedActions = parsed[moduleValue] || [];

    const actionsToCheck = Array.isArray(actionKeys) ? actionKeys : [actionKeys];
    const actionValues = actionsToCheck.map(getActionValueByKey).filter(Boolean) as string[];

    return actionValues.every((val) => allowedActions.includes(val));
  }

  return { hasPermission };
}
