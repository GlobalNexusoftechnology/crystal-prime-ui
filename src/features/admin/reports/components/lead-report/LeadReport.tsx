import { useState, useEffect } from "react";
import { useLeadReportExcelQuery, useLeadReportQuery } from "@/services";
import { Button, Loading } from "@/components";
import {
  LeadFunnel,
  LeadFunnelChart,
  LeadMetricsGrid,
  MonthlyLeadsChart,
  SourceWiseConversionRate,
  StaffConversionPerformance,
  LeadReportFilter,
} from "./components";
import { ImDownload2 } from "react-icons/im";

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

  const { onDownloadLeadReportExcel } = useLeadReportExcelQuery();

  const handleExport = () => {
    onDownloadLeadReportExcel({
      fromDate,
      toDate,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-6 ">
        <div className="text-red-500 text-center p-4">
          Error loading lead report data. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl  font-medium mb-4 ">
          Lead Report
        </h2>
        <Button
          type="button"
          variant="primary-outline-blue"
          width="w-full md:w-fit"
          onClick={handleExport}
          leftIcon={
            <ImDownload2
              className="w-5 h-5  "
              color="#034A9F"
            />
          }
          tooltip="Download Excel"
        />
      </div>
      <LeadReportFilter
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r gap-8  border-gray-400  p-6 ">
          <LeadFunnelChart data={leadReportData?.leadFunnelChart} />
          <LeadMetricsGrid data={leadReportData?.kpiMetrics} />
          <StaffConversionPerformance
            data={leadReportData?.staffConversionPerformance}
          />
        </div>
        <div className="flex flex-col gap-8  p-4 ">
          <SourceWiseConversionRate
            data={leadReportData?.sourceWiseConversionRates}
          />
          <LeadFunnel data={leadReportData?.leadFunnelStages} />
          <MonthlyLeadsChart data={leadReportData?.monthlyLeadsChart} />
        </div>
      </div>
    </div>
  );
}
