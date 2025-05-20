"use client";

/**
 * DocumentManagementChart Component
 *
 * This component displays a vertical bar chart representing document storage usage.
 * It uses Recharts to visualize the data, showing two categories:
 * - Free (available storage)
 * - Used (occupied storage)
 *
 * Features:
 * - Vertical layout bar chart
 * - X-axis with scale from 0 to 60 and 10-unit tick intervals
 * - Y-axis for category labels ("Free", "Used")
 * - Tooltip on hover
 * - Grid lines for clarity
 * - Responsive container for scaling on different devices
 *
 * Usage:
 * Typically used within the Document Management module to give a quick visual snapshot of storage usage.
 */

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
      <ResponsiveContainer width="100%" height={166}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ top: 10, right: 20, left: 30, bottom: 10 }}
        >
          <CartesianGrid vertical={true} horizontal={true} stroke="#E5E7EB" />
          <XAxis
            type="number"
            domain={[0, 60]}
            tickCount={7}
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="name"
            type="category"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Bar dataKey="value" isAnimationActive={false} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
