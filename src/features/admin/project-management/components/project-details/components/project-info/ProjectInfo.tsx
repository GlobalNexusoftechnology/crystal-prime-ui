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
    const projectType = allTypesData?.data?.list?.find((type) => type.id === typeId);
    return projectType ? projectType.name : typeId;
  };

  return (
    <div className="border-b border-gray-400 2xl:border-[0.05vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] font-medium 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Project Info
      </h3>
      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
            Project Name
          </p>
          <p className="underline break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.name}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
            Type Of Project
          </p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {typesLoading
              ? "Loading..."
              : getProjectTypeName(projectInfoData.project_type)}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">
            Contact Person
          </p>
          <p className="underline break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.contact_person}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] w-full">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Description</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.description}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Created At</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.created_at}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.05vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Updated At</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectInfoData.updated_at}
          </p>
        </div>
      </div>
    </div>
  );
}
