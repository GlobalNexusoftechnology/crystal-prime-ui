import React from "react";

const metrics = [
  { label: "Total Income", value: "₹12,50,000" },
  { label: "Amount received in UPI", value: "₹12,50,000" },
  { label: "Amount received in bank", value: "₹12,50,000" },
  { label: "Amount received in Cash", value: "₹12,50,000" },
  { label: "Amount received in Online", value: "₹12,50,000" },
  { label: "Amount received in bank", value: "₹12,50,000" },
  { label: "Amount Spent in UPI", value: "₹12,50,000" },
  { label: "Amount Spent in bank", value: "₹12,50,000" },
  { label: "Amount Spent in Cash", value: "₹12,50,000" },
  { label: "Amount Spent in Online", value: "₹12,50,000" },
];

export const FinancialSummary: React.FC = () => (
  <div className="border-b 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
    <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">
      Financial Summary
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 w-full">
      {metrics.map((metric, idx) => (
        <div key={idx}>
          <div className="text-gray-800 font-light 2xl:text-[1vw]">
            {metric.label}
          </div>
          <div className="text-[#1a2341] font-semibold underline text-[1rem] 2xl:text-[1vw] mt-1 cursor-pointer">
            {metric.value}
          </div>
        </div>
      ))}
    </div>
  </div>
);
