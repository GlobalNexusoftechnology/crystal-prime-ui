"use client";

import React, { useState } from "react";
import { Task } from "./components";
import { AddSquareIcon } from "@/features";
import { 
  useDeleteMilestoneTaskMutation, 
  useCreateMilestoneTaskMutation,
  useUpdateMilestoneTaskMutation,
  useAllUsersQuery 
} from "@/services";
import toast from "react-hot-toast";

interface TaskType {
    id: string;
    name: string;
    description: string;
    assigned_to: string;
    status: string;
    due_date: string;
    projectId?: string;
    milestoneId?: string;
}

export function TaskTabs({
  tasksData = [],
  milestoneId,
}: {
  tasksData?: TaskType[],
  milestoneId?: string,
}) {
  // Task state
  const [tasks, setTasks] = useState(tasksData || []);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [taskMenu, setTaskMenu] = useState<string | null>(null);

  // Error states for validation
  const [taskErrors, setTaskErrors] = useState<{[key: string]: string}>({});

  // User options
  const { allUsersData, isLoading: usersLoading, isError: usersError } = useAllUsersQuery();
  const userOptions = usersLoading
    ? [{ label: "Loading...", value: "" }]
    : usersError || !allUsersData
      ? [{ label: "Error loading users", value: "" }]
      : allUsersData.map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      }));

  const statusOptions = [
    { label: "Open", value: "Open" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ];

  // Delete task mutation
  const { onDeleteMilestoneTask } = useDeleteMilestoneTaskMutation({
    onSuccessCallback: () => {
      setTasks((prev) => prev.filter((t) => t.id !== deletingTaskId));
      setTaskMenu(null);
      toast.success("Task deleted successfully");
      
      // Refetch data to ensure consistency
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete task");
    },
  });

  // Create task mutation
  const { onCreateMilestoneTask } = useCreateMilestoneTaskMutation({
    onSuccessCallback: (data) => {
      setTasks((prev) => [...prev, {
        id: data.id,
        name: data.title,
        description: data.description || '',
        assigned_to: data.assigned_to || '',
        status: data.status || 'Open',
        due_date: data.due_date || '',
        projectId: undefined,
        milestoneId: milestoneId,
      }]);
      setEditingTask(null);
      setEditTask(null);
      setTaskErrors({});
      toast.success("Task created successfully");
      
      // Refetch data to ensure consistency
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to create task");
    },
  });

  // Update task mutation
  const { onUpdateMilestoneTask } = useUpdateMilestoneTaskMutation({
    onSuccessCallback: (data) => {
      setTasks((prev) =>
        prev.map((t) => 
          t.id === data.id
            ? {
                id: data.id,
                name: data.title,
                description: data.description || '',
                assigned_to: data.assigned_to || '',
                status: data.status || 'Open',
                due_date: data.due_date || '',
                projectId: t.projectId,
                milestoneId: t.milestoneId,
              }
            : t
        )
      );
      setEditingTask(null);
      setEditTask(null);
      setTaskErrors({});
      toast.success("Task updated successfully");
      
      // Refetch data to ensure consistency
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update task");
    },
  });

  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Validation functions
  const validateTask = (task: TaskType) => {
    const errors: {[key: string]: string} = {};
    
    if (!task.name || task.name.trim() === "") {
      errors.name = "Task name is required";
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

  const isTaskValid = (task: TaskType) => {
    return task.name && 
           task.name.trim() !== "" && 
           task.description && 
           task.description.trim() !== "" &&
           task.assigned_to && 
           task.assigned_to !== "--" &&
           task.status &&
           task.due_date;
  };

  const hasIncompleteTask = () => {
    return tasks.some(t => t.id.startsWith('temp_') && !isTaskValid(t));
  };

  // Task handlers
  const handleEditTask = (task: TaskType) => {
    setEditingTask(task.id);
    setEditTask({ ...task });
    setTaskMenu(null);
    setTaskErrors({});
  };

  const handleCancelTask = () => {
    // If this is a temporary task (new one being created), remove it
    if (editTask && editTask.id && editTask.id.startsWith('temp_')) {
      setTasks((prev) => prev.filter((t) => t.id !== editTask.id));
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
    const isNewTask = editTask.id && editTask.id.startsWith('temp_');
    
    if (isNewTask) {
      // Create new task
      const payload = {
        title: editTask.name,
        description: editTask.description,
        assigned_to: editTask.assigned_to === "--" ? undefined : editTask.assigned_to,
        status: editTask.status,
        due_date: editTask.due_date,
        milestone_id: milestoneId || editTask.milestoneId || '',
      };
      onCreateMilestoneTask(payload);
    } else {
      // Update existing task
      const payload = {
        title: editTask.name,
        description: editTask.description,
        assigned_to: editTask.assigned_to === "--" ? undefined : editTask.assigned_to,
        status: editTask.status,
        due_date: editTask.due_date,
        milestone_id: milestoneId || editTask.milestoneId || '',
      };
      onUpdateMilestoneTask({ taskId: editTask.id, payload });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    setDeletingTaskId(taskId);
    onDeleteMilestoneTask(taskId);
  };

  const handleAddTask = () => {
    // Check if there's an incomplete task
    if (hasIncompleteTask()) {
      toast.error("Please complete the current task before adding a new one");
      return;
    }

    const newId = `temp_${Date.now()}`;
    const newTask: TaskType = {
      id: newId,
      name: "",
      description: "",
      assigned_to: "--",
      status: "Open",
      due_date: new Date().toISOString().slice(0, 10),
      milestoneId: milestoneId,
    };
    setTasks((prev) => [...prev, newTask]);
    setEditingTask(newId);
    setEditTask(newTask);
    setTaskErrors({});
  };

  const handleTaskChange = (updatedTask: TaskType) => {
    setEditTask(updatedTask);
    
    // Clear specific field errors when user makes changes
    if (taskErrors.name && updatedTask.name && updatedTask.name.trim() !== "") {
      setTaskErrors(prev => ({ ...prev, name: "" }));
    }
    if (taskErrors.description && updatedTask.description && updatedTask.description.trim() !== "") {
      setTaskErrors(prev => ({ ...prev, description: "" }));
    }
    if (taskErrors.assigned_to && updatedTask.assigned_to && updatedTask.assigned_to !== "--") {
      setTaskErrors(prev => ({ ...prev, assigned_to: "" }));
    }
    if (taskErrors.status && updatedTask.status) {
      setTaskErrors(prev => ({ ...prev, status: "" }));
    }
    if (taskErrors.due_date && updatedTask.due_date) {
      setTaskErrors(prev => ({ ...prev, due_date: "" }));
    }
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
      {/* Task Table */}
      <div className="mb-4 2xl:mb-[1vw]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="text-left p-2 2xl:p-[0.5vw] flex items-center gap-4 2xl:gap-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">
                  <span>Task Name</span>
                  <button
                    className="text-purple-500 hover:text-purple-700 text-lg"
                    title="Add Task"
                    type="button"
                    onClick={handleAddTask}
                  >
                    <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                  </button>
                </th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">Description</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">Assigned To</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[5rem] 2xl:min-w-[5vw]">Status</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[15rem] 2xl:min-w-[15vw]">Due Date</th>
                <th className="py-2 2xl:py-[0.5vw]"></th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
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
                  errors={taskErrors}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
