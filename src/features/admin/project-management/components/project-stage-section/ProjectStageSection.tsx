"use client";

import { IProjectDetailResponse } from "@/services";
import { ProjectCard } from "../project-card.tsx";



type Props = {
  projects: IProjectDetailResponse[];
  label: string;
  bgColor: string;
  canViewProject?: boolean;
  canEditProject?: boolean;
  canDeleteProject?: boolean;
};

/**
 * ProjectStageSection: Column for a stage showing multiple projects.
 */
export const ProjectStageSection: React.FC<Props> = ({
  projects,
  label,
  bgColor,
  canViewProject = true,
  canEditProject = true,
  canDeleteProject = true,
}) => {
  return (
    <div className="flex flex-col gap-4  bg-white p-4  border border-gray-300 rounded-lg  h-fit">
      <div className="flex justify-between items-center bg-customGray p-4  border border-gray-300 rounded-lg ">
        <h2 className="text-lg  font-medium">{label}</h2>
        <span className="bg-primary text-white text-[0.9rem]   px-3  py-1  rounded-full">
          {projects.length}
        </span>
      </div>
      <div className="space-y-4 ">
        {projects?.length > 0 && projects?.map((project, index) => (
          <ProjectCard 
            key={index} 
            project={project} 
            bgColor={bgColor}
            canViewProject={canViewProject}
            canEditProject={canEditProject}
            canDeleteProject={canDeleteProject}
          />
        ))}
      </div>
    </div>
  );
};
