import React from "react";
import { FiInfo } from "react-icons/fi";

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
    { label: "Amount Received in UPI", value: data.amountReceivedInUPI },
    { label: "Amount Received in Bank", value: data.amountReceivedInBank },
    { label: "Amount Received in Cash", value: data.amountReceivedInCash },
    { label: "Amount Received in Online", value: data.amountReceivedInOnline },
    { label: "Amount Spent in UPI", value: data.amountSpentInUPI },
    { label: "Amount Spent in Bank", value: data.amountSpentInBank },
    { label: "Amount Spent in Cash", value: data.amountSpentInCash },
    { label: "Amount Spent in Online", value: data.amountSpentInOnline },
  ];

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-6 2xl:mb-[1.5vw]">
        Financial Summary
      </h2>

      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 2xl:gap-[0.75vw] p-4 2xl:p-[1vw] border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw]"
          >
            <FiInfo className="text-gray-400 w-5 h-5 2xl:w-[1.1vw] 2xl:h-[1.1vw] mt-[0.3vw]" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                {metric.label}
              </span>
              <span className="text-base 2xl:text-[1vw] font-medium text-[#1a2341] mt-1 underline cursor-pointer">
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
