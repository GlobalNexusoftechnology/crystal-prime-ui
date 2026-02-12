"use client";

import { ProjectPerformanceReportResponse } from "@/services";

export function CostBudgetAnalysisMetric({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["costBudgetAnalysis"];
}) {
  if (!data) return null;

  const budget = Number(data?.budget) || 0;
const estimatedCost = Number(data?.estimatedCost) || 0;
const profit = budget - estimatedCost;


  return (
    <div className="border-b border-gray-400  p-6 ">
      <h3 className="text-[1.1rem] font-semibold  mb-4 ">
        Cost & Budget Analysis
      </h3>

      <div className="flex flex-wrap gap-4  text-[0.9rem] ">

        {/* Budget */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Budget</p>
          <p className="underline text-[1rem] ">{data.budget ?? "-"}</p>
        </div>

        {/* Estimated Cost */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Estimated Cost</p>
          <p className="underline text-[1rem] ">{data.estimatedCost ?? "-"}</p>
        </div>

            {/* Profit */}
      <div className="border border-gray-300 rounded-lg p-4 min-w-[200px] flex-1">
  <p className="font-light mb-2">Profit</p>
  <p className="underline text-[1rem]">
    {data?.budget != null && data?.estimatedCost != null
      ? profit
      : "-"}
  </p>
</div>

        {/* Actual Cost */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Actual Cost</p>
          <p className="underline text-[1rem] ">{data.actualCost ?? "-"}</p>
        </div>

    

        {/* Budget Utilization */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Budget Utilization</p>
          <p className="underline text-[1rem] ">{data.budgetUtilization ?? "-"}</p>
        </div>

        {/* Overrun */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Overrun</p>
          <p className="underline text-[1rem] ">{data.overrun ?? "-"}</p>
        </div>

      </div>
    </div>
  );
}
