import React from "react";
import { FiInfo } from "react-icons/fi";

const metrics = [
  { label: "Total Projects", value: "190", underline: true },
  { label: "Completed Projects", value: "85", underline: true },
  { label: "On-time Delivery Rate", value: "82%", underline: false },
  { label: "Budget Overrun Projects", value: "3", underline: true },
  { label: "Avg Project Profitability", value: "28%", underline: true },
  { label: "Avg Project Duration", value: "34 Days", underline: false },
  { label: "Resource Utilization", value: "78%", underline: true },
  { label: "Client Satisfaction Index", value: "4.3/5", underline: true },
];

export const ProjectDeliveryPerformance: React.FC = () => (
  <div className="border-b 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
    <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">Project Delivery & Performance</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 w-full">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex items-start gap-4">
          <span className="mt-1 text-gray-500">
            <FiInfo size={28} />
          </span>
          <div>
            <div className="2xl:text-[1vw] font-light text-gray-800">
              {metric.label}
            </div>
            <div className={
              `text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341] mt-1` +
              (metric.underline ? " underline cursor-pointer" : "")
            }>
              {metric.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
