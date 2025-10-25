import { StaffPerformanceReportResponse } from "@/services";
import { IoInformationCircleOutline } from "react-icons/io5";

type FollowUpPerformanceProps = {
  followUpPerformance?: StaffPerformanceReportResponse["data"]["followUpPerformance"];
};

const metrics = [
  { label: "Total Follow-Ups", key: "totalFollowUps" },
  { label: "Completed Follow-Ups", key: "completedFollowUps" },
  { label: "Pending Follow-ups", key: "pendingFollowUps" },
  { label: "Missed Follow-ups", key: "missedFollowUps" },
  { label: "Avg Response Time", key: "avgResponseTime" },
] as const;

export function FollowUpPerformance({ followUpPerformance }: FollowUpPerformanceProps) {
  if (!followUpPerformance) return null;

  return (
    <div className="p-6  border-b border-gray-400 ">
      <h3 className="text-[1.1rem]  font-semibold text-gray-900 mb-6 ">
        Follow-Up Performance
      </h3>

      <div className="flex flex-wrap gap-4 ">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="flex flex-col gap-1 border border-gray-300  rounded-lg  p-4 "
          >
            <span className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <IoInformationCircleOutline className="w-5 h-5  " />
              {metric.label}
            </span>
            <span className="text-[1rem]  font-semibold  underline">
              {followUpPerformance[metric.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
