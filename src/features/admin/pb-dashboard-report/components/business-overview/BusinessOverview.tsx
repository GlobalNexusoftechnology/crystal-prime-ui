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
    <div className="border-b border-gray-400  p-6 ">
      <h2 className="text-[1.1rem]  font-semibold mb-6 ">
        Business Overview
      </h2>

      <div className="flex flex-wrap gap-4 ">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="border border-gray-300  rounded-lg  p-4  flex items-start gap-3 "
          >
            <FiInfo className="text-gray-400 w-5 h-5  " />
            <div>
              <div className="text-gray-500 text-sm ">{metric.label}</div>
              <a
                href={metric.link}
                className="font-medium underline text-[1rem]  text-black"
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
