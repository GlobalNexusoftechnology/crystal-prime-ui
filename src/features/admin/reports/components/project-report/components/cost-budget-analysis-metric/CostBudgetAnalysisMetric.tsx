"use client";

import { ProjectPerformanceReportResponse } from "@/services";

export function CostBudgetAnalysisMetric({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["costBudgetAnalysis"];
}) {
  if (!data) return null;

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h3 className="text-[1.1rem] font-semibold 2xl:text-[1.1vw] mb-4 2xl:mb-[1vw]">
        Cost & Budget Analysis
      </h3>

      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">

        {/* Budget */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Budget</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.budget ?? "-"}</p>
        </div>

        {/* Estimated Cost */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Estimated Cost</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.estimatedCost ?? "-"}</p>
        </div>

        {/* Actual Cost */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Actual Cost</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.actualCost ?? "-"}</p>
        </div>

        {/* Budget Utilization */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Budget Utilization</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.budgetUtilization ?? "-"}</p>
        </div>

        {/* Overrun */}
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Overrun</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.overrun ?? "-"}</p>
        </div>

      </div>
    </div>
  );
}
