import {
  FollowUpPerformance,
  MilestoneFileActivity,
  StaffInfoCard,
  StaffSearchFilter,
  TaskSummary,
} from "./components";

export function StaffReport() {
  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Staff Performance Report
        </h2>
        <StaffSearchFilter />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r 2xl:border-r-[0.1vw]">
          <StaffInfoCard />
          <TaskSummary />
        </div>
        <div className="flex flex-col">
          <MilestoneFileActivity />
          <FollowUpPerformance />
        </div>
      </div>
    </div>
  );
}
