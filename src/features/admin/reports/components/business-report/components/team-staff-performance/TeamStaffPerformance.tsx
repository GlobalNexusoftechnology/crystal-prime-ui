import React from "react";

interface TeamStaffPerformanceProps {
  data: {
    activeStaffMembers: number;
    topPerformer: string;
    taskCompletionRate: number;
    delayedTasks: number;
    avgFollowupsPerStaff: number;
    documentContributions: number;
  };
}

export const TeamStaffPerformance: React.FC<TeamStaffPerformanceProps> = ({ data }) => {
  const metrics = [
    { label: "Active Staff Members", value: data.activeStaffMembers },
    { label: "Top Performer", value: data.topPerformer },
    { label: "Task Completion Rate", value: `${data.taskCompletionRate}%` },
    { label: "Delayed Tasks", value: data.delayedTasks },
    { label: "Avg Follow-ups per Staff", value: data.avgFollowupsPerStaff },
    { label: "Document Contributions", value: data.documentContributions },
  ];

  return (
    <div className="p-6  border-b border-gray-400 ">
      <div className="text-[1.1rem]  font-medium mb-6">
        Team & Staff Performance
      </div>
      <div className="flex flex-wrap gap-6  w-full">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col items-start gap-2  p-4  border border-gray-300  rounded-lg ">
            <div className="text-gray-800 font-light ">
              {metric.label}
            </div>
            <div className="text-[#1a2341] font-semibold underline text-[1rem]  mt-1 cursor-pointer">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
