import React from "react";
import { FiInfo } from "react-icons/fi";

interface TeamPerformanceHighlightsProps {
  data: {
    topPerformer: string;
    onTimeDeliveryRate: number;
    avgTaskCompletionRate: number;
  };
}

export const TeamPerformanceHighlights: React.FC<
  TeamPerformanceHighlightsProps
> = ({ data }) => {
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
    <div className="border-b p-6 2xl:p-[1.5vw] pt-0 2xl:pt-0">
      <h2 className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">
        Team & Performance Highlights
      </h2>
      <div className="flex flex-wrap gap-6">
        {metrics?.length > 0 && metrics?.map((metric, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <FiInfo className="text-gray-400" size={20} />
            <div>
              <div className="text-gray-700 text-sm">{metric.label}</div>
              {metric.link ? (
                <a
                  href={metric.link}
                  className="font-medium underline text-[1rem] 2xl:text-[1vw] cursor-pointer"
                >
                  {metric.value}
                </a>
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
