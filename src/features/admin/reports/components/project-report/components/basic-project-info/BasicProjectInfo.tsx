import { ProjectPerformanceReportResponse } from "@/services";

export function BasicProjectInfo({ data }: { data: ProjectPerformanceReportResponse["data"]["basicProjectInfo"] }) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw] font-medium">Basic Project Info</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Project Type</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.projectType ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Project Manager</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.projectManager?.name ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Estimated Start Date</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.estimatedStartDate ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Estimated End Date</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.estimatedEndDate ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Project Phase</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.projectPhase ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Current Status</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.currentStatus ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 