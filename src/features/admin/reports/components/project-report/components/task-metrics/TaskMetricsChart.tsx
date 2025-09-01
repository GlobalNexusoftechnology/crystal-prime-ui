"use client";

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

export function TaskMetricsChart({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["taskMetrics"];
}) {
  if (!data) return null;

  const barData = data.chart || [];
  const topPerformer = data.topPerformer as
    | { name?: string; tasksCompleted?: number }
    | undefined;

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h3 className="text-[1.1rem] 2xl:text-[1.1vw] font-semibold mb-4 2xl:mb-[1vw]">
        Task Metrics
      </h3>

      {/* Chart Section */}
      <div className="w-full border border-gray-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] 2xl:border-[0.05vw] bg-white">
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
              {barData?.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill="#69A8F7" />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Metrics Cards */}
      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mt-6 2xl:mt-[1.5vw] text-gray-800">
        {/* Avg Task Completion Time */}
        <div className="border border-gray-300 rounded-lg p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1 2xl:rounded-[0.5vw] 2xl:border-[0.05vw]">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Avg Task Completion Time</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw] font-medium">
            {data.avgTaskCompletionTime ?? "-"}
          </p>
        </div>

        {/* Task Reassignment Count */}
        <div className="border border-gray-300 rounded-lg p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1 2xl:rounded-[0.5vw] 2xl:border-[0.05vw]">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Task Reassignment Count</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw] font-medium">
            {data.taskReassignmentCount ?? "-"}
          </p>
        </div>

        {/* Top Performer */}
        <div className="border border-gray-300 rounded-lg p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1 2xl:rounded-[0.5vw] 2xl:border-[0.05vw]">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Top Performer</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw] font-medium">
            {topPerformer?.name || "-"} ({topPerformer?.tasksCompleted || 0} Tasks Completed)
          </p>
        </div>
      </div>
    </div>
  );
}
