"use client";

import { IProjectDetailResponse } from "@/services";
import { ProjectCard } from "../project-card.tsx";



type Props = {
  projects: IProjectDetailResponse[];
  label: string;
  bgColor: string;
};

/**
 * ProjectStageSection: Column for a stage showing multiple projects.
 */
export const ProjectStageSection: React.FC<Props> = ({
  projects,
  label,
  bgColor,
}) => {
  return (
    <div className="flex flex-col gap-4 2xl:gap-[1vw] bg-white p-4 2xl:p-[1vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw] h-fit">
      <div className="flex justify-between items-center bg-customGray p-4 2xl:p-[0.75vw] border border-gray-300 rounded-lg 2xl:rounded-[0.5vw]">
        <h2 className="text-lg 2xl:text-[1.1vw] font-medium">{label}</h2>
        <span className="bg-primary text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.35vw] rounded-full">
          {projects.length}
        </span>
      </div>
      <div className="space-y-4 2xl:space-y-[1vw]">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} bgColor={bgColor} />
        ))}
      </div>
    </div>
  );
};
