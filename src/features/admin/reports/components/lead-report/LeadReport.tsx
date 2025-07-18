import {
  LeadFunnel,
  LeadFunnelChart,
  LeadMetricsGrid,
  MonthlyLeadsChart,
  SourceWiseConversionRate,
  StaffConversionPerformance,
} from "./components";

export function LeadReport() {
  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Lead Report
        </h2>
        {/* <ProjectSearchFilter /> */}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r gap-8 2xl:gap-[2vw] 2xl:border-r-[0.1vw] pr-4 2xl:pr-[1vw]">
          <LeadFunnelChart />
          <LeadMetricsGrid />
          <StaffConversionPerformance />
        </div>
        <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:p-[1vw]">
          <SourceWiseConversionRate />
          <LeadFunnel />
          <MonthlyLeadsChart />
        </div>
      </div>
    </div>
  );
}
