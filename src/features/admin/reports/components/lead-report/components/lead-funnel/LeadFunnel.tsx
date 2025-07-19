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

const funnelData = [
  { name: "New", value: 36, color: "#69A8F7" },
  { name: "Profile Sent", value: 35, color: "#69A8F7" },
  { name: "Quotation", value: 22, color: "#69A8F7" },
  { name: "Not Interested", value: 36, color: "#1746A2" },
  { name: "Call Me Later", value: 25, color: "#69A8F7" },
  { name: "Phone Not Received", value: 34, color: "#69A8F7" },
  { name: "Business Done", value: 34, color: "#69A8F7" },
];

export const LeadFunnel: React.FC = () => {
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
            {funnelData.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}; 