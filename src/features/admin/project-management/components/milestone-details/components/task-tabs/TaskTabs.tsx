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
    },
    onErrorCallback: (err) => {
      console.log(err)
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
      toast.success("Task created successfully");
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
      toast.success("Task updated successfully");
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to update task");
    },
  });

  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Task handlers
  const handleEditTask = (task: TaskType) => {
    setEditingTask(task.id);
    setEditTask({ ...task });
    setTaskMenu(null);
  };

  const handleCancelTask = () => {
    setEditingTask(null);
    setEditTask(null);
  };

  const handleSaveTask = () => {
    if (!editTask || !editingTask) return;
    
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
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[2vw] p-4 2xl:px-[1vw]">
      {/* Task Table */}
      <div className="mb-4 2xl:mb-[1vw]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="text-left p-2 2xl:p-[0.5vw] flex items-center gap-4 2xl:gap-[1vw]">
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
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Description</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Assigned To</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Status</th>
                <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Due Date</th>
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
                  onChange={setEditTask}
                  menuOpen={taskMenu}
                  setMenuOpen={setTaskMenu}
                  userOptions={userOptions}
                  statusOptions={statusOptions}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
