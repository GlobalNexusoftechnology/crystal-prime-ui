"use client";

import React, { useState, useMemo, useEffect } from "react";
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
  useAllDailyTaskQuery,
  useDeleteDailyTaskMutation,
  useUpdateDailyTaskMutation,
  useAllTicketsAcrossProjectsQuery,
  useUpdateTicketStatusMutation,
  useAuthStore,
} from "@/services";
import type { IDailyTaskEntryResponse } from "@/services";
import { AnalyticalCardIcon } from "@/features";
import { AddDailyTaskModal, DeleteModal } from "@/components";
import { Dropdown } from "@/components";
import DailyTaskTable from "./components/DailyTaskTable";
import { SupportTicketTable } from "./components";
import type { ITableAction, ITableColumn } from "@/constants/table";
import type { DailyTaskRow } from "./components/DailyTaskTable";
import type { SupportTicketRow } from "./components/SupportTicketTable";
import { useDebounce } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers/formatDate";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] =
    useState<Partial<IDailyTaskEntryResponse> | null>(null);
  // Move all hooks to the top
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);
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
  const userRole = activeSession?.user?.role?.role || "";
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

  // Support Ticket Filters
  const [supportTicketStatusFilter, setSupportTicketStatusFilter] =
    useState<string>("");
  const [supportTicketPriorityFilter, setSupportTicketPriorityFilter] =
    useState<string>("");
  const [supportTicketSearchInput, setSupportTicketSearchInput] = useState("");

  const { debouncedValue: supportTicketSearchQuery } = useDebounce({
    initialValue: supportTicketSearchInput,
    delay: 500,
    onChangeCb: () => {},
  });

  const handleSupportTicketSearch = (query: string) => {
    setSupportTicketSearchInput(query.toLowerCase());
  };

  const supportTicketFilters = useMemo(
    () => ({
      searchText: supportTicketSearchQuery,
      status: supportTicketStatusFilter,
      priority: supportTicketPriorityFilter,
    }),
    [
      supportTicketSearchQuery,
      supportTicketStatusFilter,
      supportTicketPriorityFilter,
    ]
  );

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Open", value: "open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Closed", value: "Closed" },
  ];
  const statusOptionsForCell = [
    { label: "Open", value: "open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Closed", value: "Closed" },
  ];
  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  // Filter handler
  const handleStatusChange = (value: string) => setStatusFilter(value);
  const handlePriorityChange = (value: string) => setPriorityFilter(value);
  const handleClearDates = () => {
    setFromDate("");
    setToDate("");
  };

  // Support Ticket Filter handlers
  const handleSupportTicketStatusChange = (value: string) =>
    setSupportTicketStatusFilter(value);
  const handleSupportTicketPriorityChange = (value: string) =>
    setSupportTicketPriorityFilter(value);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };

  const handleCloseImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  // Handle escape key to close image modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showImageModal) {
        handleCloseImageModal();
      }
    };

    if (showImageModal) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showImageModal]);

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

  // Fetch support tickets with filters
  const {
    ticketsData: supportTickets,
    isLoading: supportTicketsLoading,
    isError: supportTicketsError,
    error: supportTicketsErrorObj,
  } = useAllTicketsAcrossProjectsQuery({
    searchText: supportTicketFilters.searchText,
    status: supportTicketFilters.status,
    priority: supportTicketFilters.priority,
  });

  const { updateTicketStatus } = useUpdateTicketStatusMutation();

  // ProjectRenewalList month selection logic
  const renewalMonthOptions = dashboardSummary?.projectRenewalData
    ? Object.keys(dashboardSummary.projectRenewalData)
    : [];

  // Get current month name
  const getCurrentMonth = () => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[new Date().getMonth()];
  };

  const currentMonth = getCurrentMonth();

  // Add current month to options if it doesn't exist
  const allMonthOptions = renewalMonthOptions.includes(currentMonth)
    ? renewalMonthOptions
    : [currentMonth, ...renewalMonthOptions];

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const handleMonthChange = (month: string) => setSelectedMonth(month);

  // Get data for selected month
  const renewalDataForSelectedMonth =
    dashboardSummary &&
    selectedMonth &&
    dashboardSummary?.projectRenewalData &&
    dashboardSummary?.projectRenewalData[selectedMonth]
      ? dashboardSummary?.projectRenewalData[selectedMonth]
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
  const statsData = (dashboardSummary as any) || {};
  const analyticalCards = dashboardSummary?.stats
    ? dashboardSummary?.stats?.map((card) => ({
        ...card,
        icon: <AnalyticalCardIcon />,
      }))
    : [
        {
          count: statsData?.myTaskCount,
          title: "My Task",
          subtitle: "Open & In Process",
          icon: <AnalyticalCardIcon />,
        },
        {
          count: statsData?.todayFollowups,
          title: "Today Follow up",
          subtitle: "Due Today",
          icon: <AnalyticalCardIcon />,
        },
        {
          count: statsData?.projectCount,
          title: "Project",
          subtitle: "Assigned Projects",
          icon: <AnalyticalCardIcon />,
        },
        {
          count: statsData?.performanceRatio,
          title: "Performance Ratio",
          subtitle: "Completed/Assigned",
          icon: <AnalyticalCardIcon />,
        },
      ];

  const dailyTaskList: DailyTaskRow[] = (dailyTasks || []).map((task) => {
    const validPriority = ["High", "Medium", "Low"].includes(
      task.priority ?? ""
    );
    return {
      id: task?.id,
      name: task?.task_title,
      description: task?.description || "-",
      status: task?.status || "-",
      due: task?.entry_date || "-",
      priority: validPriority
        ? (task?.priority as "High" | "Medium" | "Low")
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
        router.push(
          `/admin/project-management/${row.projectId}/${row.milestoneId}/${row.taskId}`
        );
      },
      className: "text-blue-500 whitespace-nowrap",
    },
  ];

  // Support Ticket Data Transformation
  const supportTicketList: SupportTicketRow[] = (supportTickets || []).map(
    (ticket) => {
      const validPriority = ["high", "medium", "low"].includes(
        ticket.priority ?? ""
      );
      return {
        id: ticket?.id,
        title: ticket?.title,
        description: ticket?.description || "-",
        status: ticket?.status || "-",
        priority: validPriority
          ? (ticket?.priority as "high" | "medium" | "low")
          : "medium",
        projectId: ticket?.project?.id || "",
        projectName: ticket?.project?.name || "-",
        createdBy: ticket?.created_by || "-",
        createdAt: ticket?.created_at ? formatDate(ticket.created_at) : "-",
        updatedAt: ticket?.updated_at ? formatDate(ticket.updated_at) : "-",
        taskName: ticket?.task?.title || "-",
        remark: ticket?.remark || "-",
        image: ticket?.image_url || null,
        // Deep links - updated to match API response structure
        milestoneId: ticket?.milestone?.id || "",
        taskId: ticket?.task?.id || "",
      };
    }
  );

  const supportTicketListColumn: ITableColumn<SupportTicketRow>[] = [
    {
      header: "STATUS",
      accessor: "status",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem]">
          <Dropdown
            options={statusOptionsForCell}
            value={String((value as string) ?? "")}
            onChange={(val) =>
              updateTicketStatus({ id: String(row.id), status: val })
            }
            dropdownWidth="w-[10rem] 2xl:w-[10vw]"
          />
        </div>
      ),
    },
    {
      header: "IMAGE",
      accessor: "image",
      cell: ({ value }) => {
        const img = (value as string) ?? null;
        if (!img) {
          return <span className="text-gray-400 text-xs">No image</span>;
        }
        return (
          <div className="flex items-center justify-center">
            <div
              className="relative w-12 h-12 2xl:w-[3vw] 2xl:h-[3vw] cursor-pointer hover:opacity-80 transition-opacity group"
              onClick={() => handleImageClick(img)}
            >
              <Image
                src={img}
                alt="Ticket attachment"
                fill
                className="object-cover rounded-lg"
                unoptimized
                onError={(e) => {
                  // Hide the image and show fallback text
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                  const fallback =
                    target.parentElement?.querySelector(".image-fallback");
                  if (fallback) {
                    fallback.classList.remove("hidden");
                  }
                }}
              />
              <div className="hidden image-fallback absolute inset-0 items-center justify-center bg-gray-100 rounded-lg">
                <span className="text-gray-400 text-xs">Failed to load</span>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Click to view
                </span>
              </div>
            </div>
          </div>
        );
      },
    },
    { header: "PRIORITY", accessor: "priority" },
    { header: "TITLE", accessor: "title" },

    { header: "PROJECT", accessor: "projectName" },
    { header: "TASK", accessor: "taskName" },
    { header: "CREATED AT", accessor: "createdAt" },
  ];

  const supportTicketListAction: ITableAction<SupportTicketRow>[] = [
    {
      label: "View",
      onClick: (row: SupportTicketRow) => {
        // Navigate to ticket route if both IDs exist; else fallback to project page
        const hasTicketRoute = Boolean(
          row.projectId && row.milestoneId && row.id
        );
        if (hasTicketRoute) {
          router.push(
            `/admin/project-management/${row.projectId}/${row.milestoneId}/tickets/${row.id}`
          );
        } else if (row.projectId) {
          router.push(`/admin/project-management/${row.projectId}`);
        }
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
    weekly: (dashboardSummary?.leadAnalytics?.weekly ?? [])?.map((item) => ({
      name: item?.status,
      value: item?.count,
    })),
    monthly: (dashboardSummary?.leadAnalytics?.monthly ?? [])?.map((item) => ({
      name: item?.status,
      value: item?.count,
    })),
    yearly: (dashboardSummary?.leadAnalytics?.yearly ?? [])?.map((item) => ({
      name: item?.status,
      value: item?.count,
    })),
  };

  // LeadTypeChart
  const leadTypeDataMap = {
    weekly: (dashboardSummary?.leadType?.weekly ?? []).map((item) => ({
      name: item?.type ?? "",
      value: item?.count,
    })),
    monthly: (dashboardSummary?.leadType?.monthly ?? []).map((item) => ({
      name: item.type ?? "",
      value: item.count,
    })),
    yearly: (dashboardSummary?.leadType?.yearly ?? []).map((item) => ({
      name: item.type ?? "",
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
    <div className="p-6 md:p-8 2xl:p-[2vw] bg-[#fafbfc] border 2xl:border-[0.1vw] border-gray-300 rounded-xl 2xl:rounded-[0.75vw] min-h-screen">
      <div className="mb-6 2xl:mb-[1.5vw]">
        <h1 className="text-2xl 2xl:text-[1.5vw] 2xl:leading-[2vw] font-semibold text-gray-900 mb-1 2xl:mb-[0.25vw]">
          Welcome
        </h1>
        <p className="text-gray-500 text-base 2xl:text-[1vw]">
          Wishing you a productive and fulfilling day ahead!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 2xl:gap-[1vw] mb-4 2xl:mb-[1vw]">
        {analyticalCards?.length > 0 &&
          analyticalCards.map((card, idx) => (
            <AnalyticalCard key={idx} data={card} />
          ))}
      </div>
      <div className="my-6 2xl:my-[1.5vw]">
        <SupportTicketTable
          userRole={userRole}
          supportTicketsLoading={supportTicketsLoading}
          supportTicketsError={supportTicketsError}
          supportTicketsErrorObj={supportTicketsErrorObj}
          supportTicketList={supportTicketList}
          supportTicketListColumn={supportTicketListColumn}
          supportTicketListAction={supportTicketListAction}
          statusOptions={statusOptions}
          statusFilter={supportTicketStatusFilter}
          handleStatusChange={handleSupportTicketStatusChange}
          priorityOptions={priorityOptions}
          priorityFilter={supportTicketPriorityFilter}
          handlePriorityChange={handleSupportTicketPriorityChange}
          handleSearch={handleSupportTicketSearch}
        />
      </div>

      {/* Image Modal */}
      {showImageModal && selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={handleCloseImageModal}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={handleCloseImageModal}
                className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
              >
                ×
              </button>
            </div>
            <div className="relative w-full h-full">
              <Image
                src={selectedImage}
                alt="Ticket attachment"
                width={800}
                height={600}
                className="w-full h-auto max-h-[90vh] object-contain"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
      {userRole.toLowerCase() === "admin" ? (
        <div>
          <div className="flex flex-wrap lg:flex-nowrap gap-6 2xl:gap-[1.5vw] my-6 2xl:my-[1.5vw]">
            <div className="w-full lg:w-[30%]">
              <ProjectSnapshotChart
                data={projectSnapshotArray}
                colors={["#3B82F6", "#10B981", "#F59E42"]}
              />
            </div>
            <div className="w-full lg:w-[70%]">
              <LeadAnalyticsChart dataMap={leadAnalyticsDataMap} />
            </div>
          </div>
          <div className="flex flex-wrap lg:flex-nowrap gap-6 2xl:gap-[1.5vw] my-6 2xl:my-[1.5vw]">
            <div className="w-full lg:w-[50%]">
              <LeadTypeChart
                chartDataMap={leadTypeDataMap}
                colors={["#6366F1", "#F59E42", "#10B981", "#EF4444"]}
              />
            </div>
            <div className="w-full lg:w-[50%]">
              <ProjectRenewalList
                data={renewalDataForSelectedMonth}
                selectedMonth={selectedMonth}
                onMonthChange={handleMonthChange}
                monthOptions={allMonthOptions}
              />
            </div>
          </div>
          <ExpensesOverviewChart dataMap={expensesDataMap} />
        </div>
      ) : (
        <div>
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
                project_id: editTask?.project?.id || "",
                assigned_to:
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  editTask?.user?.id || (editTask as any)?.assigned_to || "",
                task_title: editTask?.task_title || "",
                entry_date: editTask?.entry_date || "",
                description: editTask?.description || "",
                hours_spent: editTask?.hours_spent || undefined,
                status: editTask?.status || "",
                remarks: editTask?.remarks || "",
                priority: editTask?.priority || "Medium",
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
      )}
    </div>
  );
}
