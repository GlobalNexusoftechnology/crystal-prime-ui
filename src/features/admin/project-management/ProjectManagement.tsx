"use client";

import { useState } from "react";
import { Button, SearchBar } from "@/components";
import { ProjectStageSection } from "./components";

const sampleProjects = [
  {
    id: 1,
    name: "E-Commerce App Development",
    clientName: "Nisha Sharma",
    endDate: "20 / 02 / 2022",
    status: 0,
    totalTasks: 10,
    stage: "open",
  },
  {
    id: 2,
    name: "ERP App Development",
    clientName: "Aman Verma",
    endDate: "10 / 03 / 2022",
    status: 5,
    totalTasks: 10,
    stage: "inProgress",
  },
  {
    id: 3,
    name: "Portfolio Website",
    clientName: "Rina Das",
    endDate: "05 / 01 / 2022",
    status: 10,
    totalTasks: 10,
    stage: "completed",
  },
] as const;

const stageLabels = {
  open: "Open Projects",
  inProgress: "In Progress Projects",
  completed: "Completed Projects",
};

const bgColors = {
  open: "bg-aqua",
  inProgress: "bg-skyBlue",
  completed: "bg-darkGreen",
};

export function ProjectManagement() {
  const [projects] = useState(sampleProjects);

  const getProjectsByStage = (stage: "open" | "inProgress" | "completed") =>
    projects.filter((project) => project.stage === stage);

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <div className="flex md:flex-row flex-col gap-4 2xl:gap-[1.5vw] justify-between items-start md:items-center">
        <h1 className="text-2xl 2xl:text-[1.8vw] font-semibold">Project List</h1>
        <div className="w-full md:w-auto flex gap-4 2xl:gap-[1vw] flex-col md:flex-row items-center">
          <Button
            title="Add New Project"
            variant="primary-outline"
            width="w-full md:w-fit"
          />
          <SearchBar
            onSearch={(query) => {
              console.log("Searching:", query);
            }}
            bgColor="white"
            width="w-full min-w-[12rem] md:w-[25vw] 2xl:w-[20vw]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 2xl:gap-[2vw]">
        {(["open", "inProgress", "completed"] as const).map((stage) => (
          <ProjectStageSection
            key={stage}
            projects={getProjectsByStage(stage)}
            label={stageLabels[stage]}
            bgColor={bgColors[stage]}
          />
        ))}
      </div>
    </section>
  );
}
