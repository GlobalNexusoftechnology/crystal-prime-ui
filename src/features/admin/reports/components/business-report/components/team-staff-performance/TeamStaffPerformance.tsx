import React from "react";

const metrics = [
  { label: "Active Staff Members", value: "15" },
  { label: "Top Performer", value: "Meena" },
  { label: "Task Completion Rate", value: "87%" },
  { label: "Delayed Tasks", value: "12%" },
  { label: "Avg Follow-ups per Staff", value: "19" },
  { label: "Document Contributions", value: "12" },
];

export const TeamStaffPerformance: React.FC = () => (
  <div className="border-b p-4">
    <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-4">Team & Staff Performance</div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-6 w-full">
      {metrics.map((metric, idx) => (
        <div key={idx}>
          <div className="text-gray-800 font-light 2xl:text-[1vw]">{metric.label}</div>
          <div className="text-[#1a2341] font-semibold underline text-[1rem] 2xl:text-[1vw] mt-1 cursor-pointer">{metric.value}</div>
        </div>
      ))}
    </div>
  </div>
);