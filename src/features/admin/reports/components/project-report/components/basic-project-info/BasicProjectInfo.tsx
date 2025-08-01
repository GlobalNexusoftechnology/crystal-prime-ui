"use client";

import { ProjectPerformanceReportResponse } from "@/services";
import { getRandomColor } from "@/utils";

export function BasicProjectInfo({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["basicProjectInfo"];
}) {
  if (!data) return null;

  return (
    <div className="border-b border-gray-400 2xl:border-b-[0.1vw] p-6 2xl:p-[1.5vw]">
      <h3 className="text-[1.1rem] font-semibold 2xl:text-[1.1vw] mb-4 2xl:mb-[1vw]">
        Basic Project Info
      </h3>
      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">

        {/* Project Type */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Project Type</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.projectType ?? "-"}</p>
        </div>

        {/* Project Manager */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Project Manager</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.projectManager?.name ?? "-"}</p>
        </div>

        {/* Estimated Start Date */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Estimated Start Date</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.estimatedStartDate ?? "-"}</p>
        </div>

        {/* Estimated End Date */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Estimated End Date</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.estimatedEndDate ?? "-"}</p>
        </div>

        {/* Project Phase */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Project Phase</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.projectPhase ?? "-"}</p>
        </div>

        {/* Current Status */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Current Status</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.currentStatus ?? "-"}</p>
        </div>

        {/* Assigned Team Count */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light mb-2 2xl:mb-[0.5vw]">Team Members</p>
          <p className="underline text-[1rem] 2xl:text-[1.1vw]">{data.assignedTeam?.length ?? "-"}</p>
        </div>
      </div>

      {/* Assigned Team Member Chips */}
      <div className="mt-6 2xl:mt-[2vw] flex flex-wrap gap-2 2xl:gap-[0.5vw]">
        {Array.isArray(data.assignedTeam) && data.assignedTeam.length > 0 ? (
          data.assignedTeam.map((member) => {
            const randomColor =
              typeof member.name === "string" ? getRandomColor(member.name) : "#000000";
            const initials = member.name
              ? member.name
                  .split(" ")
                  .map((n) => n[0]?.toUpperCase() || "")
                  .join("")
              : "-";

            return (
              <div key={member.id} className="flex items-center">
                <p
                  className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                  style={{ backgroundColor: randomColor }}
                >
                  {initials}
                </p>
                <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
                  {member.name}
                </p>
              </div>
            );
          })
        ) : (
          <span className="text-gray-500">No team members assigned.</span>
        )}
      </div>
    </div>
  );
}
