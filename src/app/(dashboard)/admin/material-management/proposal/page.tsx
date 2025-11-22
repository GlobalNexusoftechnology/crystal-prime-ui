"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePermission } from "@/utils/hooks";
import { EModule, EAction } from "@/constants";
import { Proposal } from "@/features";

export default function ProposalPage() {
  const { hasPermission } = usePermission();
  const router = useRouter();

  useEffect(() => {
    const canViewProposal = hasPermission(EModule.PROPOSAL, EAction.VIEW);
    if (!canViewProposal) {
      router.push("/admin/dashboard");
    }
  }, [hasPermission, router]);

  const canViewProposal = hasPermission(EModule.PROPOSAL, EAction.VIEW);
  
  if (!canViewProposal) {
    return null; 
  }

  return <Proposal />;
}
