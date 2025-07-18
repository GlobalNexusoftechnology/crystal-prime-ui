import React from "react";

export interface FollowUpCommunicationMatrixData {
  totalFollowUps: number;
  followUpsCompleted: number;
  pendingFollowUps: number;
  missedFollowUps: number;
  avgResponseTime: string;
  escalatedItems: string;
}

export interface FollowUpCommunicationMatrixProps {
  data: FollowUpCommunicationMatrixData;
}

export function FollowUpCommunicationMatrix({
  data,
}: FollowUpCommunicationMatrixProps) {
  return (
    <div className="border-b 2xl:border-[0.1vw]">
      <div className="border-b 2xl:border-[0.1vw] p-4 2xl:p-[1vw]">
        <h3 className="text-[1.2rem] 2xl:text-[1.2vw] mb-4 2xl:mb-[1vw] font-semibold">
          Follow-Up & Communication Matrix
        </h3>
        <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
          <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
            <div className="flex flex-col">
              <span className="font-light">Total Follow-ups Logged</span>
              <span className="underline text-[1rem] 2xl:text-[1.1vw] cursor-pointer">
                {data.totalFollowUps}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Follow-ups Completed</span>
              <span className="underline text-[1rem] 2xl:text-[1.1vw] cursor-pointer">
                {data.followUpsCompleted}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Pending Follow-ups</span>
              <span className="text-[1rem] 2xl:text-[1.1vw]">
                {data.pendingFollowUps}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
            <div className="flex flex-col">
              <span className="font-light">Missed / Delayed Follow-ups</span>
              <span className="underline text-[1rem] 2xl:text-[1.1vw] cursor-pointer">
                {data.missedFollowUps}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Avg Response Time</span>
              <span className="underline text-[1rem] 2xl:text-[1.1vw] cursor-pointer">
                {data.avgResponseTime}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-light">Escalated Items</span>
              <span className="underline text-[1rem] 2xl:text-[1.1vw] cursor-pointer">
                {data.escalatedItems}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
