import React from "react";
import { FiInfo } from "react-icons/fi";

interface ProjectDeliveryPerformanceProps {
  data: {
    totalProjects: number;
    completedProjects: number;
    onTimeDeliveryRate: number;
    budgetOverrunProjects: number;
    avgProjectProfitability: number;
    avgProjectDuration: number;
    resourceUtilization: number;
    clientSatisfactionIndex: number;
  };
}

export const ProjectDeliveryPerformance: React.FC<ProjectDeliveryPerformanceProps> = ({
  data,
}) => {
  const metrics = [
    { label: "Total Projects", value: data.totalProjects, underline: true },
    { label: "Completed Projects", value: data.completedProjects, underline: true },
    { label: "On-time Delivery Rate", value: `${data.onTimeDeliveryRate}%`, underline: false },
    { label: "Budget Overrun Projects", value: data.budgetOverrunProjects, underline: true },
    { label: "Avg Project Profitability", value: `${data.avgProjectProfitability}%`, underline: true },
    { label: "Avg Project Duration", value: `${data.avgProjectDuration} Days`, underline: false },
    { label: "Resource Utilization", value: `${data.resourceUtilization}%`, underline: true },
    { label: "Client Satisfaction Index", value: data.clientSatisfactionIndex, underline: true },
  ];

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-6 2xl:mb-[1.5vw]">
        Project Delivery & Performance
      </h2>

      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 2xl:gap-[0.75vw] p-4 2xl:p-[1vw] border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw]"
          >
            <FiInfo className="text-gray-400 w-5 h-5 2xl:w-[1.1vw] 2xl:h-[1.1vw] mt-[0.3vw]" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                {metric.label}
              </span>
              <span
                className={`text-base 2xl:text-[1vw] font-medium text-[#1a2341] mt-1 ${
                  metric.underline ? "underline cursor-pointer" : ""
                }`}
              >
                {metric.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
