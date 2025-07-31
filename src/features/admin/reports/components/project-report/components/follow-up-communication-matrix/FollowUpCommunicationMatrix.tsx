import { ProjectPerformanceReportResponse } from "@/services";

export function FollowUpCommunicationMatrix({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["followUpMatrix"];
}) {
  if (!data) return null;

  return (
    <div className="border rounded-lg p-6 2xl:p-[1.25vw]">
      <h3 className="text-xl 2xl:text-[1.25vw] mb-6 font-semibold">
        Follow-Up & Communication Matrix
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-[1.25vw] text-[0.9rem] 2xl:text-[0.875vw]">
        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Total Follow-Ups</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.totalFollowUpsLogged ?? "-"}
          </span>
        </div>

        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Completed</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.followUpsCompleted ?? "-"}
          </span>
        </div>

        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Pending</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.pendingFollowUps ?? "-"}
          </span>
        </div>

        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Missed/Delayed</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.missedOrDelayedFollowUps ?? "-"}
          </span>
        </div>

        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Avg Response Time</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.avgResponseTimeHours ?? "-"}
          </span>
        </div>

        <div className="border rounded-md p-4 2xl:p-[1vw]">
          <span className="block text-gray-500">Escalated Items</span>
          <span className="block underline font-medium text-black text-[1rem] 2xl:text-[1vw]">
            {data.escalatedItems ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
