import React from "react";
import { FiInfo } from "react-icons/fi";

const metrics = [
  { label: "Leads This Month", value: 52, link: "#" },
  { label: "Conversions This Month", value: 22, link: "#" },
  { label: "Average Conversion Time", value: "6.2 days" },
  { label: "Top Source of Leads", value: "Referral", link: "#" },
];

export const LeadClientInterest: React.FC = () => (
  <div className="border-b p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
    <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-2">Lead & Client Interest</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <FiInfo className="text-gray-400" size={20} />
          <div>
            <div className="text-gray-700 text-sm">{metric.label}</div>
            {metric.link ? (
              <a href={metric.link} className="font-semibold underline text-[1rem] 2xl:text-[1vw] cursor-pointer">
                {metric.value}
              </a>
            ) : (
              <span className="text-gray-900 font-semibold text-[1rem] 2xl:text-[1vw]">{metric.value}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
); 