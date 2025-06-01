"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components";
import { useAuthStore } from "@/services";

export default function AdminPage() {
  const router = useRouter();
  const { activeSession } = useAuthStore()
  const accessToken = activeSession?.access_token

  useEffect(() => {
    if (!accessToken) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect to dashboard
      router.replace("/admin/lead-management");
    }
  }, [accessToken, router]);

  return <Loading />;
}
