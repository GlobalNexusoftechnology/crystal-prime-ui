import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  value: number;
}

interface ProjectSnapshotChartProps {
  data: DataItem[];
  colors: string[];
}

export const ProjectSnapshotChart: React.FC<ProjectSnapshotChartProps> = ({ data, colors }) => (
  <div className="bg-white rounded-xl p-4 shadow border border-gray-100 flex flex-col items-center">
    <div className="w-full flex justify-between items-center mb-2">
      <span className="font-medium text-gray-700">Project Snapshot</span>
      <span className="text-xs text-gray-400">{data[0]?.value}% Projects</span>
    </div>
    <ResponsiveContainer width="100%" height={120}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={35}
          outerRadius={50}
          fill="#8884d8"
          label={({ name }) => name}
        >
          {data.map((entry, idx) => (
            <Cell key={`cell-${idx}`} fill={colors[idx % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
    <div className="flex gap-4 mt-2">
      {data.map((d, idx) => (
        <div key={d.name} className="flex items-center gap-1 text-xs">
          <span className={`inline-block w-3 h-3 rounded-full`} style={{ background: colors[idx] }}></span>
          <span className="text-gray-500">{d.name}</span>
        </div>
      ))}
    </div>
  </div>
); 