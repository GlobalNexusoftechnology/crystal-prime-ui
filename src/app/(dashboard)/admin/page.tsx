"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Loading } from "@/components";
import { useAuthStore } from "@/services";

export default function AdminPage() {
  const router = useRouter();
  const { activeSession } = useAuthStore()

  useEffect(() => {
    if (!activeSession?.access_token) {
      // If no token, redirect to login
      router.replace("/login");
    } else {
      // If token exists, redirect to dashboard
      router.replace("/admin/dashboard");
    }
  }, [activeSession?.access_token, router]);

  return <Loading />;
}
