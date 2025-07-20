import React from "react";

interface FinancialSummaryProps {
  data: {
    totalIncome: number;
    amountReceivedInBank: number;
    amountReceivedInUPI: number;
    amountReceivedInCash: number;
    amountReceivedInOnline: number;
    amountSpentInBank: number;
    amountSpentInUPI: number;
    amountSpentInCash: number;
    amountSpentInOnline: number;
  };
}

export const FinancialSummary: React.FC<FinancialSummaryProps> = ({ data }) => {
  const metrics = [
    { label: "Total Income", value: data.totalIncome },
    { label: "Amount received in UPI", value: data.amountReceivedInUPI },
    { label: "Amount received in bank", value: data.amountReceivedInBank },
    { label: "Amount received in Cash", value: data.amountReceivedInCash },
    { label: "Amount received in Online", value: data.amountReceivedInOnline },
    { label: "Amount Spent in UPI", value: data.amountSpentInUPI },
    { label: "Amount Spent in bank", value: data.amountSpentInBank },
    { label: "Amount Spent in Cash", value: data.amountSpentInCash },
    { label: "Amount Spent in Online", value: data.amountSpentInOnline },
  ];

  return (
    <div className="border-b 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">
        Financial Summary
      </div>
      <div className="flex flex-wrap gap-x-12 gap-y-6 w-full">
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
};
