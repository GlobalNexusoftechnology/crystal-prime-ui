import Link from "next/link";
import React from "react";
import { FiInfo } from "react-icons/fi";

interface LeadClientInterestProps {
  data: {
    leadsThisMonth: number;
    conversionsThisMonth: number;
    avgConversionTime: number;
    topSourceOfLeads: string;
  };
}

export const LeadClientInterest: React.FC<LeadClientInterestProps> = ({ data }) => {
  const metrics = [
    { label: "Leads This Month", value: data.leadsThisMonth, link: "#" },
    {
      label: "Conversions This Month",
      value: data.conversionsThisMonth,
      link: "#",
    },
    {
      label: "Average Conversion Time",
      value: `${data.avgConversionTime} days`,
    },
    { label: "Top Source of Leads", value: data.topSourceOfLeads, link: "#" },
  ];

  return (
    <div className="border-b border-gray-400  p-6 ">
      <h2 className="text-[1.1rem]  font-semibold mb-6 ">
        Lead & Client Interest
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
              {metric.link ? (
                <Link
                  href={metric.link}
                  className="font-medium underline text-[1rem]  text-black"
                >
                  {metric.value}
                </Link>
              ) : (
                <span className="text-black font-medium text-[1rem] ">
                  {metric.value}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
