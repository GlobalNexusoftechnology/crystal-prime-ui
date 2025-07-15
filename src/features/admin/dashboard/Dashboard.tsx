"use client";

import React, { useState } from "react";
import {
  ExpensesOverviewChart,
  LeadAnalyticsChart,
  LeadTypeChart,
  ProjectRenewalList,
  ProjectSnapshotChart,
} from "./components";
import { AnalyticalCard } from "../analytical-card";
import { useDashboardSummaryQuery, Category } from '@/services';
import { AnalyticalCardIcon } from "@/features";
import { Table } from "@/components";

export default function Dashboard() {
  const { dashboardSummary, isLoading, error } = useDashboardSummaryQuery();

  // ProjectRenewalList month selection logic
  const renewalMonthOptions = dashboardSummary?.projectRenewalData?.length
    ? dashboardSummary.projectRenewalData.map((cat: Category) => cat.category)
    : [];
  const [selectedMonth, setSelectedMonth] = useState(renewalMonthOptions[0] || "");
  const handleMonthChange = (month: string) => setSelectedMonth(month);

  // Filter data for selected month
  const renewalDataForSelectedMonth = dashboardSummary && selectedMonth
    ? dashboardSummary.projectRenewalData.filter((cat: Category) => cat.category === selectedMonth)
    : [];

  // Transform expensesDataMap to the shape expected by ExpensesOverviewChart
  const expensesDataMapForChart = dashboardSummary?.expensesDataMap
    ? Object.fromEntries(
        Object.entries(dashboardSummary.expensesDataMap).map(([period, data]) => [
          period,
          data.labels.map((label, i) => ({
            month: label,
            income: data.income[i] ?? 0,
            expense: data.expense[i] ?? 0,
          })),
        ])
      )
    : {};

  // Prepare safe dataMap for LeadAnalyticsChart
  const leadAnalyticsDataMap = dashboardSummary?.leadAnalyticsChartDataMap ?? {};
  const leadAnalyticsDropdownOptions = ["This Week", "Last Week", "This Month", "Last Month"];
  const safeLeadAnalyticsDataMap = Object.fromEntries(
    leadAnalyticsDropdownOptions.map(option => [option, leadAnalyticsDataMap[option] ?? []])
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !dashboardSummary) return <div>Error loading dashboard</div>;

  // Map API stats to AnalyticalCardData by adding a default icon
  const analyticalCards = dashboardSummary?.stats
    ? dashboardSummary.stats.map(card => ({
        ...card,
        icon: <AnalyticalCardIcon />,
      }))
    : [];

  type DailyTask = {
    id: number;
    name: string;
    description: string;
    status: string;
    due: string;
    priority: "High" | "Medium" | "Low";
  };

  const dailyTaskList: DailyTask[] = [
    {
      id: 1,
      name: "Product List",
      description: "This Project Belongs to the...",
      status: "Open",
      due: "24-02-2021",
      priority: "High",
    },
    {
      id: 2,
      name: "Offer List",
      description: "This Project Belongs to the...",
      status: "In Progress",
      due: "25-02-2021",
      priority: "Medium",
    },
  ];
  
  const dailyTaskListColumn: { header: string; accessor: keyof DailyTask }[] = [
    { header: "TASK NAME", accessor: "name" },
    { header: "DESCRIPTION", accessor: "description" },
    { header: "STATUS", accessor: "status" },
    { header: "PRIORITY", accessor: "priority" },
    { header: "DUE DATE", accessor: "due" },
  ];
  
  const dailyTaskListAction = [
    {
      label: "Edit",
      onClick: (row: DailyTask) => alert(`Edit task: ${row.name}`),
      className: "text-blue-500 whitespace-nowrap",
    },
    {
      label: "Delete",
      onClick: (row: DailyTask) => alert(`Delete task: ${row.name}`),
      className: "text-red-500 whitespace-nowrap",
    },
  ];

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Welcome</h1>
        <p className="text-gray-500 text-base">
          Wishing you a productive and fulfilling day ahead!
        </p>
      </div>
      <div className="flex gap-4 2xl:gap-[1vw] flex-wrap">
        {analyticalCards.map((card, idx) => (
          <AnalyticalCard key={idx} data={card} />
        ))}
      </div>
      <div className="flex flex-wrap gap-6 my-6">
        <ProjectSnapshotChart
          data={dashboardSummary?.projectSnapshotData ?? []}
          colors={dashboardSummary?.projectSnapshotColors ?? []}
        />
        <LeadAnalyticsChart dataMap={safeLeadAnalyticsDataMap} />
        <LeadTypeChart chartDataMap={dashboardSummary.leadTypeChartDataMap} colors={dashboardSummary.leadTypeColors} />
        <ProjectRenewalList
          data={renewalDataForSelectedMonth}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          monthOptions={renewalMonthOptions}
        />
        <ExpensesOverviewChart dataMap={expensesDataMapForChart} />
      </div>
      <Table
        data={dailyTaskList}
        columns={dailyTaskListColumn}
        actions={dailyTaskListAction}
      />
    </div>
  );
}