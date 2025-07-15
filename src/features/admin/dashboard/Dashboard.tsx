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
  useDeleteDailyTaskMutation,
} from "@/services";
import { AnalyticalCardIcon } from "@/features";
import { Button, DatePicker, Dropdown, SearchBar, Table } from "@/components";
import { DeleteModal } from "@/components/modal/DeleteModal";
import { FiX } from "react-icons/fi";
import { useDebounce } from "@/utils/hooks";

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
  // Daily Task Filters
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");

  const { debouncedValue: searchQuery } = useDebounce({
    initialValue: searchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const handleSearch = (value: string) => {
    setSearchInput(value);
  };

  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");

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
    status: statusFilter,
    priority: priorityFilter,
    from: fromDate,
    to: toDate,
    search: searchQuery,
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
        <div className="p-4 2xl:p-[1vw] border 2xl:border-[0.1vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw]">
          <div className="flex justify-between items-center flex-wrap gap-4 2xl:gap-[1vw]">
            <h1 className="text-[1.2rem] 2xl:text-[1.2vw] font-medium">
              Daily Task List
            </h1>
            <div className="flex items-center flex-wrap gap-4 2xl:gap-[1vw]">
              <SearchBar
                onSearch={handleSearch}
                bgColor="white"
                width="w-full min-w-[12rem] md:w-[25vw]"
              />
              <Dropdown
                options={statusOptions}
                value={statusFilter}
                onChange={handleStatusChange}
                dropdownWidth="w-full md:w-fit"
              />
              <Dropdown
                options={priorityOptions}
                value={priorityFilter}
                onChange={handlePriorityChange}
                dropdownWidth="w-full md:w-fit"
              />
            </div>
          </div>
          <div className="flex justify-start items-end flex-wrap gap-4 2xl:gap-[1vw] my-4 2xl:my-[1vw]">
            <div className="flex flex-col justify-start items-start w-full min-w-[12rem] md:w-[15vw]">
              <DatePicker
                label="From Date"
                value={fromDate}
                onChange={(date) => setFromDate(date)}
                placeholder="From Date"
                datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
              />
            </div>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(date) => setToDate(date)}
              placeholder="To Date"
              datePickerWidth="w-full min-w-[12rem] md:w-[15vw]"
            />
            {(fromDate || toDate) && (
              <div>
                <Button
                  variant="background-white"
                  width="w-full md:w-fit"
                  onClick={handleClearDates}
                  leftIcon={
                    <FiX className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
                  }
                  tooltip="Clear Dates"
                />
              </div>
            )}
          </div>
          <Table
            data={dailyTaskList}
            columns={dailyTaskListColumn}
            actions={dailyTaskListAction}
          />
        </div>
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
