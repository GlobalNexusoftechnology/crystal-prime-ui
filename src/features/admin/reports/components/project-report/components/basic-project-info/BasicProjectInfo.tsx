import { ProjectPerformanceReportResponse } from "@/services";
import { getRandomColor } from "@/utils";

export function BasicProjectInfo({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["basicProjectInfo"];
}) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw] font-medium">
        Basic Project Info
      </h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Project Type</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.projectType ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Project Manager</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.projectManager?.name ?? "-"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Estimated Start Date</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.estimatedStartDate ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Estimated End Date</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.estimatedEndDate ?? "-"}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Assigned Team</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.assignedTeam.length ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Project Phase</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.projectPhase ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Current Status</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">
              {data.currentStatus ?? "-"}
            </span>
          </div>
        </div>
        <div>
          {(Array.isArray(data.assignedTeam) && data.assignedTeam.length > 0) ? (
            data.assignedTeam.map((member) => {
              const randomColor =
                typeof member.name === "string"
                  ? getRandomColor(member.name)
                  : "#000000";
              // Get initials from the name (e.g., 'AS' for 'Aaaftab Sheikh')
              const initials = member.name
                ? member.name
                    .split(" ")
                    .map((n) => n[0]?.toUpperCase() || "")
                    .join("")
                : "-";

              return (
                <div
                  key={member.id}
                  className="flex items-center gap-2 2xl:gap-[0.5vw]"
                >
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
    </div>
  );
}
