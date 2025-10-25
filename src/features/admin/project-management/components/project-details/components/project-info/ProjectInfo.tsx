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
    <div className="border-b border-gray-400  p-4 ">
      <h3 className="text-[1.2rem] font-medium  mb-4 ">
        Project Info
      </h3>
      <div className="flex flex-wrap gap-4  text-[0.9rem] ">
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">
            Project Name
          </p>
          <p className="underline break-words text-[1rem] ">
            {projectInfoData.name}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">
            Type Of Project
          </p>
          <p className="break-words text-[1rem] ">
            {typesLoading
              ? "Loading..."
              : getProjectTypeName(projectInfoData.project_type)}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">
            Contact Person
          </p>
          <p className="underline break-words text-[1rem] ">
            {projectInfoData.contact_person}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  w-full">
          <p className="font-light text-[0.9rem]  mb-2 ">Description</p>
          <p className="break-words text-[1rem] ">
            {projectInfoData.description}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Created At</p>
          <p className="break-words text-[1rem] ">
            {projectInfoData.created_at}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Updated At</p>
          <p className="break-words text-[1rem] ">
            {projectInfoData.updated_at}
          </p>
        </div>
      </div>
    </div>
  );
}
