import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface ProjectSnapshotChartProps {
  data: DataItem[];
  colors: string[];
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: DataItem }[];
}) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload;
    return (
      <div className="bg-white border border-gray-200 rounded px-3 py-2 shadow text-gray-900 text-sm">
        <strong>{name}</strong>: {value}%
      </div>
    );
  }
  return null;
};

export const ProjectSnapshotChart: React.FC<ProjectSnapshotChartProps> = ({
  data,
  colors,
}) => {
  // Show the largest value as the center label (or customize as needed)

  // For the legend, show all statuses
  const legendItems = data.map((d, idx) => ({
    name: d.name,
    color: colors[idx % colors.length],
  }));

  return (
    <div
      className="bg-white rounded-xl p-4 border 2xl:border-[0.1vw] border-gray-300 flex flex-col items-center min-w-[260px] max-w-[320px]"
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
    >
      <div className="w-full flex justify-between items-center mb-2">
        <p className="font-medium text-lg text-gray-900">Project Snapshot</p>
      </div>
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: 180 }}
      >
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={2}
              label={false}
              isAnimationActive={false}
            >
              {data.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      {/* Legend */}
      <div className="flex flex-wrap gap-6 mt-4">
        {legendItems.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-base">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ background: item.color }}
            ></span>
            <span className="text-gray-900 font-medium">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
