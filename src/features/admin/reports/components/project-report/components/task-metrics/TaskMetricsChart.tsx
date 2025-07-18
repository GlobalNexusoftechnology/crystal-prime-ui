import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";

interface TaskMetricsData {
  totalTasks: number;
  completed: number;
  inProgress: number;
  overdue: number;
  avgCompletionTime: string;
  reassignmentCount: number;
  topPerformer: { name: string; completed: number };
}

interface TaskMetricsChartProps {
  data: TaskMetricsData;
}

const chartData = (data: TaskMetricsData) => [
  { name: "Total Tasks", value: data.totalTasks, color: "#1746A2" },
  { name: "Completed", value: data.completed, color: "#69A8F7" },
  { name: "In Progress", value: data.inProgress, color: "#69A8F7" },
  { name: "Overdue", value: data.overdue, color: "#69A8F7" },
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { value: number }[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded px-3 py-2 shadow text-gray-900 text-sm font-semibold">
        {payload[0].value} Task
      </div>
    );
  }
  return null;
};

export const TaskMetricsChart: React.FC<TaskMetricsChartProps> = ({ data }) => {
  const barData = chartData(data);
  return (
    <div className="border-b 2xl:border-b-[0.1vw]">
      <div className="bg-white rounded-xl p-6 2xl:p-[1.5vw] w-full max-w-xl 2xl:max-w-[36vw]">
        <div className="flex flex-col p-4 2xl:p-[1vw] border rounded-xl 2xl:rounded-[0.75vw] 2xl:border-[0.1vw]">

        <div className="mb-4 2xl:mb-[1vw]">
          <span className="font-semibold text-[1.1rem] 2xl:text-[1.1vw] text-gray-900">
            Task Metrics
          </span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} barSize={40}>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 16, fill: "#222" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis hide domain={[10, 50]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F3F4F6" }} />
            <Bar dataKey="value" radius={[6, 6, 0, 0]}>
              <LabelList
                dataKey="value"
                position="top"
                content={({ value }) => `${value} Task`}
                style={{ fontWeight: 600, fontSize: 18, fill: "#222" }}
              />
              {barData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-8 2xl:gap-[2vw] mt-8 2xl:mt-[2vw] text-gray-700 font-medium">
          <div>
            <div className="font-light">Avg Task Completion Time</div>
            <div className="underline cursor-pointer font-medium text-[1rem] 2xl:text-[1vw]">
              {data.avgCompletionTime}
            </div>
          </div>
          <div>
            <div className="font-light">Task Reassignment Count</div>
            <div className="underline cursor-pointer font-medium text-[1rem] 2xl:text-[1vw]">
              {data.reassignmentCount}
            </div>
          </div>
        </div>
        <div className="mt-8 2xl:mt-[2vw] text-gray-900 font-light">
          Top Performer
          <br />
          <span className="font-medium text-[1rem] 2xl:text-[1vw]">
            {data.topPerformer.name} ({data.topPerformer.completed} Tasks
            Completed)
          </span>
        </div>
      </div>
    </div>
  );
};
