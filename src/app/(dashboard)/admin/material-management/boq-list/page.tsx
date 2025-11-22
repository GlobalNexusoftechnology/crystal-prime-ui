"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/utils/hooks";
import { EModule, EAction } from "@/constants";
import { BOQList } from "@/features";

export default function BOQListPage() {
  const { hasPermission } = usePermission();
  const router = useRouter();

  useEffect(() => {
    const canViewBOQList = hasPermission(EModule.BOQ_LIST, EAction.VIEW);
    if (!canViewBOQList) {
      router.push("/admin/dashboard");
    }
  }, [hasPermission, router]);

  const canViewBOQList = hasPermission(EModule.BOQ_LIST, EAction.VIEW);
  
  if (!canViewBOQList) {
    return null; // Don't render anything while redirecting
  }

  return <BOQList />;
}
