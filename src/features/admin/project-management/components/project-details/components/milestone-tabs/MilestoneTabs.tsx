"use client";

import React, { useEffect, useRef, useState } from "react";
import { Milestone, Task } from "./components";
import { AddSquareIcon } from "@/features";
import {
  useDeleteMilestoneMutation,
  useDeleteMilestoneTaskMutation,
  useCreateMilestoneMutation,
  useUpdateMilestoneMutation,
  useCreateMilestoneTaskMutation,
  useUpdateMilestoneTaskMutation,
  useAllUsersQuery,
  IProjectTaskResponse,
} from "@/services";
import toast from "react-hot-toast";
import { usePermission } from "@/utils/hooks/usePermission";
import { EAction, EModule } from "@/constants";
import { DeleteModal } from "@/components";

type LocalTask = {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  due_date: string;
};

const tabs = ["Milestones"];

export function MilestoneTabs({
  milestoneData = [],
  projectId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  milestoneData?: any[];
  projectId: string;
}) {
  // Milestone/task state
  const [milestones, setMilestones] = useState(milestoneData || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editMilestone, setEditMilestone] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editingTask, setEditingTask] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [editTask, setEditTask] = useState<any>(null);
  const [milestoneMenu, setMilestoneMenu] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [taskMenu, setTaskMenu] = useState<any>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>(
    milestoneData.map((m: Milestone) => m.id)
  );

  // Error states for validation
  const [milestoneErrors, setMilestoneErrors] = useState<{
    [key: string]: string;
  }>({});
  const [taskErrors, setTaskErrors] = useState<{ [key: string]: string }>({});

  // User options
  const {
    allUsersData,
    isLoading: usersLoading,
    isError: usersError,
  } = useAllUsersQuery();
  const userOptions = usersLoading
    ? [{ label: "Loading...", value: "" }]
    : usersError || !allUsersData
    ? [{ label: "Error loading users", value: "" }]
    : (allUsersData?.data?.list || []).map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      }));

  const statusOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
    { label: "Cancelled", value: "Cancelled" },
    { label: "On Hold", value: "On Hold" },
  ];

  // Delete milestone mutation
  const { onDeleteMilestone } = useDeleteMilestoneMutation({
    onSuccessCallback: () => {
      setMilestones((prev) => prev.filter((m) => m.id !== deletingMilestoneId));
      setShowDeleteMilestoneModal(false);
      setDeletingMilestoneId(null);
      setMilestoneMenu(null);
      toast.success("Milestone deleted successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete milestone");
      setShowDeleteMilestoneModal(false);
      setDeletingMilestoneId(null);
    },
  });
  // Delete task mutation
  const { onDeleteMilestoneTask } = useDeleteMilestoneTaskMutation({
    onSuccessCallback: () => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === deletingTaskMilestoneId
            ? {
                ...m,
                tasks: m.tasks.filter(
                  (t: LocalTask) => t.id !== deletingTaskId
                ),
              }
            : m
        )
      );
      setDeletingTaskId(null);
      setTaskMenu(null);
      toast.success("Task deleted successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete task");
    },
  });

  // Create milestone mutation
  const { onCreateMilestone } = useCreateMilestoneMutation({
    onSuccessCallback: (data) => {
      // Add the new milestone to the list
      setMilestones((prev) => [
        ...prev,
        {
          id: data.id,
          name: data.name,
          description: data.description || "",
          assigned_to: data.assigned_to || "",
          status: data.status || "Open",
          start_date: data.start_date || "",
          end_date: data.end_date || "",
          tasks: [],
        },
      ]);
      setEditingId(null);
      setEditMilestone(null);
      setMilestoneErrors({});
      toast.success("Milestone created successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to create milestone");
    },
  });

  // Update milestone mutation
  const { onUpdateMilestone } = useUpdateMilestoneMutation({
    onSuccessCallback: (data) => {
      // Update the milestone in the list
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === data.id
            ? {
                id: data.id,
                name: data.name,
                description: data.description || "",
                assigned_to: data.assigned_to || "",
                status: data.status || "Open",
                start_date: data.start_date || "",
                end_date: data.end_date || "",
                tasks: m.tasks,
              }
            : m
        )
      );
      setEditingId(null);
      setEditMilestone(null);
      setMilestoneErrors({});
      toast.success("Milestone updated successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update milestone");
    },
  });

  // Create milestone task mutation
  const { onCreateMilestoneTask } = useCreateMilestoneTaskMutation({
    onSuccessCallback: (data) => {
      // Add the new task to the appropriate milestone
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingTask?.milestoneId
            ? {
                ...m,
                tasks: [
                  ...m.tasks,
                  {
                    id: data.id,
                    title: data.title,
                    description: data.description || "",
                    assigned_to: data.assigned_to || "",
                    status: data.status || "Open",
                    due_date: data.due_date || "",
                  },
                ],
              }
            : m
        )
      );
      setEditingTask(null);
      setEditTask(null);
      setTaskErrors({});
      toast.success("Task created successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to create task");
    },
  });

  // Update milestone task mutation
  const { onUpdateMilestoneTask } = useUpdateMilestoneTaskMutation({
    onSuccessCallback: (data) => {
      // Update the task in the appropriate milestone
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingTask?.milestoneId
            ? {
                ...m,
                tasks: m.tasks.map((t: LocalTask) =>
                  t.id === data.id
                    ? {
                        id: data.id,
                        title: data.title,
                        description: data.description || "",
                        assigned_to: data.assigned_to || "",
                        status: data.status || "Open",
                        due_date: data.due_date || "",
                      }
                    : t
                ),
              }
            : m
        )
      );
      setEditingTask(null);
      setEditTask(null);
      setTaskErrors({});
      toast.success("Task updated successfully");

      // Refetch data to ensure consistency
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update task");
    },
  });

  // Track which milestone/task is being deleted
  const [deletingMilestoneId, setDeletingMilestoneId] = useState<string | null>(
    null
  );
  const [showDeleteMilestoneModal, setShowDeleteMilestoneModal] =
    useState(false);
  const [deletingTaskMilestoneId, setDeletingTaskMilestoneId] = useState<
    string | null
  >(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Validation functions
  const validateMilestone = (milestone: {
    name: string;
    description: string;
    assigned_to: string;
    status: string;
    start_date: string;
    end_date: string;
  }) => {
    const errors: { [key: string]: string } = {};

    if (!milestone.name || milestone.name.trim() === "") {
      errors.name = "Milestone name is required";
    }
    if (!milestone.description || milestone.description.trim() === "") {
      errors.description = "Milestone description is required";
    }
    if (!milestone.assigned_to || milestone.assigned_to === "--") {
      errors.assigned_to = "Please assign to someone";
    }
    if (!milestone.status) {
      errors.status = "Status is required";
    }
    if (!milestone.start_date) {
      errors.start_date = "Start date is required";
    }
    if (!milestone.end_date) {
      errors.end_date = "End date is required";
    }

    setMilestoneErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateTask = (task: {
    title: string;
    description: string;
    assigned_to: string;
    status: string;
    due_date: string;
  }) => {
    const errors: { [key: string]: string } = {};

    if (!task.title || task.title.trim() === "") {
      errors.title = "Task title is required";
    }
    if (!task.description || task.description.trim() === "") {
      errors.description = "Task description is required";
    }
    if (!task.assigned_to || task.assigned_to === "--") {
      errors.assigned_to = "Please assign to someone";
    }
    if (!task.status) {
      errors.status = "Status is required";
    }
    if (!task.due_date) {
      errors.due_date = "Due date is required";
    }

    setTaskErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isMilestoneValid = (milestone: {
    name: string;
    description: string;
    assigned_to: string;
    status: string;
    start_date: string;
    end_date: string;
  }) => {
    return (
      milestone.name &&
      milestone.name.trim() !== "" &&
      milestone.description &&
      milestone.description.trim() !== "" &&
      milestone.assigned_to &&
      milestone.assigned_to !== "--" &&
      milestone.status &&
      milestone.start_date &&
      milestone.end_date
    );
  };

  const isTaskValid = (task: {
    title: string;
    description: string;
    assigned_to: string;
    status: string;
    due_date: string;
  }) => {
    return (
      task.title &&
      task.title.trim() !== "" &&
      task.description &&
      task.description.trim() !== "" &&
      task.assigned_to &&
      task.assigned_to !== "--" &&
      task.status &&
      task.due_date
    );
  };

  const hasIncompleteMilestone = () => {
    return milestones.some(
      (m) => m.id.startsWith("temp_") && !isMilestoneValid(m)
    );
  };

  const hasIncompleteTask = (milestoneId: string) => {
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (!milestone) return false;
    return milestone.tasks.some(
      (t: LocalTask) => t.id.startsWith("temp_") && !isTaskValid(t)
    );
  };

  // Handlers
  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (milestone: any) => {
    setEditingId(milestone.id);
    setEditMilestone({
      ...milestone,
      start_date: milestone.start_date ? milestone.start_date.slice(0, 10) : new Date().toISOString().slice(0, 10),
      end_date: milestone.end_date ? milestone.end_date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    });
    setMilestoneMenu(null);
  };
  const handleCancel = () => {
    // If this is a temporary milestone (new one being created), remove it
    if (
      editMilestone &&
      editMilestone.id &&
      editMilestone.id.startsWith("temp_")
    ) {
      setMilestones((prev) => prev.filter((m) => m.id !== editMilestone.id));
    }
    setEditingId(null);
    setEditMilestone(null);
    setMilestoneErrors({});
  };
  const handleSave = () => {
    if (!editMilestone) return;

    // Validate milestone before saving
    if (!validateMilestone(editMilestone)) {
      return; // Don't show toast, validation errors are shown in fields
    }

    // Check if this is a new milestone (temporary ID) or existing one
    const isNewMilestone =
      editMilestone.id && editMilestone.id.startsWith("temp_");

    if (isNewMilestone) {
      // Create new milestone
      const payload = {
        name: editMilestone.name,
        description: editMilestone.description,
        assigned_to:
          editMilestone.assigned_to === "--"
            ? undefined
            : editMilestone.assigned_to,
        status: editMilestone.status,
        start_date: editMilestone.start_date,
        end_date: editMilestone.end_date,
        project_id: projectId,
      };
      onCreateMilestone(payload);
    } else {
      // Update existing milestone
      const payload = {
        name: editMilestone.name,
        description: editMilestone.description,
        assigned_to:
          editMilestone.assigned_to === "--"
            ? undefined
            : editMilestone.assigned_to,
        status: editMilestone.status,
        start_date: editMilestone.start_date,
        end_date: editMilestone.end_date,
        project_id: projectId,
      };
      onUpdateMilestone({ milestoneId: editMilestone.id, payload });
    }
  };
  const handleDeleteMilestone = (id: string) => {
    setDeletingMilestoneId(id);
    setShowDeleteMilestoneModal(true);
  };
  const handleAddMilestone = () => {
    // Check if there's an incomplete milestone
    if (hasIncompleteMilestone()) {
      toast.error(
        "Please complete the current milestone before adding a new one"
      );
      return;
    }

    const newId = `temp_${Date.now()}`;
    const newMilestone = {
      id: newId,
      name: "",
      description: "",
      assigned_to: "--",
      status: "Open",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      tasks: [],
    };
    // Add to the top
    setMilestones((prev) => [newMilestone, ...prev]);
    setEditingId(newId);
    setEditMilestone(newMilestone);
    setMilestoneErrors({});
  };
  // Task handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditTask = (milestoneId: string, task: any) => {
    setEditingTask({ milestoneId, taskId: task.id });
    setEditTask({ ...task });
    setTaskMenu(null);
    setTaskErrors({});
  };
  const handleCancelTask = () => {
    // If this is a temporary task (new one being created), remove it
    if (
      editTask &&
      editTask.id &&
      editTask.id.startsWith("temp_") &&
      editingTask
    ) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingTask.milestoneId
            ? {
                ...m,
                tasks: m.tasks.filter((t: LocalTask) => t.id !== editTask.id),
              }
            : m
        )
      );
    }
    setEditingTask(null);
    setEditTask(null);
    setTaskErrors({});
  };
  const handleSaveTask = () => {
    if (!editTask || !editingTask) return;

    // Validate task before saving
    if (!validateTask(editTask)) {
      return; // Don't show toast, validation errors are shown in fields
    }

    // Check if this is a new task (temporary ID) or existing one
    const isNewTask = editTask.id && editTask.id.startsWith("temp_");

    if (isNewTask) {
      // Create new task
      const payload = {
        title: editTask.title,
        description: editTask.description,
        assigned_to:
          editTask.assigned_to === "--" ? undefined : editTask.assigned_to,
        status: editTask.status,
        due_date: editTask.due_date,
        milestone_id: editingTask.milestoneId,
      };
      onCreateMilestoneTask(payload);
    } else {
      // Update existing task
      const payload = {
        title: editTask.title,
        description: editTask.description,
        assigned_to:
          editTask.assigned_to === "--" ? undefined : editTask.assigned_to,
        status: editTask.status,
        due_date: editTask.due_date,
        milestone_id: editingTask.milestoneId,
      };
      onUpdateMilestoneTask({ taskId: editTask.id, payload });
    }
  };
  const handleDeleteTask = (milestoneId: string, taskId: string) => {
    setDeletingTaskMilestoneId(milestoneId);
    setDeletingTaskId(taskId);
    onDeleteMilestoneTask(taskId);
  };
  const handleAddTask = (milestoneId: string) => {
    // Check if milestone is valid before allowing task add
    const milestone = milestones.find((m) => m.id === milestoneId);
    if (!milestone || !isMilestoneValid(milestone)) {
      toast.error(
        "Please complete and save the milestone before adding a task."
      );
      return;
    }
    // Check if there's an incomplete task in this milestone
    if (hasIncompleteTask(milestoneId)) {
      toast.error("Please complete the current task before adding a new one");
      return;
    }
    const newId = `temp_${Date.now()}`;
    const newTask = {
      id: newId,
      title: "",
      description: "",
      assigned_to: "--",
      status: "Open",
      due_date: new Date().toISOString().slice(0, 10),
    };
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId ? { ...m, tasks: [...m.tasks, newTask] } : m
      )
    );
    setEditingTask({ milestoneId, taskId: newId });
    setEditTask(newTask);
  };

  const [activeTab, setActiveTab] = useState("Milestones");
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showForm]);

  useEffect(() => {
    setExpandedMilestones(milestones.map((m: Milestone) => m.id));
  }, [milestones]);

  const handleMilestoneChange = (updatedMilestone: {
    name: string;
    description: string;
    assigned_to: string;
    status: string;
    start_date: string;
    end_date: string;
  }) => {
    setEditMilestone(updatedMilestone);
    // Clear specific field errors when user makes changes
    if (
      milestoneErrors.name &&
      updatedMilestone.name &&
      updatedMilestone.name.trim() !== ""
    ) {
      setMilestoneErrors((prev) => ({ ...prev, name: "" }));
    }
    if (
      milestoneErrors.description &&
      updatedMilestone.description &&
      updatedMilestone.description.trim() !== ""
    ) {
      setMilestoneErrors((prev) => ({ ...prev, description: "" }));
    }
    if (
      milestoneErrors.assigned_to &&
      updatedMilestone.assigned_to &&
      updatedMilestone.assigned_to !== "--"
    ) {
      setMilestoneErrors((prev) => ({ ...prev, assigned_to: "" }));
    }
    if (milestoneErrors.status && updatedMilestone.status) {
      setMilestoneErrors((prev) => ({ ...prev, status: "" }));
    }
    if (milestoneErrors.start_date && updatedMilestone.start_date) {
      setMilestoneErrors((prev) => ({ ...prev, start_date: "" }));
    }
    if (milestoneErrors.end_date && updatedMilestone.end_date) {
      setMilestoneErrors((prev) => ({ ...prev, end_date: "" }));
    }
  };

  const handleTaskChange = (updatedTask: {
    title: string;
    description: string;
    assigned_to: string;
    status: string;
    due_date: string;
  }) => {
    setEditTask(updatedTask);

    // Clear specific field errors when user makes changes
    if (
      taskErrors.title &&
      updatedTask.title &&
      updatedTask.title.trim() !== ""
    ) {
      setTaskErrors((prev) => ({ ...prev, title: "" }));
    }
    if (
      taskErrors.description &&
      updatedTask.description &&
      updatedTask.description.trim() !== ""
    ) {
      setTaskErrors((prev) => ({ ...prev, description: "" }));
    }
    if (
      taskErrors.assigned_to &&
      updatedTask.assigned_to &&
      updatedTask.assigned_to !== "--"
    ) {
      setTaskErrors((prev) => ({ ...prev, assigned_to: "" }));
    }
    if (taskErrors.status && updatedTask.status) {
      setTaskErrors((prev) => ({ ...prev, status: "" }));
    }
    if (taskErrors.due_date && updatedTask.due_date) {
      setTaskErrors((prev) => ({ ...prev, due_date: "" }));
    }
  };

  // Permission checks
  const { hasPermission } = usePermission();
  const canAddMilestone = hasPermission(EModule.MILESTONE, EAction.ADD);
  const canEditMilestone = hasPermission(EModule.MILESTONE, EAction.EDIT);
  const canDeleteMilestone = hasPermission(EModule.MILESTONE, EAction.DELETE);
  const canViewMilestone = hasPermission(EModule.MILESTONE, EAction.VIEW);

  // Task permission checks
  const canAddTask = hasPermission(EModule.TASK, EAction.ADD);
  const canViewTask = hasPermission(EModule.TASK, EAction.VIEW);
  const canEditTask = hasPermission(EModule.TASK, EAction.EDIT);
  const canDeleteTask = hasPermission(EModule.TASK, EAction.DELETE);

  const confirmDeleteMilestone = () => {
    if (deletingMilestoneId) {
      onDeleteMilestone(deletingMilestoneId);
      setShowDeleteMilestoneModal(false);
    }
  };

  const milestoneNameToDelete = deletingMilestoneId
    ? milestones.find((m) => m.id === deletingMilestoneId)?.name
    : "";

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]"
    >
      {/* Tabs */}
      <div className="flex gap-8 2xl:gap-[2vw] items-center">
        <div className="flex gap-8 2xl:gap-[2vw]">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${
                activeTab === tab ? "" : "text-gray-500"
              }`}
              onClick={() => {
                setActiveTab(tab);
                setShowForm(false);
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Milestones" && (
          <div className="mb-4 2xl:mb-[1vw]">
            <div className="overflow-x-auto">
              <table className="border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
                <thead>
                  <tr className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                    <th className="text-left p-2 2xl:p-[0.5vw] flex items-center gap-4 2xl:gap-[1vw] min-w-[20rem] 2xl:min-w-[20vw]">
                      <span>Milestone Name</span>
                      {canAddMilestone && (
                        <button
                          className="text-purple-500 hover:text-purple-700 text-lg"
                          title="Add Milestone"
                          type="button"
                          onClick={handleAddMilestone}
                        >
                          <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                        </button>
                      )}
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[15rem] 2xl:min-w-[15vw]">
                      Description
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[14rem] 2xl:min-w-[14vw]">
                      Assigned To
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[8rem] 2xl:min-w-[8vw]">
                      Status
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[12rem] 2xl:min-w-[12vw]">
                      Estimated Start Date
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[12rem] 2xl:min-w-[12vw]">
                      Estimated End Date
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {milestones.map((milestone) => (
                    <React.Fragment key={milestone.id}>
                      <Milestone
                        milestone={milestone}
                        editingId={editingId}
                        editMilestone={editMilestone}
                        onEdit={handleEdit}
                        onDelete={handleDeleteMilestone}
                        onSave={handleSave}
                        onCancel={handleCancel}
                        onChange={handleMilestoneChange}
                        onToggle={toggleMilestone}
                        expanded={expandedMilestones.includes(milestone.id)}
                        menuOpen={milestoneMenu}
                        setMenuOpen={setMilestoneMenu}
                        userOptions={userOptions}
                        statusOptions={statusOptions}
                        projectId={projectId}
                        errors={milestoneErrors}
                        canEditMilestone={canEditMilestone}
                        canDeleteMilestone={canDeleteMilestone}
                        canViewMilestone={canViewMilestone}
                      />
                      {(expandedMilestones.includes(milestone.id) ||
                        editingId === milestone.id) && (
                        <tr className="bg-gray-50 2xl:bg-gray-100]">
                          <td colSpan={7} className="p-0">
                            <table>
                              <thead>
                                <tr className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                                  <th className=" px-2 2xl:px-[0.5vw] pl-32 2xl:pl-[8vw] py-2 2xl:py-[0.5vw] text-left flex items-center gap-4 2xl:gap-[1vw] min-w-[20rem] 2xl:min-w-[20vw]">
                                    <span>Task Name</span>
                                    {canAddTask && (
                                      <button
                                        className="text-purple-500 hover:text-purple-700 text-lg"
                                        title="Add Task"
                                        type="button"
                                        onClick={() =>
                                          handleAddTask(milestone.id)
                                        }
                                      >
                                        <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                                      </button>
                                    )}
                                  </th>
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">
                                    Description
                                  </th>
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">
                                    Assigned To
                                  </th>
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[8rem] 2xl:min-w-[8vw]">
                                    Status
                                  </th>
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                                    Due Date
                                  </th>
                                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {milestone.tasks.map(
                                  (task: IProjectTaskResponse) => (
                                    <Task
                                      key={task.id}
                                      task={task}
                                      editingTask={editingTask}
                                      editTask={editTask}
                                      onEdit={handleEditTask}
                                      onDelete={handleDeleteTask}
                                      onSave={handleSaveTask}
                                      onCancel={handleCancelTask}
                                      onChange={handleTaskChange}
                                      menuOpen={taskMenu}
                                      setMenuOpen={setTaskMenu}
                                      userOptions={userOptions}
                                      statusOptions={statusOptions}
                                      milestoneId={milestone.id}
                                      projectId={projectId}
                                      errors={taskErrors}
                                      canViewTask={canViewTask}
                                      canEditTask={canEditTask}
                                      canDeleteTask={canDeleteTask}
                                    />
                                  )
                                )}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <DeleteModal
        isOpen={showDeleteMilestoneModal}
        onClose={() => {
          setShowDeleteMilestoneModal(false);
          setDeletingMilestoneId(null);
        }}
        onConfirm={confirmDeleteMilestone}
        isLoading={false}
        title="Delete Milestone"
        message="Are you sure you want to delete this milestone "
        itemName={milestoneNameToDelete}
      />
      <div ref={bottomRef} />
    </div>
  );
}
