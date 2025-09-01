import { IoInformationCircleOutline } from "react-icons/io5";
import { StaffPerformanceReportResponse } from "@/services";

type TaskSummaryProps = {
  taskSummary?: StaffPerformanceReportResponse["data"]["taskSummary"];
};

export function TaskSummary({ taskSummary }: TaskSummaryProps) {
  if (!taskSummary) return null;

  return (
    <div className="p-6 2xl:p-[1.5vw] border-b border-gray-400 2xl:border-b-[0.1vw]">
      <h3 className="text-[1.1rem] 2xl:text-[1.1vw] mb-6 2xl:mb-[1.5vw] font-semibold text-gray-900">
        Task Summary
      </h3>

      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw] text-[0.95rem] 2xl:text-[0.875vw]">
        <InfoItem label="Total Task Assigned" value={taskSummary.totalTasksAssigned} />
        <InfoItem label="Completed Task" value={taskSummary.completedTasks} />
        <InfoItem label="Completion Rate" value={`${taskSummary.completionRate}`} />
        <InfoItem label="Avg Day To Complete" value={taskSummary.avgDaysToComplete} />
        <InfoItem label="Delayed Task" value={taskSummary.delayedTasks} />
      </div>
    </div>
  );
}

type InfoItemProps = {
  label: string;
  value: string | number;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="flex flex-col gap-1 border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
      <span className="flex items-center gap-2 text-gray-600 font-medium">
        <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
        {label}
      </span>
      <span className="text-gray-900 text-[1rem] 2xl:text-[1vw] font-semibold underline">
        {value}
      </span>
    </div>
  );
}
