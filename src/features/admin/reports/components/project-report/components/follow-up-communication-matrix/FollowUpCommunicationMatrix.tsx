import { ProjectPerformanceReportResponse } from "@/services";

export function FollowUpCommunicationMatrix({
  data,
}: {
  data: ProjectPerformanceReportResponse["data"]["followUpMatrix"];
}) {
  if (!data) return null;

  return (
    <div className="border-b border-gray-400  p-6 ">
      <h3 className="text-[1.1rem]  mb-6 font-semibold">
        Follow-Up & Communication Matrix
      </h3>

      <div className="flex flex-wrap gap-4  text-[0.9rem] ">
        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Total Follow-Ups</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.totalFollowUpsLogged ?? "-"}
          </span>
        </div>

        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Completed</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.followUpsCompleted ?? "-"}
          </span>
        </div>

        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Pending</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.pendingFollowUps ?? "-"}
          </span>
        </div>

        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Missed/Delayed</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.missedOrDelayedFollowUps ?? "-"}
          </span>
        </div>

        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Avg Response Time</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.avgResponseTimeHours ?? "-"}
          </span>
        </div>

        <div className="border border-gray-300  rounded-md p-4 ">
          <span className="block text-gray-500">Escalated Items</span>
          <span className="block underline font-medium text-black text-[1rem] ">
            {data.escalatedItems ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
