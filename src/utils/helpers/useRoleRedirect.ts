"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/services";

interface IUseRoleRedirectProps {
  allowedRoles: string[];
  redirectTo: string;
}

export const useRoleRedirect = ({
  allowedRoles,
  redirectTo,
}: IUseRoleRedirectProps) => {
  const router = useRouter();
  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role.id;
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkRole = async () => {
      if (!userRole) {
        router.push(redirectTo);
        setLoading(false);
        return;
      }

      if (!allowedRoles.includes(userRole)) {
        router.push(redirectTo);
        setLoading(false);
        return;
      }
      setLoading(false);
    };

    checkRole();
  }, [router, userRole, allowedRoles, redirectTo]);

  return { loading };
};
