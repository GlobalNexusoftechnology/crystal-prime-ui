import React from "react";
import { IProjectInfo } from "@/constants";

// Placeholder for team members
const teamMembers = [
  { id: 1, name: "Ramesh Gupta", initials: "RM" },
  { id: 2, name: "Ramesh Gupta", initials: "RM" },
  { id: 3, name: "Ramesh Gupta", initials: "RM" },
  { id: 4, name: "Ramesh Gupta", initials: "RM" },
  { id: 5, name: "Ramesh Gupta", initials: "RM" },
];

export function BasicProjectInfo() {
  // Mock data for demonstration
  const projectInfo: Partial<IProjectInfo> = {
    name: "Sample Project",
    project_type: "Software Development",
    contact_person: "Priya D",
    description: "",
    created_at: "24-02-2021 09:00 AM",
    updated_at: "24-02-2021 09:00 AM",
  };
  const estimatedStartDate = "24-02-2021 09:00 AM";
  const actualStartDate = "24-02-2021 09:00 AM";
  const estimatedEndDate = "24-02-2021 09:00 AM";
  const projectPhase = "Development & Integration";
  const currentStatus = "Development & Integration";

  return (
    <div className="border-b 2xl:border-b-[0.1vw]">
      <div className="p-6 2xl:p-[2vw] bg-white rounded-lg 2xl:rounded-[1vw]">
        <h2 className="text-xl 2xl:text-[1.25vw] font-medium mb-6 2xl:mb-[1vw]">
          Basic Project Info
        </h2>
        <div className="flex flex-wrap gap-x-24 2xl:gap-x-[6vw] gap-y-10 2xl:gap-y-[2vw] text-[1.1rem] 2xl:text-[1vw]">
          <div>
            <p className="2xl:text-[0.95vw]">Project Type</p>
            <p className="underline cursor-pointer font-medium 2xl:text-[1vw]">
              {projectInfo.project_type}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Project Manager</p>
            <p className="underline cursor-pointer font-medium 2xl:text-[1vw]">
              {projectInfo.contact_person}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Estimated start Date</p>
            <p className="text-gray-900 font-medium 2xl:text-[1vw]">
              {estimatedStartDate}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Actual start Date</p>
            <p className="text-gray-900 font-medium 2xl:text-[1vw]">
              {actualStartDate}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Estimated End Date</p>
            <p className="text-gray-900 font-medium 2xl:text-[1vw]">
              {estimatedEndDate}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Assigned Team</p>
            <p className="underline cursor-pointer font-medium 2xl:text-[1vw]">
              5 Members
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Project Phase</p>
            <p className="underline cursor-pointer font-medium 2xl:text-[1vw]">
              {projectPhase}
            </p>
          </div>
          <div>
            <p className="2xl:text-[0.95vw]">Current Status</p>
            <p className="underline cursor-pointer font-medium 2xl:text-[1vw]">
              {currentStatus}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 2xl:gap-[2vw] mt-4 2xl:mt-[1vw]">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 2xl:gap-[1vw]"
            >
              <div className="w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] rounded-full bg-primary flex items-center justify-center text-white font-semibold text-lg 2xl:text-[1vw]">
                {member.initials}
              </div>
              <span className="underline cursor-pointer text-lg 2xl:text-[1vw]">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
