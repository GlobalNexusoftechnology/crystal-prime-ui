import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { AiOutlineInfoCircle } from "react-icons/ai";

const COLORS = ["#219653", "#E0E0E0"];
const DELAY_RISK_COLOR: Record<string, string> = {
  Low: "#27AE60",
  Medium: "#F2994A",
  High: "#EB5757",
};

export const TimelineAnalysis: React.FC<{
  data: {
    daysSinceStart?: number;
    plannedDurationDays?: number;
    progressPercent?: number;
    delayRisk?: string;
  };
}> = ({ data }) => {
  if (!data) return null;
  const daysSinceStart = data.daysSinceStart ?? 0;
  const plannedDuration = data.plannedDurationDays ?? 0;
  const progress = data.progressPercent ?? 0;
  const delayRisk = (data.delayRisk as "Low" | "Medium" | "High") ?? "Low";
  const chartData = [
    { name: "Progress", value: daysSinceStart },
    { name: "Remaining", value: Math.max(plannedDuration - daysSinceStart, 0) },
  ];

  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <div className="bg-white rounded-xl border border-gray-300 p-6 flex flex-col items-center gap-8 w-full">
        <div className="flex items-center justify-between mb-2 w-full">
          <span className="font-semibold text-[1rem] 2xl:text-[1vw]">Timeline Analysis</span>
          <span className="ml-auto text-base font-medium flex items-center gap-2">
            Progress
            <span className="bg-green-500 text-white rounded px-3 py-1 text-sm font-semibold">
              {progress}% Completed
            </span>
          </span>
        </div>
        <div className="flex justify-between w-full">
          <div className="flex-1 min-w-[180px] max-w-[220px]">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={chartData}
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={90}
                  endAngle={-270}
                  paddingAngle={4}
                  dataKey="value"
                  isAnimationActive={false}
                >
                  {chartData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={COLORS[idx]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex-1 flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: COLORS[0] }}
                ></span>
                <span className="font-medium">Days Since Start</span>
                <span className="ml-auto text-gray-900 font-semibold">
                  {daysSinceStart} Days
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="inline-block w-4 h-4 rounded-full"
                  style={{ background: COLORS[1] }}
                ></span>
                <span className="font-medium">Planned Duration</span>
                <span className="ml-auto text-gray-900 font-semibold">
                  {plannedDuration} Days
                </span>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <AiOutlineInfoCircle className="text-gray-600 w-5 h-5" />
                <span className="font-medium">Delay Risk</span>
                <span
                  className={`ml-auto rounded px-3 py-1 text-sm font-semibold`}
                  style={{
                    background: DELAY_RISK_COLOR[delayRisk] || DELAY_RISK_COLOR.Low,
                    color: "#fff",
                  }}
                >
                  {delayRisk}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
