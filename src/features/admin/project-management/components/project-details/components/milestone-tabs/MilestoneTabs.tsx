"use client";

import { Button } from "@/components";
import React, { useEffect, useRef, useState } from "react";
import { Followups, Milestone, Task } from "./components";
import { AddSquareIcon } from "@/features";
import { useDeleteMilestoneMutation, useDeleteMilestoneTaskMutation, useAllUsersQuery, IProjectTaskResponse } from "@/services";
import toast from "react-hot-toast";

type LocalTask = { id: string; title: string; description: string; assigned_to: string; status: string; due_date: string };

const tabs = ["Milestones"];

export function MilestoneTabs({
  milestoneData = [],
  projectId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  milestoneData?: any[],
  projectId: string,
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
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>([]);

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

  // Delete milestone mutation
  const { onDeleteMilestone } = useDeleteMilestoneMutation({
    onSuccessCallback: () => {
      setMilestones((prev) => prev.filter((m) => m.id !== deletingMilestoneId));
      setMilestoneMenu(null);
    },
    onErrorCallback: (err) => {
      toast.error(err.message)
    },
  });
  // Delete task mutation
  const { onDeleteMilestoneTask } = useDeleteMilestoneTaskMutation({
    onSuccessCallback: () => {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === deletingTaskMilestoneId
            ? { ...m, tasks: m.tasks.filter((t: LocalTask) => t.id !== deletingTaskId) }
            : m
        )
      );
      setTaskMenu(null);
    },
    onErrorCallback: (err) => {
      console.log(err)
    },
  });
  // Track which milestone/task is being deleted
  const [deletingMilestoneId, setDeletingMilestoneId] = useState<string | null>(null);
  const [deletingTaskMilestoneId, setDeletingTaskMilestoneId] = useState<string | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

  // Handlers
  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (milestone: any) => {
    setEditingId(milestone.id);
    setEditMilestone({ ...milestone });
    setMilestoneMenu(null);
  };
  const handleCancel = () => {
    setEditingId(null);
    setEditMilestone(null);
  };
  const handleSave = () => {
    if (!editMilestone) return;
    setMilestones((prev) =>
      prev.map((m) => (m.id === editMilestone.id ? { ...editMilestone } : m))
    );
    setEditingId(null);
    setEditMilestone(null);
  };
  const handleDeleteMilestone = (id: string) => {
    setDeletingMilestoneId(id);
    onDeleteMilestone(id);
  };
  const handleAddMilestone = () => {
    const newId = (Math.max(0, ...milestones.map((m) => Number(m.id) || 0)) + 1).toString();
    const newMilestone = {
      id: newId,
      name: "",
      assigned_to: "--",
      status: "Open",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      tasks: [],
    };
    setMilestones((prev) => [...prev, newMilestone]);
    setEditingId(newId);
    setEditMilestone(newMilestone);
  };
  // Task handlers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEditTask = (milestoneId: string, task: any) => {
    setEditingTask({ milestoneId, taskId: task.id });
    setEditTask({ ...task });
    setTaskMenu(null);
  };
  const handleCancelTask = () => {
    setEditingTask(null);
    setEditTask(null);
  };
  const handleSaveTask = () => {
    if (!editTask || !editingTask) return;
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === editingTask.milestoneId
          ? {
            ...m,
            tasks: m.tasks.map((t: LocalTask) =>
              t.id === editTask.id ? { ...editTask } : t
            ),
          }
          : m
      )
    );
    setEditingTask(null);
    setEditTask(null);
  };
  const handleDeleteTask = (milestoneId: string, taskId: string) => {
    setDeletingTaskMilestoneId(milestoneId);
    setDeletingTaskId(taskId);
    onDeleteMilestoneTask(taskId);
  };
  const handleAddTask = (milestoneId: string) => {
    const newId = (
      Math.max(0, ...milestones.flatMap((m) => m.tasks.map((t: LocalTask) => Number(t.id) || 0))) + 1
    ).toString();
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
              className={` 2xl:gap-[2vw] font-medium text-[1.2rem] 2xl:text-[1.2vw] ${activeTab === tab
                ? ""
                : "text-gray-500"
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
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="flex items-center gap-2 2xl:gap-[0.5vw] text-primary text-[1rem] 2xl:text-[1vw]"
        >
          <span>
            {showForm ? (
              "Close"
            ) : (
              <>
                {activeTab === "Milestones" ? (
                  null
                ) : (
                  <Button title="Add followup" variant="primary-outline" />
                )}
              </>
            )}
          </span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === "Milestones" && (
          <div className="mb-4 2xl:mb-[1vw]">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
                <thead>
                  <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                    <th className="text-left p-2 2xl:p-[0.5vw] flex items-center gap-4 2xl:gap-[1vw]">
                      <span>Milestone Name</span>
                      <button
                        className="text-purple-500 hover:text-purple-700 text-lg"
                        title="Add Milestone"
                        type="button"
                        onClick={handleAddMilestone}
                      >
                        <AddSquareIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                      </button>
                    </th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Assigned To</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Status</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated Start Date</th>
                    <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">Estimated End Date</th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
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
                        onChange={setEditMilestone}
                        onToggle={toggleMilestone}
                        expanded={expandedMilestones.includes(milestone.id)}
                        menuOpen={milestoneMenu}
                        setMenuOpen={setMilestoneMenu}
                        userOptions={userOptions}
                        statusOptions={statusOptions}
                        projectId={projectId}
                      />
                      {(expandedMilestones.includes(milestone.id) || editingId === milestone.id) && (
                        <tr className="bg-gray-50 2xl:bg-gray-100">
                          <td colSpan={6} className="p-0">
                            <table className="w-full">
                              <thead>
                                <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                                  <th className="pl-8 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] text-left flex items-center gap-4 2xl:gap-[1vw]">
                                    <span>Task Name</span>
                                    <button
                                      className="text-purple-500 hover:text-purple-700 text-lg"
                                      title="Add Task"
                                      type="button"
                                      onClick={() => handleAddTask(milestone.id)}
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
                                {milestone.tasks.map((task: IProjectTaskResponse) => (
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
                                    milestoneId={milestone.id}
                                    projectId={projectId}
                                  />
                                ))}
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
        {activeTab === "Followup's" && (
          <Followups
            projectId={projectId}
            showForm={showForm}
            setShowForm={setShowForm}
          />
        )}
      </div>

      <div ref={bottomRef} />
    </div>
  );
}
