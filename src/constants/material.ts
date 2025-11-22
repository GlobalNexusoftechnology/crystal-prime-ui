export const gstOptions = Array.from({ length: 30 }, (_, i) => {
  const value = `${i + 1}%`;
  return { label: value, value };
});

export enum BoqStatus {
  PENDING = "pending",
  PROPOSAL_READY = "proposal_ready",
  CANCELLED = "cancelled",
}

export enum ProposalStatus {
  PENDING = "pending",
  GENERATED = "generated",
  SENT = "sent",
  APPROVED = "approved",
  REJECTED = "rejected",
}
