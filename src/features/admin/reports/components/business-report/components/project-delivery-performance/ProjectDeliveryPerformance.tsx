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

export const ProjectDeliveryPerformance: React.FC<ProjectDeliveryPerformanceProps> = ({ data }) => {
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
    <div className="border-b 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">Project Delivery & Performance</div>
      <div className="flex flex-wrap gap-x-16 gap-y-8 w-full">
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
};
