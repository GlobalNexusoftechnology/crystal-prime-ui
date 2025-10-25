"use client";
import { useState, useEffect } from "react";
import {
  usePublicDashboardReportExcelQuery,
  usePublicDashboardReportQuery,
} from "@/services";
import {
  BusinessOverview,
  ExpensesOverviewChart,
  LeadClientInterest,
  MonthlyLeadsChart,
  PBDashboardFilter,
  TeamPerformanceHighlights,
} from "./components";
import { Button, Loading } from "@/components";
import { ImDownload2 } from "react-icons/im";
import { Breadcrumb } from "../breadcrumb";

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

  const { publicDashboardData, isLoading, isError } =
    usePublicDashboardReportQuery({ fromDate, toDate });

  const { onDownloadPublicDashboardReportExcel } =
    usePublicDashboardReportExcelQuery();

  const handleExport = () => {
    onDownloadPublicDashboardReportExcel({ fromDate, toDate });
  };

  if (isLoading) return <Loading />;
  if (isError || !publicDashboardData)
    return <div>Error loading dashboard</div>;

  return (
    <div className="flex flex-col gap-4  border  rounded-xl  bg-white p-6 ">
      <Breadcrumb />
      <div className="flex justify-between items-center">
        <h2 className="text-2xl  font-medium mb-4 ">
          Public Business Dashboard
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
      <PBDashboardFilter
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
      <div className="grid grid-cols-1 xl:grid-cols-2">
        <div className="flex flex-col border-gray-400 border-r ">
          <BusinessOverview data={publicDashboardData.businessOverview} />
          <div className="flex flex-col gap-4  p-6 ">
            <h2 className="text-[1.1rem]  font-semibold mb-2">
              Trend Charts
            </h2>
            <ExpensesOverviewChart data={publicDashboardData.trendChart} />
            <MonthlyLeadsChart data={publicDashboardData.monthlyLeadsChart} />
          </div>
        </div>
        <div className="flex flex-col">
          <LeadClientInterest data={publicDashboardData.leadClientInterest} />
          <TeamPerformanceHighlights
            data={publicDashboardData.teamPerformance}
          />
        </div>
      </div>
    </div>
  );
}
