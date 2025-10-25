import { IEstimates } from "@/constants";
import { formatIndiaTime } from "@/utils";
import React from "react";

export interface ProjectEstimateProps {
  projectEstimateData: IEstimates;
}

export function ProjectEstimate({ projectEstimateData }: ProjectEstimateProps) {
  return (
    <div className="border-b border-gray-400  p-4 ">
      <h3 className="text-[1.2rem] font-medium  mb-4 ">
        Project Estimates
      </h3>
      <div className="flex flex-wrap gap-4  text-[0.9rem] ">
        {/* Dates Section */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Estimated Start Date</p>
          <p className="break-words text-[1rem] ">
            {projectEstimateData.start_date ? formatIndiaTime(projectEstimateData.start_date, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Actual Start Date</p>
          <p className="break-words text-[1rem] ">
            {projectEstimateData.actual_start ? formatIndiaTime(projectEstimateData.actual_start, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Estimated End Date</p>
          <p className="break-words text-[1rem] ">
            {projectEstimateData.end_date ? formatIndiaTime(projectEstimateData.end_date, "toReadable") : "---"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Actual End Date</p>
          <p className="break-words text-[1rem] ">
            {projectEstimateData.actual_end ? formatIndiaTime(projectEstimateData.actual_end, "toReadable") : "---"}
          </p>
        </div>

        {/* Cost Section */}
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Estimated Cost</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.estimated_cost}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Actual Cost</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.actual_cost ? projectEstimateData.actual_cost: "0"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Cost Of Labour</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.labour_cost ? projectEstimateData.labour_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Over Head Cost</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.overhead_cost ? projectEstimateData.overhead_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Additional Cost</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.extra_cost ? projectEstimateData.extra_cost : "0"}
          </p>
        </div>
        <div className="border border-gray-300  rounded-lg  p-4  min-w-[200px]  flex-1">
          <p className="font-light text-[0.9rem]  mb-2 ">Budget</p>
          <p className="break-words text-[1rem] ">
          ₹ {projectEstimateData.budget ? projectEstimateData.budget : "0"}
          </p>
        </div>
      </div>
    </div>
  );
}
