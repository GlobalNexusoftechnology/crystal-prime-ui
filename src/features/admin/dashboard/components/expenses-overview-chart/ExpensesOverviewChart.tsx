import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface DataItem {
  month: string;
  income: number;
  expense: number;
}

interface ExpensesOverviewChartProps {
  data: DataItem[];
}

export const ExpensesOverviewChart: React.FC<ExpensesOverviewChartProps> = ({
  data,
}) => (
  <div className="bg-white rounded-xl p-4 shadow border border-gray-100">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-gray-700">Expenses Overview</span>
      <span className="text-xs text-gray-400">Yearly</span>
    </div>
    <ResponsiveContainer width="100%" height={150}>
      <AreaChart data={data}>
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Area type="monotone" dataKey="income" stroke="#6366F1" fill="#E0E7FF" />
        <Area type="monotone" dataKey="expense" stroke="#F59E42" fill="#FEF3C7" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
); 