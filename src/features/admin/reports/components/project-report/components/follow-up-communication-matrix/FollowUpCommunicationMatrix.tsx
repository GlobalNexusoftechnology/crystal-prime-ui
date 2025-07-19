import { ProjectPerformanceReportResponse } from "@/services";

export function FollowUpCommunicationMatrix({ data }: { data: ProjectPerformanceReportResponse["data"]["followUpMatrix"] }) {
  if (!data) return null;
  return (
    <div className="border-b 2xl:border-[0.1vw] p-6 2xl:p-[1vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-4 2xl:mb-[1vw] font-medium">Follow-Up & Communication Matrix</h3>
      <div className="flex flex-col gap-6 2xl:gap-[2vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Total Follow-Ups</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.totalFollowUpsLogged ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Completed</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.followUpsCompleted ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Pending</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.pendingFollowUps ?? '-'}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-12 2xl:gap-[3vw]">
          <div className="flex flex-col">
            <span className="font-light">Missed/Delayed</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.missedOrDelayedFollowUps ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Avg Response Time</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.avgResponseTimeHours ?? '-'}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-light">Escalated Items</span>
            <span className="underline text-[1rem] 2xl:text-[1vw] font-medium">{data.escalatedItems ?? '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 