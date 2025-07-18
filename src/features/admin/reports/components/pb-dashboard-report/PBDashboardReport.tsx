import {
  BusinessOverview,
  ExpensesOverviewChart,
  LeadClientInterest,
  MonthlyLeadsChart,
  TeamPerformanceHighlights,
} from "./components";

export function PBDashboardReport() {
  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Public Business Dashboard
        </h2>
        {/* <ProjectSearchFilter /> */}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-8 border-r 2xl:border-r-[0.1vw]">
          <BusinessOverview />
          <div className="flex flex-col gap-4 2xl:gap-[1vw]">
            <h2 className="text-xl font-semibold mb-2">Trend Charts</h2>
            <ExpensesOverviewChart />
            <MonthlyLeadsChart />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <LeadClientInterest />
          <TeamPerformanceHighlights />
        </div>
      </div>
    </div>
  );
}
