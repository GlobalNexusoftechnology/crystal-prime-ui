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

const data = [
  { name: "Apr", started: 20, completed: 10 },
  { name: "May", started: 40, completed: 30 },
  { name: "Jun", started: 25, completed: 45 },
];

export const ProjectSnapshotChart: React.FC = () => (
  <div className="bg-white rounded-2xl border border-gray-200 p-4">
    <div className="flex justify-between font-semibold mb-2">
      <span>
      Project Snapshot
        </span>
      <span className="ml-4 text-xs align-middle">
        <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1"></span>
        Started
        <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mx-2"></span>
        Completed
      </span>
    </div>
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="startedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fb923c" stopOpacity={0.5} />
            <stop offset="100%" stopColor="#fff" stopOpacity={0.1} />
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
          domain={[0, 50]}
        />
        <ReferenceLine y={0} stroke="#ccc" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="started"
          stroke="#6366f1"
          strokeWidth={3}
          fill="url(#startedGradient)"
          fillOpacity={1}
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
        />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="#fb923c"
          strokeWidth={3}
          fill="url(#completedGradient)"
          fillOpacity={1}
          dot={{ r: 4 }}
          activeDot={{ r: 7 }}
        />
        <ReferenceDot
          x="Jun"
          y={50}
          r={7}
          fill="#fff"
          stroke="#fb923c"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);
