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
    <div className="p-6 2xl:p-[1.5vw] border-b border-gray-400 2xl:border-b-[0.1vw]">
      <h3 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold text-gray-900 mb-6 2xl:mb-[1.5vw]">
        Follow-Up Performance
      </h3>

      <div className="flex flex-wrap gap-4 2xl:gap-[1vw]">
        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="flex flex-col gap-1 border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]"
          >
            <span className="flex items-center gap-2 text-gray-600 text-sm font-medium">
              <IoInformationCircleOutline className="w-5 h-5 2xl:w-[1vw] 2xl:h-[1vw]" />
              {metric.label}
            </span>
            <span className="text-[1.1rem] 2xl:text-[1vw] font-semibold text-blue-900 underline">
              {followUpPerformance[metric.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
