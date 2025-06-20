import React from "react";

export interface ProjectInfoProps {
  projectInfoData: {
    name: string;
    type: string;
    contactPerson: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function ProjectInfo({ projectInfoData }: ProjectInfoProps) {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Project Info</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Project Name</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.name}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Type Of Project</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.type}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Contact Person</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.contactPerson}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-sm 2xl:text-[0.875vw]">Description</p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.description}</p>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Created At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.createdAt}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-sm 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectInfoData.updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
