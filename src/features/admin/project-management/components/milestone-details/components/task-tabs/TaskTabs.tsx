"use client";

import { Button } from "@/components";
import { useEffect, useRef, useState } from "react";
import { Comments, Task } from "./components";
import { AddSquareIcon } from "@/features";
import React from "react";
import { useAllUsersQuery } from "@/services";

export function TaskTabs({
  tasksData = [],
  projectId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tasksData?: any[],
  projectId: string,
}) {
  // Task state
  const [tasks, setTasks] = useState(tasksData || []);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editTask, setEditTask] = useState<any>(null);
  const [taskMenu, setTaskMenu] = useState<any>(null);

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

  // Task handlers
  const handleEditTask = (task: any) => {
    setEditingTask(task.id);
    setEditTask({ ...task });
    setTaskMenu(null);
  };
  const handleCancelTask = () => {
    setEditingTask(null);
    setEditTask(null);
  };
  const handleSaveTask = () => {
    if (!editTask || editingTask === null) return;
    setTasks((prev) =>
      prev.map((t: any) => (t.id === editTask.id ? { ...editTask } : t))
    );
    setEditingTask(null);
    setEditTask(null);
  };
  const handleDeleteTask = (taskId: number) => {
    setTasks((prev) => prev.filter((t: any) => t.id !== taskId));
    setTaskMenu(null);
  };
  const handleAddTask = () => {
    const newId = Math.max(0, ...tasks.map((t: any) => t.id)) + 1;
    const newTask = {
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

  const [activeTab, setActiveTab] = useState("Tasks");
  const [showForm, setShowForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showForm && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [showForm]);

  return (
    <div
      ref={containerRef}
      className="flex flex-col gap-8 2xl:gap-[2vw] p-4 2xl:px-[1vw]"
    >
      {/* Tab Contents */}
      <div className="mb-4 2xl:mb-[1vw]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="pl-8 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] text-left flex items-center gap-4 2xl:gap-[1vw]">
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
              {tasks.map((task: any) => (
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
      <div ref={bottomRef} />
    </div>
  );
}
