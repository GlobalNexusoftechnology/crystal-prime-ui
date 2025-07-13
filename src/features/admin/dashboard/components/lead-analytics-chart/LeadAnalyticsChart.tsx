import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface LeadAnalyticsChartProps {
  data: DataItem[];
}

export const LeadAnalyticsChart: React.FC<LeadAnalyticsChartProps> = ({ data }) => (
  <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-gray-700">Lead Analytics</span>
      <span className="text-xs text-gray-400">This Week</span>
    </div>
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data}>
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Bar dataKey="value" fill="#3B82F6" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
); 