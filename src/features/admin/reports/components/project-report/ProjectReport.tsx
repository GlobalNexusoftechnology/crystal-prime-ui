import {
  BasicProjectInfo,
  CostBudgetAnalysisMetric,
  ProjectSearchFilter,
  DocumentSummaryTable,
  FollowUpCommunicationMatrix,
  TaskMetricsChart,
  TimelineAnalysis,
} from "./components";

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
          <DocumentSummaryTable />
          <FollowUpCommunicationMatrix
            data={{
              totalFollowUps: 22,
              followUpsCompleted: 18,
              pendingFollowUps: 3,
              missedFollowUps: 1,
              avgResponseTime: "4.2 hours",
              escalatedItems: "2 (1 tech, 1 client)",
            }}
          />
        </div>
        <div className="flex flex-col gap-6 2xl:gap-[1vw]">
          <CostBudgetAnalysisMetric />
          <TaskMetricsChart
            data={{
              totalTasks: 40,
              completed: 26,
              inProgress: 32,
              overdue: 28,
              avgCompletionTime: "3.6 Days",
              reassignmentCount: 4,
              topPerformer: { name: "Meena", completed: 12 },
            }}
          />
            <TimelineAnalysis daysSinceStart={60} plannedDuration={90} delayRisk="Medium" />
        </div>
      </div>
    </div>
  );
}
