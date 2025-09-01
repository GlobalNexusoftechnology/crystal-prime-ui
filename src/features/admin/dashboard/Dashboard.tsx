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
  useUpdateDailyTaskStatusMutation,
  useCreateDailyTaskMutation,
  useAllProjectsQuery,
  useAllTicketsAcrossProjectsQuery,
  useUpdateTicketStatusMutation,
  useUpdateTicketMutation,
  useAllUsersQuery,
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
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] =
    useState<Partial<IDailyTaskEntryResponse> | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
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
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
    { label: "Closed", value: "closed" },
  ];
  
  const dailyTaskStatusOptions = [
    { label: "All Status", value: "" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ];
  


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

  // Fetch daily tasks
  const {
    data: dailyTasks,
    isLoading: dailyTasksLoading,
    isError: dailyTasksError,
    error: dailyTasksErrorObj,
    refetchDailyTasks,
  } = useAllDailyTaskQuery({});

  // Fetch support tickets with filters
  const {
    ticketsData: supportTickets,
    isLoading: supportTicketsLoading,
    isError: supportTicketsError,
    error: supportTicketsErrorObj,
    ticketsRefetch: refetchSupportTickets,
  } = useAllTicketsAcrossProjectsQuery({
    searchText: supportTicketFilters.searchText,
    status: supportTicketFilters.status,
    priority: supportTicketFilters.priority,
  });

  const { updateTicketStatus } = useUpdateTicketStatusMutation();

  // Daily task status update hook
  const { updateDailyTaskStatus, isPending: isUpdatingDailyTaskStatus } = useUpdateDailyTaskStatusMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message);
      refetchDailyTasks();
    },
    onErrorCallback: (error) => {
      const errorMessage = error?.message || "Failed to update daily task status. Please try again.";
      toast.error(errorMessage);
    },
  });

  // Fetch all users for assignment dropdown
  const { allUsersData: usersData, isLoading: isLoadingUsers } =
    useAllUsersQuery();

  // Fetch all projects for project selection
  const { allProjectsData: projectsData, isLoading: isLoadingProjects } =
    useAllProjectsQuery();

  // Update ticket mutation for assignment changes
  const { updateTicket, isPending: isUpdatingTicket } = useUpdateTicketMutation(
    {
      onSuccessCallback: (data) => {
        toast.success(data.message);
        // Refetch tickets to get updated data
        refetchSupportTickets();
      },
      onErrorCallback: (error) => {
        // Show specific error message if available
        const errorMessage =
          error?.message ||
          error?.response?.data?.message ||
          "Failed to update ticket assignment. Please try again.";
        toast.error(errorMessage);
      },
    }
  );

  // Prepare user options for assignment dropdown
  const userOptions = React.useMemo(() => {
    if (!usersData?.data?.list) return [];

    return usersData.data.list.map((user) => ({
      label: `${user.first_name} ${user.last_name}`,
      value: user.id,
    }));
  }, [usersData]);

  // Prepare project options for project selection
  const projectOptions = React.useMemo(() => {
    if (!projectsData) return [];

    return projectsData.map((project) => ({
      label: project.name,
      value: project.id,
    }));
  }, [projectsData]);

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

  // Create daily task mutation
  const { createDailyTask, isPending: isCreating } = useCreateDailyTaskMutation({
    onSuccessCallback: (response) => {
      toast.success(response.message || "Daily task created successfully");
      setShowAddModal(false);
      refetchDailyTasks();
    },
    onErrorCallback: (error) => {
      const errorMessage = error?.message || "Failed to create daily task. Please try again.";
      toast.error(errorMessage);
    },
  });

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
    
    // Get staff name from assigned_to
    const getStaffName = (assignedTo: string) => {
      if (!usersData?.data?.list) return "-";
      const user = usersData.data.list.find((u) => u.id === assignedTo);
      return user ? `${user.first_name} ${user.last_name}` : "-";
    };

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
      // New columns for project and client info
      projectName: task?.project?.name || "-",
      clientName: task?.project?.client?.name || "-",
      clientNumber: task?.project?.client?.contact_number || "-",
      staffName: getStaffName(task?.assigned_to || ""),
      created_at: task?.created_at ? formatDate(task.created_at) : "-",
    };
  });

  const dailyTaskListColumn: ITableColumn<DailyTaskRow>[] = [
    {
      header: "STATUS",
      accessor: "status",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
          {isUpdatingDailyTaskStatus ? (
            <span className="text-blue-500 text-sm">Updating...</span>
          ) : (
            <Dropdown
              options={dailyTaskStatusOptions}
              value={String((value as string) ?? "")}
              onChange={(val) =>
                updateDailyTaskStatus({
                  id: String(row.id),
                  payload: { status: val }
                })
              }
              dropdownWidth="w-[10rem] 2xl:w-[10vw]"
            />
          )}
        </div>
      ),
    },
    { header: "PRIORITY", accessor: "priority" },
    { header: "TASK NAME", accessor: "name" },
    { header: "DESCRIPTION", accessor: "description" },
    // Show staff name for admin users
    ...(userRole.toLowerCase() === "admin" ? [{ header: "STAFF NAME", accessor: "staffName" }] : []),
    // Show project and client info for staff users (non-admin)
      { header: "PROJECT NAME", accessor: "projectName" },
      { header: "CLIENT NAME", accessor: "clientName" },
      { header: "CLIENT NUMBER", accessor: "clientNumber" },
    { header: "CREATED AT", accessor: "created_at" },
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
        assignedTo: ticket?.assigned_to || null,
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
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
          <Dropdown
            options={statusOptions}
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
      header: "ASSIGNED TO",
      accessor: "assignedTo",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
          {isLoadingUsers ? (
            <span className="text-gray-400 text-sm">Loading...</span>
          ) : isUpdatingTicket ? (
            <span className="text-blue-500 text-sm">Updating...</span>
          ) : (
            <Dropdown
              options={userOptions}
              value={value ? String(value) : ""}
              onChange={(val) => {
                // Prepare the API payload
                const apiPayload = {
                  assigned_to: val === "" ? null : val,
                };

                const requestPayload = {
                  id: String(row.id),
                  payload: apiPayload,
                };

                // Make the API call
                updateTicket(requestPayload);
              }}
              dropdownWidth="w-[15rem] 2xl:w-[15vw]"
            />
          )}
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
    <div className="p-6 md:p-8 2xl:p-[2vw] bg-[#fafbfc] border 2xl:border-[0.05vw] border-gray-300 rounded-xl 2xl:rounded-[0.75vw] min-h-screen">
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
      <div>
       
        <DailyTaskTable
          userRole={userRole}
          dailyTasksLoading={dailyTasksLoading}
          dailyTasksError={dailyTasksError}
          dailyTasksErrorObj={dailyTasksErrorObj}
          dailyTaskList={dailyTaskList}
          dailyTaskListColumn={dailyTaskListColumn}
          dailyTaskListAction={dailyTaskListAction}
          onAddDailyTask={() => setShowAddModal(true)}
        />

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

        {/* Add Daily Task Modal */}
        {showAddModal && (
          <AddDailyTaskModal
            isOpen={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={async (values) => {
              await createDailyTask({
                project_id: values.project_id,
                assigned_to: values.assigned_to,
                task_title: values.task_title,
                entry_date: values.entry_date,
                description: values.description,
                hours_spent: values.hours_spent,
                status: values.status,
                remarks: values.remarks,
                priority: values.priority,
              });
            }}
            initialValues={{
              project_id: "",
              assigned_to: "",
              task_title: "",
              entry_date: new Date().toISOString().slice(0, 10),
              description: "",
              hours_spent: undefined,
              status: "",
              remarks: "",
              priority: "Medium",
            }}
            isPending={isCreating}
            isEdit={false}
            showProjectAndUserSelection={true}
            projectOptions={projectOptions}
            userOptions={userOptions}
            isLoadingProjects={isLoadingProjects}
            isLoadingUsers={isLoadingUsers}
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
    </div>
  );
}
