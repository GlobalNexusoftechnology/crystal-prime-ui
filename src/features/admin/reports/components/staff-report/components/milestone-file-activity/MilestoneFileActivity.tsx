import { StaffPerformanceReportResponse } from "@/services";

type MilestoneFileActivityProps = {
  milestoneFileActivity?: StaffPerformanceReportResponse["data"]["milestoneFileActivity"];
};

export function MilestoneFileActivity({
  milestoneFileActivity,
}: MilestoneFileActivityProps) {
  if (!milestoneFileActivity) return null;

  return (
    <div className="p-6  border-b border-gray-400 ">
      <h3 className="text-[1.1rem]  font-semibold mb-6  text-[#1a2341]">
        Milestone & File Activity
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {/* Milestones Managed */}
        <div className="border border-gray-300  rounded-lg  p-4 ">
          <p className="text-sm  text-gray-500 mb-1">
            Milestones Managed
          </p>
          <p className="text-[1rem]  font-medium underline text-[#1a2341]">
            {milestoneFileActivity.milestonesManaged}
          </p>
        </div>

        {/* Files Uploaded */}
        <div className="border border-gray-300  rounded-lg  p-4 ">
          <p className="text-sm  text-gray-500 mb-1">
            Files Uploaded
          </p>
          <p className="text-[1rem]  font-medium underline text-[#1a2341]">
            {milestoneFileActivity.filesUploaded}
          </p>
        </div>
      </div>
    </div>
  );
}
