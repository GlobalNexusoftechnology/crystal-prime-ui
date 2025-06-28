"use client";

import React, { useState } from "react";
import { Task } from "./components";
import { AddSquareIcon } from "@/features";
import { useDeleteMilestoneTaskMutation, useAllUsersQuery } from "@/services";

interface TaskType {
    id: number;
    name: string;
    description: string;
    assignedTo: string;
    status: string;
    dueDate: string;
}

export function TaskTabs({
  tasksData = [],
}: {
  tasksData?: TaskType[],
}) {
  // Task state
  const [tasks, setTasks] = useState(tasksData || []);
  const [editingTask, setEditingTask] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<TaskType | null>(null);
  const [taskMenu, setTaskMenu] = useState<number | null>(null);

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

  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);

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
    setTasks((prev) =>
      prev.map((t) => (t.id === editTask.id ? { ...editTask } : t))
    );
    setEditingTask(null);
    setEditTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    setDeletingTaskId(taskId);
    onDeleteMilestoneTask(taskId.toString());
  };

  const handleAddTask = () => {
    const newId = (Math.max(0, ...tasks.map((t) => t.id)) + 1);
    const newTask: TaskType = {
      id: newId,
      name: "",
      description: "",
      assignedTo: "--",
      status: "Open",
      dueDate: new Date().toISOString().slice(0, 10),
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
