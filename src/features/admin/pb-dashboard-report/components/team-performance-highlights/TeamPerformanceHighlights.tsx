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
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-6 2xl:mb-[1.5vw]">
        Team & Performance Highlights
      </h2>

      <div className="flex flex-wrap gap-4 2xl:gap-[1.25vw]">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="border border-gray-300 2xl:border-b-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] flex items-start gap-3 2xl:gap-[0.75vw]"
          >
            <FiInfo className="text-gray-400 w-5 h-5 2xl:w-[1.1vw] 2xl:h-[1.1vw]" />
            <div>
              <div className="text-gray-500 text-sm 2xl:text-[0.85vw]">
                {metric.label}
              </div>
              {metric.link ? (
                <Link
                  href={metric.link}
                  className="font-medium underline text-[1rem] 2xl:text-[1vw] text-black"
                >
                  {metric.value}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium text-[1rem] 2xl:text-[1vw]">
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
