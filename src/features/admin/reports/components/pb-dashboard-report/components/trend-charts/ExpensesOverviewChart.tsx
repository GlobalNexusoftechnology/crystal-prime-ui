import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { TooltipProps } from "recharts";

interface ExpensesOverviewChartProps {
  data: {
    labels: string[];
    newProject: number[];
    completedProject: number[];
  };
}

type PayloadType = { name: string; value: number };

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props as TooltipProps<number, string> & {
    payload?: PayloadType[];
  };
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded shadow text-gray-900 text-base font-semibold border border-gray-200">
        {payload[0].name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

export const ExpensesOverviewChart: React.FC<ExpensesOverviewChartProps> = ({
  data,
}) => {
  const chartData = data.labels.map((label, idx) => ({
    name: label,
    new: data.newProject[idx] ?? 0,
    completed: data.completedProject[idx] ?? 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="font-semibold mb-2 flex items-center gap-4">
        Expenses Overview
        <span className="flex items-center gap-4 ml-auto">
          <span className="flex items-center gap-1 text-xs font-medium">
            <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>{" "}
            New Project
          </span>
          <span className="flex items-center gap-1 text-xs font-medium">
            <span className="w-3 h-3 rounded-full bg-orange-400 inline-block"></span>{" "}
            Completed Project
          </span>
        </span>
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="newGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#fb923c" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 14, fill: "#222" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis domain={[0, 50]} />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="completed"
            stroke="#fb923c"
            fill="url(#completedGradient)"
            strokeWidth={2}
            dot={false}
          />
          <Area
            type="monotone"
            dataKey="new"
            stroke="#6366f1"
            fill="url(#newGradient)"
            strokeWidth={2}
            dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }}
            activeDot={{ r: 7 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
