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
    <div className="border-b border-gray-400  p-6 ">
      <h3 className="text-[1.1rem] font-semibold  mb-4 ">
        Basic Project Info
      </h3>
      <div className="flex flex-wrap gap-4  text-[0.9rem] ">

        {/* Project Type */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Project Type</p>
          <p className="underline text-[1rem] ">{data.projectType ?? "-"}</p>
        </div>

        {/* Project Manager */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Project Manager</p>
          <p className="underline text-[1rem] ">{data.projectManager?.name ?? "-"}</p>
        </div>

        {/* Estimated Start Date */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Estimated Start Date</p>
          <p className="underline text-[1rem] ">{data.estimatedStartDate ?? "-"}</p>
        </div>

        {/* Estimated End Date */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Estimated End Date</p>
          <p className="underline text-[1rem] ">{data.estimatedEndDate ?? "-"}</p>
        </div>

        {/* Project Phase */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Project Phase</p>
          <p className="underline text-[1rem] ">{data.projectPhase ?? "-"}</p>
        </div>

        {/* Current Status */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Current Status</p>
          <p className="underline text-[1rem] ">{data.currentStatus ?? "-"}</p>
        </div>

        {/* Assigned Team Count */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light mb-2 ">Team Members</p>
          <p className="underline text-[1rem] ">{data.assignedTeam?.length ?? "-"}</p>
        </div>
      </div>

      {/* Assigned Team Member Chips */}
      <div className="mt-6  flex flex-wrap gap-2 ">
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
                  className="flex items-center justify-center p-2  w-10 h-10   text-white text-[0.9rem]   rounded-full"
                  style={{ backgroundColor: randomColor }}
                >
                  {initials}
                </p>
                <p className="px-3 py-1 text-[0.9rem]  ">
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
