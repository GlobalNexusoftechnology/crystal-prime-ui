import React from "react";

interface LeadMetricsProps {
  data: {
    conversionRate: number;
    avgLeadAge?: number;
    avgFollowups: number;
    bestLeadSource: string;
    avgTimeToConvert: number;
    pendingFollowups?: number;
    hotLeadsCount?: number;
    averageResponseTime?: number;
  };
}

export const LeadMetrics: React.FC<LeadMetricsProps> = ({ data }) => {
  const metrics = [
    {
      label: "Conversion Rate",
      value: `${data.conversionRate}%`,
      underline: true,
    },
    {
      label: "Avg Lead Age",
      value: data.avgLeadAge !== undefined ? `${data.avgLeadAge} Days` : "-",
      underline: true,
    },
    {
      label: "Avg Follow-ups Lead",
      value: data.avgFollowups,
      underline: false,
    },
    {
      label: "Top Performing Source",
      value: data.bestLeadSource,
      underline: true,
    },
    {
      label: "Avg Time to Convert",
      value: `${data.avgTimeToConvert} Days`,
      underline: true,
    },
    {
      label: "Pending Follow-ups",
      value: data.pendingFollowups !== undefined ? data.pendingFollowups : "-",
      underline: true,
    },
    {
      label: "Hot Leads Count",
      value: data.hotLeadsCount !== undefined ? data.hotLeadsCount : "-",
      underline: true,
    },
    {
      label: "Average Response Time",
      value: data.averageResponseTime !== undefined ? `${data.averageResponseTime} Hrs` : "-",
      underline: true,
    },
  ];

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <div className="flex flex-wrap gap-4 2xl:gap-[1.5vw] w-full">
        {metrics?.length > 0 && metrics?.map((metric, idx) => (
          <div key={idx} className="flex items-start gap-4 border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw]">
            <div>
              <div className="2xl:text-[1vw] font-light text-gray-800">
                {metric.label}
              </div>
              <div
                className={
                  `text-[1rem] 2xl:text-[1vw] font-medium text-[#1a2341] mt-1` +
                  (metric.underline ? " underline cursor-pointer" : "")
                }
              >
                {metric.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
