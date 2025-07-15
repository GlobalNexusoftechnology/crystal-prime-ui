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
import {
  useDashboardSummaryQuery,
  Category,
  useAllDailyTaskQuery,
  useDeleteDailyTaskMutation
} from "@/services";
import { AnalyticalCardIcon } from "@/features";
import { Table } from "@/components";
import { DeleteModal } from "@/components/modal/DeleteModal";

export default function Dashboard() {
  // Move all hooks to the top
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteDailyTask, isPending: isDeleting } = useDeleteDailyTaskMutation(
    {
      onSuccessCallback: () => {
        setShowDeleteModal(false);
        setDeleteId(null);
        refetchDailyTasks();
      },
      onErrorCallback: () => {
        setShowDeleteModal(false);
        setDeleteId(null);
        // Optionally show a toast or error message
      },
    }
  );

  const { dashboardSummary, isLoading, error } = useDashboardSummaryQuery();
  const {
    data: dailyTasks,
    isLoading: dailyTasksLoading,
    isError: dailyTasksError,
    error: dailyTasksErrorObj,
    refetchDailyTasks,
  } = useAllDailyTaskQuery();

  // ProjectRenewalList month selection logic
  const renewalMonthOptions = dashboardSummary?.projectRenewalData?.length
    ? dashboardSummary.projectRenewalData.map((cat: Category) => cat.category)
    : [];
  const [selectedMonth, setSelectedMonth] = useState(
    renewalMonthOptions[0] || ""
  );
  const handleMonthChange = (month: string) => setSelectedMonth(month);

  // Filter data for selected month
  const renewalDataForSelectedMonth =
    dashboardSummary && selectedMonth
      ? dashboardSummary.projectRenewalData.filter(
          (cat: Category) => cat.category === selectedMonth
        )
      : [];

  // Transform expensesDataMap to the shape expected by ExpensesOverviewChart
  const expensesDataMapForChart = dashboardSummary?.expensesDataMap
    ? Object.fromEntries(
        Object.entries(dashboardSummary.expensesDataMap).map(
          ([period, data]) => [
            period,
            data.labels.map((label, i) => ({
              month: label,
              income: data.income[i] ?? 0,
              expense: data.expense[i] ?? 0,
            })),
          ]
        )
      )
    : {};

  // Prepare safe dataMap for LeadAnalyticsChart
  const leadAnalyticsDataMap =
    dashboardSummary?.leadAnalyticsChartDataMap ?? {};
  const leadAnalyticsDropdownOptions = [
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
  ];
  const safeLeadAnalyticsDataMap = Object.fromEntries(
    leadAnalyticsDropdownOptions.map((option) => [
      option,
      leadAnalyticsDataMap[option] ?? [],
    ])
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !dashboardSummary) return <div>Error loading dashboard</div>;

  // Map API stats to AnalyticalCardData by adding a default icon
  const analyticalCards = dashboardSummary?.stats
    ? dashboardSummary.stats.map((card) => ({
        ...card,
        icon: <AnalyticalCardIcon />,
      }))
    : [];

  type DailyTask = {
    id: string;
    name: string;
    description: string;
    status: string;
    due: string;
    priority: "High" | "Medium" | "Low";
  };

  const dailyTaskList: DailyTask[] = (dailyTasks || []).map((task) => {
    const validPriority = ["High", "Medium", "Low"].includes(
      task.priority ?? ""
    );
    return {
      id: task.id,
      name: task.task_title,
      description: task.description || "-",
      status: task.status || "-",
      due: task.entry_date || "-",
      priority: validPriority
        ? (task.priority as "High" | "Medium" | "Low")
        : "Medium",
    };
  });

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
      onClick: (row: DailyTask) => {
        setDeleteId(row.id);
        setShowDeleteModal(true);
      },
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
        <LeadTypeChart
          chartDataMap={dashboardSummary.leadTypeChartDataMap}
          colors={dashboardSummary.leadTypeColors}
        />
        <ProjectRenewalList
          data={renewalDataForSelectedMonth}
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
          monthOptions={renewalMonthOptions}
        />
        <ExpensesOverviewChart dataMap={expensesDataMapForChart} />
      </div>
      {dailyTasksLoading ? (
        <div>Loading daily tasks...</div>
      ) : dailyTasksError ? (
        <div className="text-red-500">
          Error loading daily tasks:{" "}
          {dailyTasksErrorObj?.message || "Unknown error"}
        </div>
      ) : (
        <Table
          data={dailyTaskList}
          columns={dailyTaskListColumn}
          actions={dailyTaskListAction}
        />
      )}
      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={() => {
            if (deleteId) deleteDailyTask(deleteId);
          }}
          isLoading={isDeleting}
          title="Delete Daily Task"
          message="Are you sure you want to delete this daily task? This action cannot be undone."
        />
      )}
    </div>
  );
}
