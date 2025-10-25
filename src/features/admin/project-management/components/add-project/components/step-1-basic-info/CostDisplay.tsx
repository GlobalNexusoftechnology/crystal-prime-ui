import React from "react";

interface CostDisplayProps {
  label: string;
  value: number | string;
  currency?: string;
}

export const CostDisplay: React.FC<CostDisplayProps> = ({ label, value, currency = "₹" }) => {
  return (
    <div className="flex flex-col items-start">
      <span className=" font-medium text-gray-700 mb-1 ">{label}</span>
      <span className="text-4xl  font-semibold text-gray-900 flex items-baseline">
        <span className="mr-1 ">{currency}</span>
        {Number(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}; 