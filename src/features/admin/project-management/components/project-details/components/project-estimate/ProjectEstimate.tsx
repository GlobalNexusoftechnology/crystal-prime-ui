import { IEstimates } from "@/constants";
import { formattingDate } from "@/utils";
import React from "react";

export interface ProjectEstimateProps {
  projectEstimateData: IEstimates;
}

export function ProjectEstimate({ projectEstimateData }: ProjectEstimateProps) {
  return (
    <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Project Estimates
      </h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        {/* Dates Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.start_date ? formattingDate(projectEstimateData.start_date, "toReadable") : "---"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.actual_start ? formattingDate(projectEstimateData.actual_start, "toReadable") : "---"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Estimated End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.end_date ? formattingDate(projectEstimateData.end_date, "toReadable") : "---"}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.actual_end ? formattingDate(projectEstimateData.actual_end, "toReadable") : "---"}
            </p>
          </div>
        </div>

        {/* Cost Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.estimated_cost}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.actual_cost}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Cost Of Labour</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.labour_cost}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Over Head Cost</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.overhead_cost}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Budget</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">
              {projectEstimateData.budget}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
