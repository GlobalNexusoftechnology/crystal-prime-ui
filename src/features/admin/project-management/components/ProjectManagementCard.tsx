/**
 * TaskManagementCard Component
 *
 * This component serves as a container for daily project-related content.
 * It wraps the `ProjectDailyTaskCards` component inside a styled box to display
 * the user's daily project or project list in the Project Management section.
 */

import React from "react";
import { ProjectDailyTaskCard } from "./ProjectDailyTaskCard";


export function ProjectManagementCard() {
  return (
    <div className="">
      {/* Outer container with a light background and rounded corners */}
      <div className="bg-[#F8F8F8] rounded-xl">
        {/*project Daily task cards content */}
        <ProjectDailyTaskCard />
      </div>
    </div>
  );
}
