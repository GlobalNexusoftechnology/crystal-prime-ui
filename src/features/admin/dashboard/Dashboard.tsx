"use client";

import React, { useState, useMemo } from "react";
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
  useDeleteDailyTaskMutation,
  useUpdateDailyTaskMutation,
  useAuthStore,
} from "@/services";
import type { IDailyTaskEntryResponse } from "@/services";
import { AnalyticalCardIcon } from "@/features";
import { AddDailyTaskModal, DeleteModal } from "@/components";
import DailyTaskTable from "./components/DailyTaskTable";
import type { ITableAction } from "@/constants/table";
import type { DailyTaskRow } from "./components/DailyTaskTable";
import { useDebounce } from "@/utils/hooks";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] =
    useState<Partial<IDailyTaskEntryResponse> | null>(null);
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
  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role.role || "";
  // Daily Task Filters
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const handleSearch = (query: string) => {
    setSearchInput(query.toLowerCase());
  };

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

  const filters = useMemo(
    () => ({
      searchText: searchQuery,
      status: statusFilter,
      priority: priorityFilter,
      fromDate: fromDate || undefined,
      toDate: toDate || undefined,
    }),
    [searchQuery, statusFilter, priorityFilter, fromDate, toDate]
  );

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];
  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "High", value: "High" },
    { label: "Medium", value: "Medium" },
    { label: "Low", value: "Low" },
  ];

  // Filter handler
  const handleStatusChange = (value: string) => setStatusFilter(value);
  const handlePriorityChange = (value: string) => setPriorityFilter(value);
  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // Fetch daily tasks with filters
  const {
    data: dailyTasks,
    isLoading: dailyTasksLoading,
    isError: dailyTasksError,
    error: dailyTasksErrorObj,
    refetchDailyTasks,
  } = useAllDailyTaskQuery({
    status: filters.status,
    priority: filters.priority,
    from: filters.fromDate,
    to: filters.toDate,
    search: filters.searchText,
  });

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

  // Remove old transformation for leadAnalyticsChartDataMap
  // Prepare safe dataMap for LeadAnalyticsChart

  const { updateDailyTask, isPending: isUpdating } = useUpdateDailyTaskMutation(
    {
      onSuccessCallback: () => {
        setShowEditModal(false);
        setEditTask(null);
        refetchDailyTasks();
      },
      onErrorCallback: () => {
        setShowEditModal(false);
        setEditTask(null);
        // Optionally show a toast or error message
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error || !dashboardSummary) return <div>Error loading dashboard</div>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const statsData = dashboardSummary as any || {};
  console.log('statsData:', statsData);
  const analyticalCards = dashboardSummary?.stats
    ? dashboardSummary.stats.map((card) => ({
        ...card,
        icon: <AnalyticalCardIcon />,
      }))
    : [
        { count: statsData.myTaskCount, title: "My Task", subtitle: "Open & In Process", icon: <AnalyticalCardIcon /> },
        { count: statsData.todayFollowups, title: "Today Follow up", subtitle: "Due Today", icon: <AnalyticalCardIcon /> },
        { count: statsData.projectCount, title: "Project", subtitle: "Assigned Projects", icon: <AnalyticalCardIcon /> },
        { count: statsData.performanceRatio, title: "Performance Ratio", subtitle: "Completed/Assigned", icon: <AnalyticalCardIcon /> },
      ];

  const dailyTaskList: DailyTaskRow[] = (dailyTasks || []).map((task) => {
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      projectId: (task as any)?.projectId || "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      milestoneId: (task as any)?.milestoneId || "",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      taskId: (task as any)?.taskId || "",
    };
  });

  const dailyTaskListColumn: { header: string; accessor: string }[] = [
    { header: "STATUS", accessor: "status" },
    { header: "PRIORITY", accessor: "priority" },
    { header: "TASK NAME", accessor: "name" },
    { header: "DESCRIPTION", accessor: "description" },
    { header: "DUE DATE", accessor: "due" },
  ];

  const dailyTaskListAction: ITableAction<DailyTaskRow>[] = [
    {
      label: "View",
      onClick: (row: DailyTaskRow) => {
        router.push(`/admin/project-management/${row.projectId}/${row.milestoneId}/${row.taskId}`);
      },
      className: "text-blue-500 whitespace-nowrap",
    },
  ];

  // ProjectSnapshotChart
  const projectSnapshotArray = [
    {
      name: "In Progress",
      value: dashboardSummary?.projectSnapshot?.inProgress ?? 0,
    },
    {
      name: "Completed",
      value: dashboardSummary?.projectSnapshot?.completed ?? 0,
    },
    { name: "Open", value: dashboardSummary?.projectSnapshot?.open ?? 0 },
  ];

  // LeadAnalyticsChart
  const leadAnalyticsDataMap = {
    weekly: (dashboardSummary?.leadAnalytics?.weekly ?? []).map((item) => ({
      name: item.status,
      value: item.count,
    })),
    monthly: (dashboardSummary?.leadAnalytics?.monthly ?? []).map((item) => ({
      name: item.status,
      value: item.count,
    })),
    yearly: (dashboardSummary?.leadAnalytics?.yearly ?? []).map((item) => ({
      name: item.status,
      value: item.count,
    })),
  };

  // LeadTypeChart
  const leadTypeDataMap = {
    weekly: (dashboardSummary?.leadType?.weekly ?? []).map((item) => ({
      name: item.type ?? "Unknown",
      value: item.count,
    })),
    monthly: (dashboardSummary?.leadType?.monthly ?? []).map((item) => ({
      name: item.type ?? "Unknown",
      value: item.count,
    })),
    yearly: (dashboardSummary?.leadType?.yearly ?? []).map((item) => ({
      name: item.type ?? "Unknown",
      value: item.count,
    })),
  };

  // ExpensesOverviewChart
  const expensesDataMap = {
    weekly: (dashboardSummary?.expenses?.weekly?.labels ?? []).map(
      (label, i) => ({
        month: label,
        income: dashboardSummary?.expenses?.weekly?.income?.[i] ?? 0,
        expense: dashboardSummary?.expenses?.weekly?.expense?.[i] ?? 0,
      })
    ),
    monthly: (dashboardSummary?.expenses?.monthly?.labels ?? []).map(
      (label, i) => ({
        month: label,
        income: dashboardSummary?.expenses?.monthly?.income?.[i] ?? 0,
        expense: dashboardSummary?.expenses?.monthly?.expense?.[i] ?? 0,
      })
    ),
    yearly: (dashboardSummary?.expenses?.yearly?.labels ?? []).map(
      (label, i) => ({
        month: label,
        income: dashboardSummary?.expenses?.yearly?.income?.[i] ?? 0,
        expense: dashboardSummary?.expenses?.yearly?.expense?.[i] ?? 0,
      })
    ),
  };

  return (
    <div className="p-6 md:p-8 bg-[#fafbfc] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl 2xl:text-[1.5vw] 2xl:leading-[2vw] font-semibold text-gray-900 mb-1 2xl:mb-[0.25vw]">Welcome</h1>
        <p className="text-gray-500 text-base 2xl:text-[1vw]">
          Wishing you a productive and fulfilling day ahead!
        </p>
      </div>
      <div className="flex gap-4 2xl:gap-[1vw] flex-wrap mb-4 2xl:mb-[1vw]">
        {analyticalCards.map((card, idx) => (
          <AnalyticalCard key={idx} data={card} />
        ))}
      </div>
      {userRole.toLowerCase() === "admin" ? (
        <div className="flex flex-wrap gap-6 2xl:gap-[1.5vw] my-6 2xl:my-[1.5vw]">
          <ProjectSnapshotChart
            data={projectSnapshotArray}
            colors={["#3B82F6", "#10B981", "#F59E42"]}
          />
          <LeadAnalyticsChart dataMap={leadAnalyticsDataMap} />
          <LeadTypeChart
            chartDataMap={leadTypeDataMap}
            colors={["#6366F1", "#F59E42", "#10B981", "#EF4444"]}
          />
          <ProjectRenewalList
            data={renewalDataForSelectedMonth}
            selectedMonth={selectedMonth}
            onMonthChange={handleMonthChange}
            monthOptions={renewalMonthOptions}
          />
          <ExpensesOverviewChart dataMap={expensesDataMap} />
        </div>
      ) : null}
      <DailyTaskTable
        userRole={userRole}
        dailyTasksLoading={dailyTasksLoading}
        dailyTasksError={dailyTasksError}
        dailyTasksErrorObj={dailyTasksErrorObj}
        dailyTaskList={dailyTaskList}
        dailyTaskListColumn={dailyTaskListColumn}
        dailyTaskListAction={dailyTaskListAction}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        priorityOptions={priorityOptions}
        priorityFilter={priorityFilter}
        handlePriorityChange={handlePriorityChange}
        handleSearch={handleSearch}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        handleClearDates={handleClearDates}
      />
      {showEditModal && editTask && (
        <AddDailyTaskModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setEditTask(null);
          }}
          onSubmit={async (values) => {
            updateDailyTask({
              id: editTask.id || "",
              payload: {
                ...values,
                hours_spent: values.hours_spent
                  ? Number(values.hours_spent)
                  : undefined,
              },
            });
          }}
          initialValues={{
            project_id: editTask.project?.id || "",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            assigned_to: editTask.user?.id || (editTask as any)?.assigned_to || "",
            task_title: editTask.task_title || "",
            entry_date: editTask.entry_date || "",
            description: editTask.description || "",
            hours_spent: editTask.hours_spent || undefined,
            status: editTask.status || "",
            remarks: editTask.remarks || "",
            priority: editTask.priority || "Medium",
          }}
          isPending={isUpdating}
          isEdit={true}
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
