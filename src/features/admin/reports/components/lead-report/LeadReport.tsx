import { useState, useEffect } from "react";
import { useLeadReportQuery } from "@/services";
import { Loading } from "@/components";
import {
  LeadFunnel,
  LeadFunnelChart,
  LeadMetricsGrid,
  MonthlyLeadsChart,
  SourceWiseConversionRate,
  StaffConversionPerformance,
  LeadReportFilter,
} from "./components";

export function LeadReport() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Set default date range: 1st to last date of current month
  useEffect(() => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const last = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const formatDate = (date: Date) => date.toLocaleDateString("en-CA");
    setFromDate(formatDate(first));
    setToDate(formatDate(last));
  }, []);

  const { leadReportData, isLoading, isError } = useLeadReportQuery({
    fromDate,
    toDate,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6 2xl:gap-[1vw]">
        <div className="text-red-500 text-center p-4">
          Error loading lead report data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div>
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Lead Report
        </h2>
      </div>
      
      <LeadReportFilter 
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r gap-8 2xl:gap-[2vw] 2xl:border-r-[0.1vw] pr-4 2xl:pr-[1vw]">
          <LeadFunnelChart data={leadReportData?.leadFunnelChart} />
          <LeadMetricsGrid data={leadReportData?.kpiMetrics} />
          <StaffConversionPerformance data={leadReportData?.staffConversionPerformance} />
        </div>
        <div className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:p-[1vw]">
          <SourceWiseConversionRate data={leadReportData?.sourceWiseConversionRates} />
          <LeadFunnel data={leadReportData?.leadFunnelStages} />
          <MonthlyLeadsChart data={leadReportData?.monthlyLeadsChart} />
        </div>
      </div>
    </div>
  );
}
