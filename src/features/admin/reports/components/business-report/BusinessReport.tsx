import { useState, useEffect } from "react";
import {
  useBusinessAnalysisReportExcelQuery,
  useBusinessAnalysisReportQuery,
} from "@/services";
import { Button, Loading } from "@/components";
import {
  BusinessAnalysisFilter,
  FinancialSummary,
  LeadFunnelChart,
  LeadMetrics,
  NewLeadsChart,
  ProjectDeliveryPerformance,
  ProjectSnapshotChart,
  RevenueTrendChart,
  TeamStaffPerformance,
} from "./components";
import { ImDownload2 } from "react-icons/im";

export const BusinessReport: React.FC = () => {
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

  const { businessAnalysisData, isLoading, isError } =
    useBusinessAnalysisReportQuery({
      fromDate,
      toDate,
    });

  const { onDownloadBusinessAnalysisReportExcel } =
    useBusinessAnalysisReportExcelQuery();

  const handleExport = () => {
    onDownloadBusinessAnalysisReportExcel({
      fromDate,
      toDate,
    });
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error loading report</div>;
  if (!businessAnalysisData) return null;

  return (
    <div className="flex flex-col gap-6 2xl:gap-[1vw]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl 2xl:text-[1.5vw] font-medium mb-4 2xl:mb-[0.75vw]">
          Overall Business Analysis Report
        </h2>
        <Button
          type="button"
          variant="primary-outline-blue"
          width="w-full md:w-fit"
          onClick={handleExport}
          leftIcon={
            <ImDownload2
              className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]"
              color="#034A9F"
            />
          }
          tooltip="Download Excel"
        />
      </div>
      <BusinessAnalysisFilter
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-r gap-8 2xl:gap-[2vw] 2xl:border-r-[0.1vw]">
          <LeadFunnelChart data={businessAnalysisData.leadFunnelMetrics} />
          <LeadMetrics data={businessAnalysisData.leadFunnelMetrics} />
          <TeamStaffPerformance
            data={businessAnalysisData.teamStaffPerformance}
          />
        </div>
        <div className="flex flex-col gap-8 2xl:gap-[2vw]">
          <ProjectDeliveryPerformance
            data={businessAnalysisData.projectDeliveryMetrics}
          />
          <FinancialSummary data={businessAnalysisData.financialSummary} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold mb-4">Monthly Trend Snapshot</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="col-span-1">
            <ProjectSnapshotChart data={businessAnalysisData.monthlyTrends} />
          </div>
          <div className="col-span-1">
            <NewLeadsChart data={businessAnalysisData.monthlyTrends} />
          </div>
          <div className="col-span-2">
            <RevenueTrendChart data={businessAnalysisData.monthlyTrends} />
          </div>
        </div>
      </div>
    </div>
  );
};
