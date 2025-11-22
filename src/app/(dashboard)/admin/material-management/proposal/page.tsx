"use client";
import { Proposal } from "@/features";
import { usePermission } from "@/utils/hooks";
import { useRouter } from "next/navigation";

export default function ProposalPage() {
  const { hasPermission } = usePermission();
  const router = useRouter();

  // useEffect(() => {
  //   const canViewProposal = hasPermission(EModule.PROPOSAL, EAction.VIEW);
  //   if (!canViewProposal) {
  //     router.push("/admin/dashboard");
  //   }
  // }, [hasPermission, router]);

  // const canViewProposal = hasPermission(EModule.PROPOSAL, EAction.VIEW);

  // if (!canViewProposal) {
  //   return null;
  // }

  return <Proposal />;
}
