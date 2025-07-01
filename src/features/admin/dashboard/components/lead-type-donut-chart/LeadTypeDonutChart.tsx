"use client";

import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Website", value: 120 },
  { name: "Completed", value: 80 },
  { name: "SEO", value: 100 },
  { name: "Training", value: 60 },
];

const COLORS = ["#D9D9D9", "#4F8CFF", "#2DB77B", "#E28A18"];

export function LeadTypeDonutChart() {
  return (
    <div className="flex flex-col bg-white p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-300 rounded-xl 2xl:rounded-[0.75vw] min-w-[340px]">
      {/* Title and controls */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-[1rem] 2xl:text-[1vw]">Lead Type</h2>
        <div className="flex items-center gap-2">
          {/* Dropdown placeholder */}
          <div className="text-xs 2xl:text-[0.85vw] text-gray-500 border border-gray-200 rounded px-2 py-1 cursor-pointer select-none">
            This Week ▼
          </div>
          {/* Menu (three dots) placeholder */}
          <div className="w-6 h-6 flex items-center justify-center cursor-pointer">
            <span className="text-gray-400 text-xl">•••</span>
          </div>
        </div>
      </div>
      {/* Chart and legend */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-4">
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={65}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={3}
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
        {/* Custom Legend */}
        <div className="flex flex-wrap gap-2 ml-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full inline-block"
                style={{ backgroundColor: COLORS[index] }}
              ></span>
              <span className="text-sm text-gray-700">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
