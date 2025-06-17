"use client";

import { useState } from "react";
import { Button, SearchBar } from "@/components";
import { ProjectStageSection } from "./components";
import { projectData } from "@/constants";
import { Breadcrumb } from "../breadcrumb";

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
  const [projects] = useState(projectData);

  const getProjectsByStage = (stage: "open" | "inProgress" | "completed") =>
    projects.filter((project) => project.stage === stage);

  return (
    <section className="flex flex-col gap-6 2xl:gap-[2vw] border border-gray-300 rounded-lg 2xl:rounded-[1vw] bg-white p-4 2xl:p-[2vw]">
      <Breadcrumb />
      <div className="flex md:flex-row flex-col gap-4 2xl:gap-[1.5vw] justify-between items-start md:items-center">
        <h1 className="text-2xl 2xl:text-[1.8vw] font-semibold">
          Project List
        </h1>
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
            projects={getProjectsByStage(stage).map((project) => ({
              id: parseInt(project.id.replace("#", "")),
              name: project.projectInfo.name,
              clientName: project.clientInfo.clientName,
              endDate: project.estimates.estimatedEnd,
              status: 0,
              totalTasks: 0,
              stage: project.stage as "open" | "inProgress" | "completed",
              slug: project.slug
            }))}
            label={stageLabels[stage]}
            bgColor={bgColors[stage]}
          />
        ))}
      </div>
    </section>
  );
}
