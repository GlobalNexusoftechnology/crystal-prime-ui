"use client";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/utils/hooks";
import { EModule, EAction } from "@/constants";
import { BOQ } from "@/features";

export default function BOQPage() {
  const { hasPermission } = usePermission();
  const router = useRouter();

  useEffect(() => {
    const canViewBOQ = hasPermission(EModule.BOQ, EAction.VIEW);
    if (!canViewBOQ) {
      router.push("/admin/dashboard");
    }
  }, [hasPermission, router]);

  const canViewBOQ = hasPermission(EModule.BOQ, EAction.VIEW);
  
  if (!canViewBOQ) {
    return null; // Don't render anything while redirecting
  }

  return (
    <Suspense>
      <BOQ />
    </Suspense>
  );
}
