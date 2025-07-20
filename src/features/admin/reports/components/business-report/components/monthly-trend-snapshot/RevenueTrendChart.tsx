import React from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";

interface RevenueTrendChartProps {
  data: {
    labels: string[];
    revenue: (number | null)[];
  };
}

const formatRupees = (value: number) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value}`;
};

export const RevenueTrendChart: React.FC<RevenueTrendChartProps> = ({ data }) => {
  const chartData = data.labels.map((label, idx) => ({
    name: label,
    value: data.revenue[idx] ?? 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="font-semibold mb-2">Revenue Trend</div>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
              <stop offset="60%" stopColor="#a78bfa" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#222" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, Math.max(...chartData.map(d => d.value), 5000000)]} tickFormatter={formatRupees} />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip formatter={formatRupees} />
          <Area type="monotone" dataKey="value" stroke="#a78bfa" strokeWidth={3} fill="url(#revenueGradient)" fillOpacity={1} dot={{ r: 4 }} activeDot={{ r: 7 }} />
          <ReferenceDot x={chartData[chartData.length - 1]?.name} y={chartData[chartData.length - 1]?.value} r={7} fill="#fff" stroke="#a78bfa" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
