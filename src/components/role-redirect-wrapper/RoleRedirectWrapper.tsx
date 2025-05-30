"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useAuthStore, useRoleDetailQuery } from "@/services";
import { Loading } from "../loading";

export function RoleRedirectWrapper({ children }: { children: ReactNode }) {
  const { activeSession, updateActiveSession } = useAuthStore();
  const router = useRouter();

  const userId = activeSession?.user?.role?.id || "";

  const { roleDetailsData, isLoading: isRoleDetailsLoading } =
    useRoleDetailQuery(userId);

  useEffect(() => {
    // Skip running this effect if data is still loading
    if (isRoleDetailsLoading) return;

    if (!activeSession?.user || !roleDetailsData?.data) {
      router.push("/login");
      return;
    }

    const currentRoleId = activeSession.user.role?.id;
    const newRoleId = roleDetailsData.data.id;

    // Only update if role IDs are different
    if (currentRoleId !== newRoleId) {
      updateActiveSession({
        ...activeSession,
        user: { ...activeSession.user, role: roleDetailsData.data },
      });
    }
  }, [
    isRoleDetailsLoading,
    activeSession,
    roleDetailsData,
    updateActiveSession,
    router,
  ]);

  if (isRoleDetailsLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-screen text-center">
        <Loading />
      </div>
    );
  }

  return <div>{children}</div>;
}
