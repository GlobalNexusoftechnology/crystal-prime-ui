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
} from "recharts";

const data = [
  { name: "Apr", value: 2000000 },
  { name: "May", value: 1250000 },
  { name: "Jun", value: 500000 },
];

const formatRupees = (value: number) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value}`;
};

export const RevenueTrendChart: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4">
    <div className="font-semibold mb-2">Revenue Trend</div>
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
            <stop offset="60%" stopColor="#a78bfa" stopOpacity={0.25} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 14, fill: "#222" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[0, 5000000]}
          tick={{ fontSize: 14, fill: "#222" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatRupees}
        />
        <Tooltip formatter={formatRupees} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#a78bfa"
          strokeWidth={3}
          fill="url(#revenueGradient)"
          fillOpacity={1}
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
        />
        <ReferenceDot
          x="May"
          y={1250000}
          r={7}
          fill="#fff"
          stroke="#a78bfa"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
