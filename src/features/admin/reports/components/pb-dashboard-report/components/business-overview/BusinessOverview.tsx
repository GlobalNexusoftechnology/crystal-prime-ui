import React from "react";
import { FiInfo } from "react-icons/fi";

interface BusinessOverviewProps {
  data: {
    totalProjectsDelivered: number;
    ongoingProjects: number;
    clientsServed: number;
  };
}

export const BusinessOverview: React.FC<BusinessOverviewProps> = ({ data }) => {
  const metrics = [
    {
      label: "Total Projects Delivered",
      value: data.totalProjectsDelivered,
      link: "#",
    },
    { label: "Ongoing Projects", value: data.ongoingProjects, link: "#" },
    { label: "Clients Served", value: data.clientsServed, link: "#" },
  ];

  return (
    <div className="border-b pb-6">
      <h2 className="text-[1.1rem] font-medium mb-4">Business Overview</h2>
      <div className="flex flex-wrap gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <FiInfo className="text-gray-400" size={20} />
            <div>
              <div className="text-gray-700 text-sm">{metric.label}</div>
              <a
                href={metric.link}
                className=" font-semibold underline text-[1rem] 2xl:text-[1vw] cursor-pointer"
              >
                {metric.value}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
