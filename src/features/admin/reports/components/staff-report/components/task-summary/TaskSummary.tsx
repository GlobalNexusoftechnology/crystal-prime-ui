import { IoInformationCircleOutline } from "react-icons/io5";
import { StaffPerformanceReportResponse } from "@/services";

type TaskSummaryProps = {
  taskSummary?: StaffPerformanceReportResponse["data"]["taskSummary"];
};

export function TaskSummary({ taskSummary }: TaskSummaryProps) {
  if (!taskSummary) return null;

  return (
    <div className="p-6  border-b border-gray-400 ">
      <h3 className="text-[1.1rem]  mb-6  font-semibold text-gray-900">
        Task Summary
      </h3>

      <div className="flex flex-wrap gap-6 text-[0.95rem] ">
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
    <div className="flex flex-col gap-1 border border-gray-300  rounded-lg  p-4 ">
      <span className="flex items-center gap-2 text-gray-600 font-medium">
        <IoInformationCircleOutline className="w-5 h-5  " />
        {label}
      </span>
      <span className="text-gray-900 text-[1rem]  font-semibold underline">
        {value}
      </span>
    </div>
  );
}
