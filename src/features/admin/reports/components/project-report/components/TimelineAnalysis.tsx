import { ProjectPerformanceReportResponse } from "@/services";

export function TimelineAnalysis({ data }: { data: ProjectPerformanceReportResponse["data"]["timelineAnalysis"] }) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">Timeline Analysis</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Days Since Start</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.daysSinceStart ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Planned Duration</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.plannedDurationDays ?? '-'} days</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Progress</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.progressPercent ?? '-'}%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Delay Risk</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.delayRisk ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 