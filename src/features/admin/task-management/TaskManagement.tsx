/**
 * TaskManagement Component
 * 
 * This component renders the Task Management section of the UI. It includes:
 * - A heading title
 * - A row of analytical summary cards (showing insights or metrics)
 * - A button to add a new task
 * - A card for managing tasks (TaskManagementCard)
 */

import { analyticalCards } from "@/constants";
import { AnalyticalCard } from "../analytical-card";
import { Button } from "@/components";
import { TaskManagementCard } from "./components";

export function TaskManagement() {
  return (
    <section className="flex flex-col gap-6 md:gap-8 2xl:gap-[2.5vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] bg-white p-4 2xl:p-[1vw]">
      
      {/* Section Header */}
      <div className="flex flex-col gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <h1 className="text-xl 2xl:text-[1.25vw] font-medium">
          Task Management
        </h1>
      </div>

      {/* Summary Cards and Add Task Button */}
      <div className="grid grid-cols-1 gap-4 2xl:gap-[1vw]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 2xl:gap-[1vw] flex-wrap px-4 2xl:px-[1vw]">
          {/* Render up to 4 analytical cards */}
          {analyticalCards.slice(0, 4).map((card, index) => (
            <AnalyticalCard key={index} data={card} />
          ))}

          {/* Button to add a new task */}
          <div className="flex flex-col justify-end">
            <Button type="button" title="Add Task" variant="primary-outline" />
          </div>
        </div>
      </div>

      {/* Task Management Section */}
      <div className="gap-2 2xl:gap-[0.5vw] px-4 2xl:px-[1vw]">
        <TaskManagementCard/>
      </div>

    </section>
  );
}
