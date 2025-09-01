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
    <div className="p-6 2xl:p-[1.5vw] border-b border-gray-400 2xl:border-b-[0.1vw]">
      <div className="text-[1.1rem] 2xl:text-[1.1vw] font-medium mb-6">
        Team & Staff Performance
      </div>
      <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw] w-full">
        {metrics.map((metric, idx) => (
          <div key={idx} className="flex flex-col items-start gap-2 2xl:gap-[0.5vw] p-4 2xl:p-[1vw] border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw]">
            <div className="text-gray-800 font-light 2xl:text-[1vw]">
              {metric.label}
            </div>
            <div className="text-[#1a2341] font-semibold underline text-[1rem] 2xl:text-[1vw] mt-1 cursor-pointer">
              {metric.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
