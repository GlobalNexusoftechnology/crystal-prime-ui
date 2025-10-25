import Link from "next/link";
import React from "react";
import { FiInfo } from "react-icons/fi";

interface TeamPerformanceHighlightsProps {
  data: {
    topPerformer: string;
    onTimeDeliveryRate: number;
    avgTaskCompletionRate: number;
  };
}

export const TeamPerformanceHighlights: React.FC<TeamPerformanceHighlightsProps> = ({
  data,
}) => {
  const metrics = [
    { label: "Top Performer", value: data.topPerformer, link: "#" },
    {
      label: "On-time Delivery Rate",
      value: `${data.onTimeDeliveryRate}%`,
      link: "#",
    },
    {
      label: "Avg Task Completion Rate",
      value: `${data.avgTaskCompletionRate}%`,
    },
  ];

  return (
    <div className="border-b border-gray-400  p-6 ">
      <h2 className="text-[1.1rem]  font-semibold mb-6 ">
        Team & Performance Highlights
      </h2>

      <div className="flex flex-wrap gap-4 ">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="border border-gray-300  rounded-lg  p-4  flex items-start gap-3 "
          >
            <FiInfo className="text-gray-400 w-5 h-5  " />
            <div>
              <div className="text-gray-500 text-sm ">
                {metric.label}
              </div>
              {metric.link ? (
                <Link
                  href={metric.link}
                  className="font-medium underline text-[1rem]  text-black"
                >
                  {metric.value}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium text-[1rem] ">
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
