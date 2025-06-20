import React from "react";

export interface ProjectEstimateProps {
  projectEstimateData: {
    estimatedStart: string;
    actualStart: string;
    estimatedEnd: string;
    actualEnd: string;
    estimatedCost: string;
    actualCost: string;
    labourCost: string;
    overheadCost: string;
    budget: string;
  };
}

export function ProjectEstimate({ projectEstimateData }: ProjectEstimateProps) {
  return (
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Project Estimates</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        {/* Dates Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.estimatedStart}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.actualStart}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Estimated End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.estimatedEnd}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.actualEnd}</p>
          </div>
        </div>

        {/* Cost Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.estimatedCost}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.actualCost}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Cost Of Labour</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.labourCost}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Over Head Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{projectEstimateData.overheadCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
