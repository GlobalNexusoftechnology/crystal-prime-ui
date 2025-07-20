import { useState, useEffect } from "react";
import { usePublicDashboardReportQuery } from "@/services";
import {
  BusinessOverview,
  ExpensesOverviewChart,
  LeadClientInterest,
  MonthlyLeadsChart,
  PBDashboardFilter,
  TeamPerformanceHighlights,
} from "./components";

export function PBDashboardReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formatDate = (date: Date) => date.toLocaleDateString("en-CA");
    setFromDate(formatDate(first));
    setToDate(formatDate(last));
  }, []);

  const { publicDashboardData, isLoading, isError } = usePublicDashboardReportQuery({ fromDate, toDate });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !publicDashboardData) return <div>Error loading dashboard</div>;

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Public Business Dashboard
        </h2>
        <PBDashboardFilter
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col gap-8 border-r 2xl:border-r-[0.1vw]">
          <BusinessOverview data={publicDashboardData.businessOverview} />
          <div className="flex flex-col gap-4 2xl:gap-[1vw]">
            <h2 className="text-xl font-semibold mb-2">Trend Charts</h2>
            <ExpensesOverviewChart data={publicDashboardData.trendChart} />
            <MonthlyLeadsChart data={publicDashboardData.monthlyLeadsChart} />
          </div>
        </div>
        <div className="flex flex-col gap-8">
          <LeadClientInterest data={publicDashboardData.leadClientInterest} />
          <TeamPerformanceHighlights data={publicDashboardData.teamPerformance} />
        </div>
      </div>
    </div>
  );
}
