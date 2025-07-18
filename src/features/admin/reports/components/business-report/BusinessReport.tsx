import {
  FinancialSummary,
  LeadFunnelChart,
  LeadMetrics,
  NewLeadsChart,
  ProjectDeliveryPerformance,
  ProjectSnapshotChart,
  RevenueTrendChart,
  TeamStaffPerformance,
} from "./components";

export const BusinessReport: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Overall Business Analysis Report
        </h2>
        {/* <ProjectSearchFilter /> */}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r gap-8 2xl:gap-[2vw] 2xl:border-r-[0.1vw]">
          <LeadFunnelChart />
          <LeadMetrics />
          <TeamStaffPerformance />
        </div>
        <div className="flex flex-col gap-8 2xl:gap-[2vw]">
          <ProjectDeliveryPerformance />
          <FinancialSummary />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold mb-4">Monthly Trend Snapshot</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1">
            <ProjectSnapshotChart />
          </div>
          <div className="col-span-1">
            <NewLeadsChart />
          </div>
          <div className="col-span-2">
            <RevenueTrendChart />
          </div>
        </div>
      </div>{" "}
    </div>
  );
};
