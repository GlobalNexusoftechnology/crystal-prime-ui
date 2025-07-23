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

interface MonthlyLeadsChartProps {
  data: {
    labels: string[];
    leads: number[];
  };
}

type PayloadType = { name: string; value: number };

const CustomTooltip = (props: TooltipProps<number, string>) => {
  const { active, payload } = props as TooltipProps<number, string> & { payload?: PayloadType[] };
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 rounded shadow text-gray-900 text-base font-semibold border border-gray-200">
        {payload[0].name}: {payload[0].value}
      </div>
    );
  }
  return null;
};

export const MonthlyLeadsChart: React.FC<MonthlyLeadsChartProps> = ({ data }) => {
  const chartData = data.labels.map((label, idx) => ({
    name: label,
    value: data.leads[idx] ?? 0,
  }));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4">
      <div className="font-semibold mb-2">Monthly Leads Chart</div>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#a78bfa" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 14, fill: "#222" }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 50]} />
          <ReferenceLine y={0} stroke="#ccc" />
          <Tooltip content={<CustomTooltip />} />
          <Area type="monotone" dataKey="value" stroke="#a78bfa" fill="url(#leadsGradient)" strokeWidth={2} dot={{ r: 4, stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 7 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
