import { BasicProjectInfo, CostBudgetAnalysisMetric, ProjectSearchFilter } from "./components";

export function ProjectReport() {
  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Project Performance Report
        </h2>
        <ProjectSearchFilter />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-6 2xl:gap-[1vw] border-r 2xl:border-r-[0.1vw]">
          <BasicProjectInfo />
          {/* <TaskSummary /> */}
        </div>
        <div className="flex flex-col gap-6 2xl:gap-[1vw]">
          <CostBudgetAnalysisMetric />
          {/* <FollowUpPerformance /> */}
        </div>
      </div>
    </div>
  );
}
