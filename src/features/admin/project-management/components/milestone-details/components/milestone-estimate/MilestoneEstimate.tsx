import React from "react";

export interface MilestoneEstimateProps {
  milestoneEstimateData: {
    start_date: string;
    actual_start: string;
    end_date: string;
  };
}

export function MilestoneEstimate({ milestoneEstimateData }: MilestoneEstimateProps) {
  return (
    <div className="border-b p-4 ">
      <h3 className="text-[1.2rem]  mb-4 ">Milestone Estimates</h3>
      <div className="flex flex-col gap-8  text-[0.9rem] ">
        {/* Dates Section */}
        <div className="flex flex-wrap gap-12  items-start">
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light">Estimated Start Date</p>
            <p className="text-[1rem] ">{milestoneEstimateData.start_date}</p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light">Actual Date</p>
            <p className="text-[1rem] ">{milestoneEstimateData.actual_start}</p>
          </div>
          <div className="flex flex-col border border-gray-300  rounded-lg  p-4 ">
            <p className="font-light">Estimated End Date</p>
            <p className="text-[1rem] ">{milestoneEstimateData.end_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
