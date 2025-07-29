import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
  CartesianGrid,
  ReferenceLine,
} from "recharts";

interface LeadFunnelChartProps {
  data?: {
    totalLeads: number;
    lostLeads: number;
    convertedLeads: number;
    dropOfStage: {
      stage: string;
      count: number;
    };
  };
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded shadow text-gray-900 text-base font-semibold border border-gray-200">
        {payload[0].value} Leads
      </div>
    );
  }
  return null;
};

export const LeadFunnelChart: React.FC<LeadFunnelChartProps> = ({ data }) => {
  const funnelData = data ? [
    { name: "Total Leads", value: data.totalLeads, color: "#1746A2" },
    { name: "Lost Leads", value: data.lostLeads, color: "#69A8F7" },
    { name: "Converted Leads", value: data.convertedLeads, color: "#69A8F7" },
  ] : [
    { name: "Total Leads", value: 0, color: "#1746A2" },
    { name: "Lost Leads", value: 0, color: "#69A8F7" },
    { name: "Converted Leads", value: 0, color: "#69A8F7" },
  ];
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 w-full">
      <div className="flex justify-between items-center mb-4">
        <span className="font-semibold text-lg text-gray-900">
          Lead Metrics
        </span>
        <div className="flex items-center gap-2">
          <span className="text-gray-700 font-medium">Drop of Stage</span>
          <span className="bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded">
            {data?.dropOfStage?.stage || "Personal Sent"}
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={funnelData} barSize={48}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 15, fill: "#222" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis domain={[0, 50]} />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="value"
              position="top"
              content={({ value }) => `${value} Leads`}
              style={{ fontWeight: 600, fontSize: 16, fill: "#222" }}
            />
            {funnelData?.length > 0 && funnelData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
