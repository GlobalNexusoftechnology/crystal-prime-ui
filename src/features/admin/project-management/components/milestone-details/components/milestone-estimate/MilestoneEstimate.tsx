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
    <div className="border-b p-4 2xl:p-[1vw]">
      <h3 className="text-[1.2vw] mb-4 2xl:mb-[1vw]">Project Estimates</h3>
      <div className="flex flex-col gap-8 2xl:gap-[2vw] text-sm 2xl:text-[0.875vw]">
        {/* Dates Section */}
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw] items-start">
          <div className="flex flex-col">
            <p className="font-light">Estimated Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneEstimateData.start_date}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Actual Start Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneEstimateData.actual_start}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-light">Estimated End Date</p>
            <p className="text-[1rem] 2xl:text-[1.1vw]">{milestoneEstimateData.end_date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
