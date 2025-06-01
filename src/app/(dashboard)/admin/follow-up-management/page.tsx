import { FollowUpManagement } from "@/features";

/**
 * FollowUpManagementPage Component
 *
 * This page component serves as the entry point for the Follow Up Management feature.
 * It renders the main `FollowUpManagement` component, which includes UI for managing follow-ups,
 * including lead data display, filters, upload functionality, and modals.
 *
 * @returns JSX.Element
 */
export default function FollowUpManagementPage() {
  return (
    <div>
      <FollowUpManagement />
    </div>
  );
}
