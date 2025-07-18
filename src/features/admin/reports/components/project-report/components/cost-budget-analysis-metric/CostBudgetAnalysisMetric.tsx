import React from "react";

export function CostBudgetAnalysisMetric() {
  // Mock data for demonstration
  const amountBudget = "5,00,000";
  const estimatedInternalCost = "4,75,000";
  const actualCost = "5,20,000";
  const budgetUtilization = "104%";
  const overrun = "₹20,000";

  return (
    <div className="border-b 2xl:border-[0.1vw]">
    <div className="p-6 2xl:p-[2vw] bg-white rounded-lg 2xl:rounded-[1vw]">
      <h2 className="text-xl 2xl:text-[1.25vw] font-medium mb-6 2xl:mb-[1vw]">Cost & Budget Analysis Metric</h2>
      <div className="flex flex-wrap gap-x-24 2xl:gap-x-[6vw] gap-y-10 2xl:gap-y-[2vw] text-[1.1rem] 2xl:text-[1vw]">
        <div>
          <p className="font-medium 2xl:text-[1vw]">Amount Budget</p>
          <p className="underline font-medium 2xl:text-[1vw] cursor-pointer">{amountBudget}</p>
        </div>
        <div>
          <p className="font-medium 2xl:text-[1vw]">Estimated Internal Cost</p>
          <p className="underline font-medium 2xl:text-[1vw] cursor-pointer">{estimatedInternalCost}</p>
        </div>
        <div>
          <p className="font-medium 2xl:text-[1vw]">Actual Cost So Far</p>
          <p className="underline font-medium 2xl:text-[1vw] cursor-pointer">{actualCost}</p>
        </div>
        <div>
          <p className="font-medium 2xl:text-[1vw]">Budget Utilization</p>
          <p className="underline font-medium 2xl:text-[1vw] cursor-pointer">{budgetUtilization}</p>
        </div>
        <div>
          <p className="font-medium 2xl:text-[1vw]">Overrun</p>
          <p className="underline font-medium 2xl:text-[1vw] cursor-pointer">{overrun}</p>
        </div>
      </div>
    </div>
    </div>
  );
} 