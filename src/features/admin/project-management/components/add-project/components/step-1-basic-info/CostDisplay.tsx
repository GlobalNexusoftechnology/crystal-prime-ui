import React from "react";

interface CostDisplayProps {
  label: string;
  value: number | string;
  currency?: string;
}

export const CostDisplay: React.FC<CostDisplayProps> = ({ label, value, currency = "₹" }) => {
  return (
    <div className="flex flex-col items-start">
      <span className="2xl:text-[1vw] font-medium text-gray-700 mb-1 2xl:mb-[0.25vw]">{label}</span>
      <span className="text-4xl 2xl:text-[2.25vw] font-semibold text-gray-900 flex items-baseline">
        <span className="mr-1 2xl:mr-[0.25vw]">{currency}</span>
        {Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}; 