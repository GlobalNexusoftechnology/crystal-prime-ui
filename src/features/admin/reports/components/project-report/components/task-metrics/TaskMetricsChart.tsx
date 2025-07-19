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
  ReferenceLine,
} from "recharts";
import { ProjectPerformanceReportResponse } from "@/services";

export function TaskMetricsChart({ data }: { data: ProjectPerformanceReportResponse["data"]["taskMetrics"] }) {
  if (!data) return null;
  const barData = data.chart || [];
  const topPerformer = data.topPerformer as { name?: string; tasksCompleted?: number } | undefined;
  return (
    <div className="border-b 2xl:border-[0.1vw]">
      <div className="bg-white rounded-xl p-6 2xl:p-[1.5vw] w-full">
        <div className="flex flex-col p-4 2xl:p-[1vw] border rounded-xl 2xl:rounded-[0.75vw] 2xl:border-[0.1vw]">
          <div className="mb-4 2xl:mb-[1vw]">
            <span className="font-semibold text-[1.1rem] 2xl:text-[1.1vw] text-gray-900">
              Task Metrics
            </span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData} barSize={40}>
              <XAxis
                dataKey="label"
                tick={{ fontSize: 16, fill: "#222" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 50]} />
              <ReferenceLine y={0} stroke="#ccc" />
              <Tooltip cursor={{ fill: "#F3F4F6" }} />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                <LabelList
                  dataKey="value"
                  position="top"
                  style={{ fontWeight: 600, fontSize: 18, fill: "#222" }}
                />
                {barData.map((entry: { label: string; value: number }, idx: number) => (
                  <Cell key={`cell-${idx}`} fill="#69A8F7" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap gap-8 2xl:gap-[2vw] mt-8 2xl:mt-[2vw] text-gray-700 font-medium">
          <div>
            <div className="font-light 2xl:text-[1vw]">Avg Task Completion Time</div>
            <div className="underline cursor-pointer font-medium text-[1rem] 2xl:text-[1vw]">
              {data.avgTaskCompletionTime ?? '-'}
            </div>
          </div>
          <div>
            <div className="font-light 2xl:text-[1vw]">Task Reassignment Count</div>
            <div className="underline cursor-pointer font-medium text-[1rem] 2xl:text-[1vw]">
              {data.taskReassignmentCount ?? '-'}
            </div>
          </div>
        </div>
        <div className="mt-8 2xl:mt-[2vw] text-gray-900 font-light 2xl:text-[1vw]">
          Top Performer
          <br />
          <span className="font-medium text-[1rem] 2xl:text-[1vw]">
            {topPerformer?.name || "-"} ({topPerformer?.tasksCompleted || 0} Tasks Completed)
          </span>
        </div>
      </div>
    </div>
  );
} 