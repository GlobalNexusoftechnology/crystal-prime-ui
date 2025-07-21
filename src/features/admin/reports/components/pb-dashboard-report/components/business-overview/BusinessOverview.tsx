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
    <div className="border-b pb-6 2xl:pb-[1.5vw]">
      <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4 2xl:mb-[1vw]">Business Overview</h2>
      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw]">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex items-start gap-3 2xl:gap-[0.75vw]">
            <FiInfo className="text-gray-400 w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
            {/* 2xl: text-[1vw] for icon if needed, but react-icons uses size prop */}
            <div>
              <div className="text-gray-700 text-sm 2xl:text-[0.85vw]">{metric.label}</div>
              <a
                href={metric.link}
                className="font-semibold underline text-[1rem] 2xl:text-[1vw] cursor-pointer"
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
