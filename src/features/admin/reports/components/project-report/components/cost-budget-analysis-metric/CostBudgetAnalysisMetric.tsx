import { ProjectPerformanceReportResponse } from "@/services";

export function CostBudgetAnalysisMetric({ data }: { data: ProjectPerformanceReportResponse["data"]["costBudgetAnalysis"] }) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">Cost & Budget Analysis</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Budget</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.budget ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Estimated Cost</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.estimatedCost ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Actual Cost</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.actualCost ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Budget Utilization</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.budgetUtilization ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Overrun</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.overrun ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 