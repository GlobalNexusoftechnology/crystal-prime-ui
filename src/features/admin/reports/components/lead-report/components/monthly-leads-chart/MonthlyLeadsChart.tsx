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

// Default data for Jan-Dec
const defaultData = [
  { name: "Jan", value: 20 },
  { name: "Feb", value: 12 },
  { name: "Mar", value: 8 },
  { name: "Apr", value: 20 },
  { name: "May", value: 20 },
  { name: "Jun", value: 34 },
  { name: "Jul", value: 39 },
  { name: "Aug", value: 12 },
  { name: "Sep", value: 16 },
  { name: "Oct", value: 26 },
  { name: "Nov", value: 26 },
  { name: "Dec", value: 42 },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
}) =>
  active && payload && payload.length ? (
    <div className="bg-white px-2 py-1 rounded shadow text-xs text-gray-900 border border-gray-200">
      {payload[0].value}
    </div>
  ) : null;

interface MonthlyLeadsChartProps {
  data?: {
    labels: string[];
    leads: number[];
  };
}

export const MonthlyLeadsChart: React.FC<MonthlyLeadsChartProps> = ({ data }) => {
  const chartData = data ? data.labels.map((label, index) => ({
    name: label,
    value: data.leads[index] || 0
  })) : defaultData;
  
  // If we have 31 labels, it's likely day data, so we'll use default month data
  // If we have 12 labels, it's month data, so we'll use it as is
  const finalChartData = chartData.length === 31 ? defaultData : chartData;
  
  const maxValue = Math.max(...finalChartData.map(item => item.value));
  const yDomain: [number, number] = [0, Math.max(50, maxValue + 10)];
  
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full shadow-sm">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium text-black mb-2">
        Monthly Leads Chart
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart
          data={finalChartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="compactGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.7} />
              <stop offset="60%" stopColor="#a78bfa" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#fff" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 16, fill: "#222" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={yDomain}
          />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#a78bfa"
            strokeWidth={3}
            fill="url(#compactGradient)"
            fillOpacity={1}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
          {chartData.length > 0 && (
            <ReferenceDot
              x={chartData[chartData.length - 1]?.name}
              y={chartData[chartData.length - 1]?.value}
              r={8}
              fill="#fff"
              stroke="#a78bfa"
              strokeWidth={3}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
