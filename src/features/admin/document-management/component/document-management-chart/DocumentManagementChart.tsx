"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Free", value: 10, fill: "#93C5FD" },
  { name: "Used", value: 35, fill: "#1D4ED8" },
];

export function DocumentManagementChart() {
  return (
    <div className="w-full max-w-md p-4 bg-white border rounded-lg shadow-sm">
      <h2 className="text-sm font-medium text-gray-800 mb-2">Storage</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 20, right: 30, left: 40, bottom: 20 }}
          barCategoryGap="20%" // ensures equal spacing between categories
          barSize={26} // consistent bar height
        >
          <CartesianGrid stroke="#E5E7EB" horizontal vertical />
          <XAxis
            type="number"
            domain={[0, 60]}
            tickCount={7}
            tick={{ fontSize: 14, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 14, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            width={60}
          />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
