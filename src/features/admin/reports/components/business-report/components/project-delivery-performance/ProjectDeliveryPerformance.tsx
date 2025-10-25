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
    <div className="border-b border-gray-400  p-6 ">
      <h2 className="text-[1.1rem]  font-semibold mb-6 ">
        Project Delivery & Performance
      </h2>

      <div className="flex flex-wrap gap-6 ">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4  p-4  border border-gray-300  rounded-lg "
          >
            <FiInfo className="text-gray-400 w-5 h-5   mt-[0.3vw]" />
            <div className="flex flex-col">
              <span className="text-gray-500 text-sm ">
                {metric.label}
              </span>
              <span
                className={`text-base  font-medium text-[#1a2341] mt-1 ${
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
