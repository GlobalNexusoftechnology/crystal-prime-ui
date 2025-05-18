"use client";

import { HorizontalTreeDotIcon } from "@/features";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "In Progress", value: 70 },
  { name: "Completed", value: 30 },
];

const COLORS = ["#75B2FB", "#054B9E"];

export function ProjectSnapshotDonutChart() {
  return (
    <div className="flex flex-col bg-white p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-gray-300 rounded-xl 2xl:rounded-[0.75vw]">
      {/* Title */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-[1rem] 2xl:text-[1vw]">
          Project Snapshot
        </h2>
        <HorizontalTreeDotIcon className="w-8 h-8 2xl:w-[2vw] 2xl:h-[2vw]" />
      </div>

      {/* Chart with adjusted viewbox */}
      <div className="flex justify-center items-center">
        <PieChart width={245} height={208}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
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
      </div>

      {/* Custom Legend */}
      <div className="flex justify-center gap-2 2xl:gap-[0.5vw] ">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center gap-1 2xl:gap-[0.25vw]">
            <span
              className="w-3 2xl:w-[0.75vw] h-3 2xl:h-[0.75vw] rounded-full inline-block"
              style={{ backgroundColor: COLORS[index] }}
            ></span>
            <span className="text-sm 2xl:text-[0.875vw] text-[#054B9E]">
              {entry.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
