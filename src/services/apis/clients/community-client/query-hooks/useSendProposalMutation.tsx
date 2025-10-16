import { ISendProposalPayload, useMutation } from "@/services";
import { COMMUNITY_CLIENT } from "../communityClient";

const SEND_PROPOSAL_MUTATION_KEY = "send-proposal-mutation-key";

/**
 * React Query hook to send a proposal and automatically download the DOC file.
 */
export const useSendProposalMutation = () => {
  return useMutation({
    mutationKey: [SEND_PROPOSAL_MUTATION_KEY],
    /**
     * @param id Lead ID
     * @param payload Proposal details (proposalDate, proposalNumber, proposalText)
     * @returns Blob (DOCX file)
     */
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ISendProposalPayload;
    }) => {
      // Call the API (returns Blob)
      const blob = await COMMUNITY_CLIENT.sendProposal(id, payload);

      // Ensure valid Blob before attempting to download
      if (!(blob instanceof Blob)) {
        throw new Error("Invalid file response from server");
      }

      // Trigger DOC download automatically
      const fileURL = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = `proposal_${id}.docx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(fileURL);

      return blob;
    },
  });
};
