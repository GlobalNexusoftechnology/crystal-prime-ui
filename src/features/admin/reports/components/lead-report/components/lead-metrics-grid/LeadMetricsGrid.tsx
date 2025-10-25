import React from "react";
import { FiInfo } from "react-icons/fi";

interface LeadMetricsGridProps {
  data?: {
    conversionRate: number;
    avgLeadAge: number;
    avgFollowupsLead: number;
    topPerformingSource: string;
    avgTimeToConvert: number;
    pendingFollowups: number;
    hotLeadsCount: number;
    averageResponseTime: number;
  };
}

export const LeadMetricsGrid: React.FC<LeadMetricsGridProps> = ({ data }) => {
  const metrics = data ? [
    { label: "Conversion Rate", value: `${data.conversionRate}%`, underline: true },
    { label: "Avg Lead Age", value: `${data.avgLeadAge} Days`, underline: true },
    { label: "Avg Follow-ups Lead", value: data.avgFollowupsLead.toString(), underline: false },
    { label: "Top Performing Source", value: data.topPerformingSource, underline: true },
    { label: "Avg Time to Convert", value: `${data.avgTimeToConvert} Days`, underline: true },
    { label: "Pending Follow-ups", value: data.pendingFollowups.toString(), underline: true },
    { label: "Hot Leads Count", value: data.hotLeadsCount.toString(), underline: true },
    { label: "Average Response Time", value: `${data.averageResponseTime} Hrs`, underline: true },
  ] : [
    { label: "Conversion Rate", value: "0%", underline: true },
    { label: "Avg Lead Age", value: "0 Days", underline: true },
    { label: "Avg Follow-ups Lead", value: "0", underline: false },
    { label: "Top Performing Source", value: "N/A", underline: true },
    { label: "Avg Time to Convert", value: "0 Days", underline: true },
    { label: "Pending Follow-ups", value: "0", underline: true },
    { label: "Hot Leads Count", value: "0", underline: true },
    { label: "Average Response Time", value: "0 Hrs", underline: true },
  ];

  return (
    <div className="flex flex-wrap gap-6  w-full max-w-6xl mx-auto">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-200"
        >
          <span className="mt-1 text-gray-500">
            <FiInfo size={22} />
          </span>
          <div>
            <div className="text-sm text-gray-600 ">{metric.label}</div>
            <div
              className={`text-[1rem]  font-semibold text-[#1a2341] mt-1 ${
                metric.underline ? "underline cursor-pointer" : ""
              }`}
            >
              {metric.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
