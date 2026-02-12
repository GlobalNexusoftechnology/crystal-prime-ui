import React from "react";
// import { FiInfo } from "react-icons/fi";

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
  // const metrics = [
  //   { label: "Total Income", value: data.totalIncome },
  //   { label: "Amount Received in UPI", value: data.amountReceivedInUPI },
  //   { label: "Amount Received in Bank", value: data.amountReceivedInBank },
  //   { label: "Amount Received in Cash", value: data.amountReceivedInCash },
  //   { label: "Amount Received in Online", value: data.amountReceivedInOnline },
  //   { label: "Amount Spent in UPI", value: data.amountSpentInUPI },
  //   { label: "Amount Spent in Bank", value: data.amountSpentInBank },
  //   { label: "Amount Spent in Cash", value: data.amountSpentInCash },
  //   { label: "Amount Spent in Online", value: data.amountSpentInOnline },
  // ];
console.log(data, "data");
  return (
    // <div className="border-b border-gray-400  p-6 ">
    //   <h2 className="text-[1.1rem]  font-semibold mb-6 ">
    //     Financial Summary
    //   </h2>

    //   <div className="flex flex-wrap gap-6 ">
    //     {metrics.map((metric, idx) => (
    //       <div
    //         key={idx}
    //         className="flex items-start gap-4  p-4  border border-gray-300  rounded-lg "
    //       >
    //         <FiInfo className="text-gray-400 w-5 h-5   mt-[0.3vw]" />
    //         <div className="flex flex-col">
    //           <span className="text-gray-500 text-sm ">
    //             {metric.label}
    //           </span>
    //           <span className="text-base  font-medium text-[#1a2341] mt-1 underline cursor-pointer">
    //             {metric.value}
    //           </span>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <></>
  );
};
