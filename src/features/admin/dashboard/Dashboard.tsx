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
  useAllProjectsQuery,
  useAllTicketsAcrossProjectsQuery,
  useUpdateTicketStatusMutation,
  useUpdateTicketMutation,
  useAllUsersQuery,
  useUpdateTaskStatusMutation,
  useCreateMilestoneTaskMutation,
  useAuthStore,
} from "@/services";

import { AnalyticalCardIcon } from "@/features";
import { AddTaskModal } from "@/components";
import { Dropdown } from "@/components";

import { SupportTicketTable } from "./components";
import TaskTable from "./components/TaskTable";
import type { ITableAction, ITableColumn } from "@/constants/table";

import type { SupportTicketRow } from "./components/SupportTicketTable";
import type { TaskRow } from "./components/TaskTable";
import { useDebounce } from "@/utils/hooks";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers/formatDate";
import Image from "next/image";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<string>("");
  // Move all hooks to the top

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showImageModal, setShowImageModal] = useState(false);

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

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedMilestoneId(""); // Reset milestone when project changes
  };

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

  // Task status update hook
  const { onUpdateTaskStatus, isPending: isUpdatingTaskStatus } =
    useUpdateTaskStatusMutation({
      onSuccessCallback: () => {
        toast.success("Task status updated successfully");
        // Refetch projects to get updated task data
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      },
      onErrorCallback: (error) => {
        const errorMessage =
          error?.message || "Failed to update task status. Please try again.";
        toast.error(errorMessage);
      },
    });

  // Fetch all users for assignment dropdown
  const { allUsersData: usersData, isLoading: isLoadingUsers } =
    useAllUsersQuery();

  // Fetch all projects for project selection
  const { allProjectsData: projectsData, isLoading: isLoadingProjects } =
    useAllProjectsQuery();

  // Set default selections when data is loaded
  useEffect(() => {
    if (projectsData && projectsData.length > 0 && !selectedProjectId) {
      setSelectedProjectId(projectsData[0].id);
    }
  }, [projectsData, selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId && projectsData) {
      const selectedProject = projectsData.find(
        (project) => project.id === selectedProjectId
      );
      if (
        selectedProject?.milestones &&
        selectedProject.milestones.length > 0 &&
        !selectedMilestoneId
      ) {
        // Filter out support milestones and select the first non-support milestone
        const filteredMilestones = selectedProject.milestones.filter(
          (milestone) => !milestone.name?.toLowerCase().includes("support")
        );
        if (filteredMilestones.length > 0) {
          setSelectedMilestoneId(filteredMilestones[0].id || "");
        }
      }
    }
  }, [selectedProjectId, projectsData, selectedMilestoneId]);

  useEffect(() => {
    if (
      usersData?.data?.list &&
      usersData.data.list.length > 0 &&
      !selectedAssignedTo
    ) {
      setSelectedAssignedTo(usersData.data.list[0].id);
    }
  }, [usersData, selectedAssignedTo]);

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

  // Prepare milestone options based on selected project from projects data
  const milestoneOptions = React.useMemo(() => {
    if (!selectedProjectId) {
      return [{ label: "Select a project first", value: "" }];
    }

    if (!projectsData) {
      return [{ label: "Loading projects...", value: "" }];
    }

    const selectedProject = projectsData.find(
      (project) => project.id === selectedProjectId
    );
    if (!selectedProject?.milestones) {
      return [{ label: "No milestones found", value: "" }];
    }

    // Filter out support milestones
    const filteredMilestones = selectedProject.milestones.filter(
      (milestone) => !milestone.name?.toLowerCase().includes("support")
    );

    if (filteredMilestones.length === 0) {
      return [{ label: "No milestones found", value: "" }];
    }

    return [
      { label: "Select a milestone", value: "" },
      ...filteredMilestones.map((milestone) => ({
        label: milestone.name,
        value: milestone.id || "",
      })),
    ];
  }, [selectedProjectId, projectsData]);

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

  // Create task mutation
  const { onCreateMilestoneTask, isPending: isCreatingTask } =
    useCreateMilestoneTaskMutation({
      onSuccessCallback: () => {
        toast.success("Task created successfully");
        setShowAddTaskModal(false);
        // Refetch projects to get updated task data
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      },
      onErrorCallback: (error) => {
        const errorMessage =
          error?.message || "Failed to create task. Please try again.";
        toast.error(errorMessage);
      },
    });

  // Task Data Transformation - Extract tasks from projects data
  const taskList: TaskRow[] = React.useMemo(() => {
    if (!projectsData) return [];

    const allTasks: TaskRow[] = [];

    projectsData.forEach((project) => {
      project.milestones?.forEach((milestone) => {
        milestone.tasks?.forEach((task) => {
          // Get staff name from assigned_to
          const getStaffName = (assignedTo: string) => {
            if (!usersData?.data?.list) return "-";
            const user = usersData.data.list.find((u) => u.id === assignedTo);
            return user ? `${user.first_name} ${user.last_name}` : "-";
          };

          allTasks.push({
            id: task.id,
            title: task.title,
            description: task.description || "-",
            status: task.status || "-",
            priority: task.priority || "Medium",
            due_date: task.due_date ? formatDate(task.due_date) : "-",
            assigned_to: task.assigned_to || "",
            milestoneId: milestone.id || "",
            projectId: project.id || "",
            projectName: project.name || "-",
            milestoneName: milestone.name || "-",
            clientName: project.client?.name || "-",
            clientNumber: project.client?.contact_number || "-",
            staffName: getStaffName(task.assigned_to || ""),
            created_at: task.created_at ? formatDate(task.created_at) : "-",
            updated_at: task.updated_at ? formatDate(task.updated_at) : "-",
          });
        });
      });
    });

    return allTasks;
  }, [projectsData, usersData]);

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

  const taskListColumn: ITableColumn<TaskRow>[] = [
    {
      header: "STATUS",
      accessor: "status",
      cell: ({ row, value }) => (
        <div className="min-w-[9rem] 2xl:min-w-[9vw] flex justify-center">
          {isUpdatingTaskStatus ? (
            <span className="text-blue-500 text-sm">Updating...</span>
          ) : (
            <Dropdown
              options={[
                { label: "Open", value: "Open" },
                { label: "In Progress", value: "In Progress" },
                { label: "Completed", value: "Completed" },
              ]}
              value={String((value as string) ?? "")}
              onChange={(val) =>
                onUpdateTaskStatus({
                  taskId: String(row.id),
                  status: val,
                })
              }
              dropdownWidth="w-[10rem] 2xl:w-[10vw]"
            />
          )}
        </div>
      ),
    },
    { header: "TASK NAME", accessor: "title" },
    { header: "DESCRIPTION", accessor: "description" },
    {
      header: "PRIORITY",
      accessor: "priority",
      cell: ({ value }) => {
        return (
          <div className="flex justify-center">
            <span className={`px-2 py-1 text-xs font-medium `}>
              {(value as string) || "Medium"}
            </span>
          </div>
        );
      },
    },
    { header: "STAFF NAME", accessor: "staffName" },
    { header: "PROJECT NAME", accessor: "projectName" },
    { header: "MILESTONE NAME", accessor: "milestoneName" },
    { header: "CLIENT NAME", accessor: "clientName" },
    { header: "CLIENT NUMBER", accessor: "clientNumber" },
    { header: "DUE DATE", accessor: "due_date" },
    { header: "CREATED AT", accessor: "created_at" },
  ];

  const taskListAction: ITableAction<TaskRow>[] = [
    {
      label: "View",
      onClick: (row: TaskRow) => {
        router.push(
          `/admin/project-management/${row.projectId}/${row.milestoneId}/${row.id}`
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
        {/* Task Table Component */}
        <div className="mt-6 2xl:mt-[1.5vw]">
          <TaskTable
            userRole={userRole}
            tasksLoading={isLoadingProjects}
            tasksError={false}
            tasksErrorObj={null}
            taskList={taskList}
            taskListColumn={taskListColumn}
            taskListAction={taskListAction}
            onAddTask={() => setShowAddTaskModal(true)}
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
        {userRole.toLocaleLowerCase() === "admin" && (
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
        )}
        {/* Add Task Modal */}
        {showAddTaskModal && (
          <AddTaskModal
            isOpen={showAddTaskModal}
            onClose={() => setShowAddTaskModal(false)}
            onSubmit={async (values) => {
              await onCreateMilestoneTask({
                title: values.title,
                description: values.description,
                due_date: values.due_date,
                status: values.status,
                priority: values.priority,
                assigned_to: values.assigned_to,
                milestone_id: values.milestone_id,
              });
            }}
            initialValues={{
              title: "",
              description: "",
              due_date: new Date().toISOString().slice(0, 10),
              status: "Open",
              priority: "Medium",
              assigned_to: selectedAssignedTo,
              milestone_id: selectedMilestoneId,
            }}
            isPending={isCreatingTask}
            isEdit={false}
            projectOptions={projectOptions}
            milestoneOptions={milestoneOptions}
            userOptions={userOptions}
            selectedProjectId={selectedProjectId}
            onProjectChange={handleProjectChange}
          />
        )}
      </div>
    </div>
  );
}
