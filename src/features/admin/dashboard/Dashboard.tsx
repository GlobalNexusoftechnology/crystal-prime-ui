"use client";

import React, { useState, useEffect } from "react";
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
  useAllUsersQuery,
  useUpdateTaskStatusMutation,
  useCreateMilestoneTaskMutation,
  useUpdateMilestoneTaskMutation,
  useDeleteMilestoneTaskMutation,
  useAuthStore,
} from "@/services";
import type { ICreateProjectTask } from "@/services";

import { AnalyticalCardIcon } from "@/features";
import { AddTaskModal, SimpleDropdown, DeleteModal } from "@/components";

import TaskTable from "./components/TaskTable";
import type { ITableAction, ITableColumn } from "@/constants/table";

import type { TaskRow } from "./components/TaskTable";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/helpers/formatDate";
import toast from "react-hot-toast";

export default function Dashboard() {
  const router = useRouter();

  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<TaskRow | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string>("");
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>("");
  const [selectedAssignedTo, setSelectedAssignedTo] = useState<string>("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editInitialValues, setEditInitialValues] =
    useState<ICreateProjectTask>({
      title: "",
      description: "",
      due_date: new Date().toISOString().slice(0, 10),
      status: "Open",
      priority: "Medium",
      assigned_to: "",
      milestone_id: "",
    });

  // State to track which descriptions are expanded
  const [expandedDescriptions, setExpandedDescriptions] = useState<Set<string>>(
    new Set()
  );

  // State for task status filter
  const [selectedTaskStatus, setSelectedTaskStatus] = useState<string>("");

  const { dashboardSummary, isLoading, error } = useDashboardSummaryQuery();
  const { activeSession } = useAuthStore();
  const userRole = activeSession?.user?.role?.role || "";

  const handleProjectChange = (projectId: string) => {
    setSelectedProjectId(projectId);
    setSelectedMilestoneId(""); // Reset milestone when project changes
  };
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
  const { allUsersData: usersData } = useAllUsersQuery();

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

  // Helper function to get task count by status
  const getTaskCountByStatus = (status: string) => {
    switch (status) {
      case "completed":
        return `${statsData?.taskStat?.completedTasks || 0} Task`;
      case "inprogress":
        return `${statsData?.taskStat?.inprogressTasks || 0} Task`;
      case "open":
        return `${statsData?.taskStat?.openTasks || 0} Task`;
      default:
        return `${statsData?.taskStat?.totalTasks || 0} Task`;
    }
  };

  // Handler for task status change
  const handleTaskStatusChange = (newStatus: string) => {
    setSelectedTaskStatus(newStatus);
  };

  // Handler for deleting a task
  const handleDeleteTask = async () => {
    if (!taskToDelete) return;

    try {
      // Find the project and milestone to get the task data
      const project = projectsData?.find(
        (p) => p.id === taskToDelete.projectId
      );
      const milestone = project?.milestones?.find(
        (m) => m.id === taskToDelete.milestoneId
      );
      const taskToDeleteData = milestone?.tasks?.find(
        (t) => t.id === taskToDelete.id
      );

      if (!taskToDeleteData) {
        toast.error("Task not found");
        return;
      }

      // Call the delete mutation and await completion to avoid race conditions
      await onDeleteMilestoneTaskAsync(String(taskToDelete.id));

      // Close modal and reset state
      setShowDeleteModal(false);
      setTaskToDelete(null);

      // Notify and refresh once
      toast.success("Task deleted successfully");
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task. Please try again.");
    }
  };

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

  // Update task mutation
  const { onUpdateMilestoneTask, isPending: isUpdatingMilestoneTask } =
    useUpdateMilestoneTaskMutation({
      onSuccessCallback: () => {
        toast.success("Task updated successfully");
        setShowAddTaskModal(false);
        setEditingTaskId(null);
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      },
      onErrorCallback: (error) => {
        const errorMessage =
          error?.message || "Failed to update task. Please try again.";
        toast.error(errorMessage);
      },
    });

  // Delete task mutation
  const { onDeleteMilestoneTaskAsync, isPending: isDeletingTask } =
    useDeleteMilestoneTaskMutation({
      // Success handled after awaiting mutation in handler to prevent double reload/toast
      onSuccessCallback: () => {},
      onErrorCallback: (error) => {
        const errorMessage =
          error?.message || "Failed to delete task. Please try again.";
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
            delay_days: task.delay_days || 0,
            created_at: task.created_at ? formatDate(task.created_at) : "-",
            updated_at: task.updated_at ? formatDate(task.updated_at) : "-",
            // Add raw date for sorting
            rawCreatedAt: task.created_at,
          });
        });
      });
    });

    // Sort tasks by creation date (newest first)
    allTasks.sort((a, b) => {
      if (!a.rawCreatedAt || !b.rawCreatedAt) return 0;
      return (
        new Date(b.rawCreatedAt).getTime() - new Date(a.rawCreatedAt).getTime()
      );
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
          count: getTaskCountByStatus(selectedTaskStatus),
          title: "All Task",
          subtitle: "All Task",
          icon: <AnalyticalCardIcon />,
          customContent: (
            <div className="flex flex-col items-start gap-2">
              <SimpleDropdown
                options={[
                  { label: "All Task", value: "" },
                  { label: "Completed", value: "completed" },
                  { label: "In Progress", value: "inprogress" },
                  { label: "Open", value: "open" },
                ]}
                value={selectedTaskStatus}
                onChange={(newStatus) => handleTaskStatusChange(newStatus)}
                dropdownWidth="w-40 2xl:w-[11.5vw]"
                dropdownBorderRadius="rounded-md"
                buttonClassName="text-sm"
              />
            </div>
          ),
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
            <SimpleDropdown
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
    {
      header: "PRIORITY",
      accessor: "priority",
      cell: ({ value }) => {
        return (
          <div className="flex justify-center">
            <span
              className={`px-2 2xl:px-[0.5vw] py-1 2xl:py-[0.5vw] text-xs 2xl:text-[0.9vw] font-medium `}
            >
              {(value as string) || "Medium"}
            </span>
          </div>
        );
      },
    },
    { header: "TASK NAME", accessor: "title" },
    {
      header: "DESCRIPTION",
      accessor: "description",
      cell: ({ value, row }) => {
        const description = value as string;
        const isExpanded = expandedDescriptions.has(String(row.id));

        const words = description?.split(" ") || [];
        const shouldTruncate = words.length > 10;
        const displayText = isExpanded
          ? description
          : words.slice(0, 10).join(" ") + (shouldTruncate ? "..." : "");

        const toggleExpanded = () => {
          const newExpanded = new Set(expandedDescriptions);
          if (isExpanded) {
            newExpanded.delete(String(row.id));
          } else {
            newExpanded.add(String(row.id));
          }
          setExpandedDescriptions(newExpanded);
        };

        return (
          <div className="w-[20rem] 2xl:w-[20vw] text-left text-sm 2xl:text-[0.9vw]">
            <div className="text-wrap">
              {displayText}
              {shouldTruncate && (
                <button
                  onClick={toggleExpanded}
                  className="text-blue-500 hover:text-blue-700 text-xs 2xl:text-[0.75vw] font-medium underline relative left-1 bottom-[1px] 2xl:bottom-[0.1vw]"
                >
                  {isExpanded ? "Read less" : "Read more"}
                </button>
              )}
            </div>
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
    { header: "DELAY DAY", accessor: "delay_days" },
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
    {
      label: "Edit",
      onClick: (row: TaskRow) => {
        // Find raw task data from projectsData to avoid formatted fields
        const project = projectsData?.find((p) => p.id === row.projectId);
        const milestone = project?.milestones?.find(
          (m) => m.id === row.milestoneId
        );
        const task = milestone?.tasks?.find((t) => t.id === row.id);

        // Fallbacks if data is missing
        const dueRaw = task?.due_date
          ? new Date(task.due_date).toISOString().slice(0, 10)
          : new Date().toISOString().slice(0, 10);

        setSelectedProjectId(row.projectId || "");
        setSelectedMilestoneId(row.milestoneId || "");
        setSelectedAssignedTo(task?.assigned_to ?? "");

        setEditInitialValues({
          title: task?.title || row.title || "",
          description: task?.description || (row.description as string) || "",
          due_date: dueRaw,
          status:
            (task?.status as "Open" | "In Progress" | "Completed") ||
            (row.status as "Open" | "In Progress" | "Completed") ||
            "Open",
          priority:
            (task?.priority as "Critical" | "High" | "Medium" | "Low") ||
            (row.priority as "Critical" | "High" | "Medium" | "Low") ||
            "Medium",
          assigned_to: task?.assigned_to || "",
          milestone_id: row.milestoneId || "",
        });

        setEditingTaskId(String(row.id));
        setShowAddTaskModal(true);
      },
      className: "text-amber-600 whitespace-nowrap",
    },
    {
      label: "Delete",
      onClick: (row: TaskRow) => {
        setTaskToDelete(row);
        setShowDeleteModal(true);
      },
      className: "text-red-600 whitespace-nowrap",
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
            onClose={() => {
              setShowAddTaskModal(false);
              setSelectedAssignedTo("");
              setEditingTaskId(null);
            }}
            onSubmit={async (values: ICreateProjectTask) => {
              if (editingTaskId) {
                await onUpdateMilestoneTask({
                  taskId: editingTaskId,
                  payload: {
                    title: values.title,
                    description: values.description,
                    due_date: values.due_date,
                    status: values.status,
                    priority: values.priority,
                    assigned_to: values.assigned_to,
                    milestone_id: values.milestone_id,
                  },
                });
              } else {
                await onCreateMilestoneTask({
                  title: values.title,
                  description: values.description,
                  due_date: values.due_date,
                  status: values.status,
                  priority: values.priority,
                  assigned_to: values.assigned_to,
                  milestone_id: values.milestone_id,
                });
              }
            }}
            initialValues={
              editingTaskId
                ? editInitialValues
                : {
                    title: "",
                    description: "",
                    due_date: new Date().toISOString().slice(0, 10),
                    status: "Open",
                    priority: "Medium",
                    assigned_to: selectedAssignedTo || "",
                    milestone_id: selectedMilestoneId || "",
                  }
            }
            isPending={editingTaskId ? isUpdatingMilestoneTask : isCreatingTask}
            isEdit={Boolean(editingTaskId)}
            projectOptions={projectOptions}
            milestoneOptions={milestoneOptions}
            userOptions={userOptions}
            selectedProjectId={selectedProjectId}
            onProjectChange={handleProjectChange}
          />
        )}

        {/* Delete Modal */}
        {showDeleteModal && taskToDelete && (
          <DeleteModal
            isOpen={showDeleteModal}
            onClose={() => {
              setShowDeleteModal(false);
              setTaskToDelete(null);
            }}
            onConfirm={handleDeleteTask}
            title="Delete Task"
            message="Are you sure you want to delete the task "
            itemName={taskToDelete.title}
            isLoading={isDeletingTask}
          />
        )}
      </div>
    </div>
  );
}
