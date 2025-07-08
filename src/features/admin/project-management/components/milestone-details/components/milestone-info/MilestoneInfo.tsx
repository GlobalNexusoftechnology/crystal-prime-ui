import React from "react";

export interface ProjectInfoProps {
  milestoneInfoData: {
    name: string;
    assigned_to: string;
    description: string;
    created_at: string;
    updated_at: string;
  };
}

export function MilestoneInfo({ milestoneInfoData }: ProjectInfoProps) {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">Milestone Info</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">Project Name</p>
            <p className="underline text-[1rem] 2xl:text-[1.1vw]">{milestoneInfoData.name}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">Assigned To</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneInfoData.assigned_to}</p>
          </div>
        </div>
        <div className="flex flex-col">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">Description</p>
          <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneInfoData.description}</p>
        </div>
        <div className="flex gap-12 2xl:gap-[3vw] items-center">
          <div className="flex flex-col">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">Created At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneInfoData.created_at}</p>
          </div>
          <div className="flex flex-col ">
            <p className="font-light text-[0.9rem] 2xl:text-[0.875vw]">Updated At</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneInfoData.updated_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
