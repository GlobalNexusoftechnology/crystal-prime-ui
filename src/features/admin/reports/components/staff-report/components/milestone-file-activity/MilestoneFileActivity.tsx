import { StaffPerformanceReportResponse } from "@/services";

type MilestoneFileActivityProps = {
  milestoneFileActivity?: StaffPerformanceReportResponse["data"]["milestoneFileActivity"];
};

export function MilestoneFileActivity({
  milestoneFileActivity,
}: MilestoneFileActivityProps) {
  if (!milestoneFileActivity) return null;

  return (
    <div className="p-6 2xl:p-[1.5vw] border-b border-gray-400 2xl:border-b-[0.1vw]">
      <h3 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-6 2xl:mb-[1.5vw] text-[#1a2341]">
        Milestone & File Activity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 2xl:gap-[1.25vw]">
        {/* Milestones Managed */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
          <p className="text-sm 2xl:text-[0.85vw] text-gray-500 mb-1">
            Milestones Managed
          </p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline text-[#1a2341]">
            {milestoneFileActivity.milestonesManaged}
          </p>
        </div>

        {/* Files Uploaded */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
          <p className="text-sm 2xl:text-[0.85vw] text-gray-500 mb-1">
            Files Uploaded
          </p>
          <p className="text-[1rem] 2xl:text-[1vw] font-medium underline text-[#1a2341]">
            {milestoneFileActivity.filesUploaded}
          </p>
        </div>
      </div>
    </div>
  );
}
