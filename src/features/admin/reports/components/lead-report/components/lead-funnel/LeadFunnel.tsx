import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

interface LeadFunnelProps {
  data?: Array<{
    stage: string;
    count: number;
    isHighlighted: boolean;
  }>;
}

export const LeadFunnel: React.FC<LeadFunnelProps> = ({ data }) => {
  const funnelData = data ? data.map(item => ({
    name: item.stage,
    value: item.count,
    color: item.isHighlighted ? "#1746A2" : "#69A8F7"
  })) : [
    { name: "New", value: 0, color: "#69A8F7" },
    { name: "Profile Sent", value: 0, color: "#69A8F7" },
    { name: "Quotation", value: 0, color: "#69A8F7" },
    { name: "Not Interested", value: 0, color: "#1746A2" },
    { name: "Call Me Later", value: 0, color: "#69A8F7" },
    { name: "Phone Not Received", value: 0, color: "#69A8F7" },
    { name: "Business Done", value: 0, color: "#69A8F7" },
  ];
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full shadow-sm">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium text-black mb-2">Lead Funnel</div>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={funnelData} barSize={36} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 15, fill: "#222" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 50]} />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip cursor={{ fill: "#F3F4F6" }} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]}> 
            {funnelData?.length > 0 && funnelData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 