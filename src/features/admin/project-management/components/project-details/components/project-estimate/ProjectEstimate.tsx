import { IEstimates } from "@/constants";
import { formatIndiaTime } from "@/utils";
import React from "react";

export interface ProjectEstimateProps {
  projectEstimateData: IEstimates;
}

export function ProjectEstimate({ projectEstimateData }: ProjectEstimateProps) {
  return (
    <div className="border-b border-gray-400 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2rem] font-medium 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw]">
        Project Estimates
      </h3>
      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] text-[0.9rem] 2xl:text-[0.875vw]">
        {/* Dates Section */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Estimated Start Date</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectEstimateData.start_date ? formatIndiaTime(projectEstimateData.start_date, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Actual Start Date</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectEstimateData.actual_start ? formatIndiaTime(projectEstimateData.actual_start, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Estimated End Date</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectEstimateData.end_date ? formatIndiaTime(projectEstimateData.end_date, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Actual End Date</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
            {projectEstimateData.actual_end ? formatIndiaTime(projectEstimateData.actual_end, "toReadable") : "---"}
          </p>
        </div>

        {/* Cost Section */}
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Estimated Cost</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.estimated_cost}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Actual Cost</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.actual_cost ? projectEstimateData.actual_cost: "0"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Cost Of Labour</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.labour_cost ? projectEstimateData.labour_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Over Head Cost</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.overhead_cost ? projectEstimateData.overhead_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Additional Cost</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.extra_cost ? projectEstimateData.extra_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300 2xl:border-[0.1vw] rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] min-w-[200px] 2xl:min-w-[12vw] flex-1">
          <p className="font-light text-[0.9rem] 2xl:text-[0.875vw] mb-2 2xl:mb-[0.5vw]">Budget</p>
          <p className="break-words text-[1rem] 2xl:text-[1.1vw]">
          ₹ {projectEstimateData.budget ? projectEstimateData.budget : "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
