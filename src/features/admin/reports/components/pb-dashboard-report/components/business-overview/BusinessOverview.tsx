import React from "react";
import { FiInfo } from "react-icons/fi";

const metrics = [
  { label: "Total Projects Delivered", value: 152, link: "#" },
  { label: "Ongoing Projects", value: 51, link: "#" },
  { label: "Clients Served", value: 45, link: "#" },
];

export const BusinessOverview: React.FC = () => (
  <div className="border-b pb-6">
    <h2 className="text-[1.1rem] font-medium mb-4">Business Overview</h2>
    <div className="flex flex-wrap gap-6">
      {metrics.map((metric, idx) => (
        <div key={idx} className="flex items-start gap-3">
          <FiInfo className="text-gray-400" size={20} />
          <div>
            <div className="text-gray-700 text-sm">{metric.label}</div>
            <a href={metric.link} className=" font-semibold underline text-[1rem] 2xl:text-[1vw] cursor-pointer">
              {metric.value}
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
); 