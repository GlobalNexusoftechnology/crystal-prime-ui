import { EditProposal } from "@/features";
import { Suspense } from "react";

export default function EditProposalPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditProposal />
    </Suspense>
  );
}
