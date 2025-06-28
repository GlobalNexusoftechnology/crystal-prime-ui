import { IProjectInfo } from "@/constants";
import React from "react";
import { useAllTypesQuery } from "@/services";

export interface ProjectInfoProps {
  projectInfoData: IProjectInfo;
}

export function ProjectInfo({ projectInfoData }: ProjectInfoProps) {
  // Fetch project types to get the name from ID
  const { allTypesData, isLoading: typesLoading } = useAllTypesQuery();

  // Helper function to get project type name from ID
  const getProjectTypeName = (typeId: string) => {
    if (!allTypesData || typesLoading) return typeId;
    const projectType = allTypesData.find((type) => type.id === typeId);
    return projectType ? projectType.name : typeId;
  };

  return (
    <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Project Info
      </h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Project Name
            </p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">
              {projectInfoData.name}
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Type Of Project
            </p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {typesLoading
                ? "Loading..."
                : getProjectTypeName(projectInfoData.project_type)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">
              Contact Person
            </p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">
              {projectInfoData.contact_person}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-sm 2xl:text-[0.875vw]">Description</p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectInfoData.created_at}
            </p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectInfoData.updated_at}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
