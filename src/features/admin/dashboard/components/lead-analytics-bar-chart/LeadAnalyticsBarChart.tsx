"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface CustomTickProps {
  x?: number;
  y?: number;
  payload?: {
    value: string;
  };
}

// Sample data
const data = [
  { name: "New", Content: 30 },
  { name: "Profile sent", Content: 32 },
  { name: "Quotation", Content: 15 },
  { name: "Not Interested", Content: 30 },
  { name: "Call me later", Content: 20 },
  { name: "Phone Not Received", Content: 30 },
];

// Custom tick component for wrapping text
const CustomTick = ({ x = 0, y = 0, payload }: CustomTickProps) => {
  const words = payload?.value.split(" ") || [];
  return (
    <g transform={`translate(${x},${y})`}>
      {words.map((word, index) => (
        <text
          key={index}
          x={0}
          y={index * 12}
          textAnchor="middle"
          fontSize="10"
          fill="#666"
        >
          {word}
        </text>
      ))}
    </g>
  );
};

export function LeadAnalyticsBarChart() {
  return (
    <div className="bg-white py-4 2xl:py-[1vw] rounded-xl 2xl:rounded-[0.75vw] border border-[#E5E5E5] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 2xl:mb-[0.5vw] px-8 2xl:px-[2vw]">
        <h2 className="text-[1rem] 2xl:text-[1vw] font-semibold">Lead Analytics</h2>
        <div className="flex items-center space-x-2 text-sm 2xl:text-[0.875vw] text-gray-600">
          <div className="w-3 2xl:w-[0.75vw] h-3 2xl:h-[0.75vw] rounded-full bg-[#75B2FB]"></div>
          <span>Content</span>
        </div>
        <span className="text-sm 2xl:text-[0.875vw] text-gray-500">This Week</span>
      </div>

      {/* Bar Chart */}
      <ResponsiveContainer width="90%" height={220}>
        <BarChart data={data} margin={{ bottom: 8 }}>
          <XAxis
            dataKey="name"
            interval={0}
            tick={<CustomTick />}
            tickLine={false}
            axisLine={false}
          />
          <YAxis domain={[10, 50]} ticks={[10, 20, 30, 40, 50]} />
          <Tooltip />
          <Bar dataKey="Content" radius={[4, 4, 0, 0]} barSize={30}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.name === "Not Interested" ? "#054B9E" : "#75B2FB"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
