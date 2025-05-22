/**
 * TaskManagementCard Component
 *
 * This component serves as a container for daily task-related content.
 * It wraps the `DailyTaskCards` component inside a styled box to display
 * the user's daily tasks or task list in the Task Management section.
 */

import React from "react";
import { DailyTaskCards } from "./DailyTaskCards";

export function TaskManagementCard() {
  return (
    <div className="">
      {/* Outer container with a light background and rounded corners */}
      <div className="bg-[#F8F8F8] rounded-xl">
        {/* Daily task cards content */}
        <DailyTaskCards />
      </div>
    </div>
  );
}
