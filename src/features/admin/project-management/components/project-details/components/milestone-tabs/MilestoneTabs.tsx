"use client";

import { Button } from "@/components";
import { useEffect, useRef, useState } from "react";
import { Followups, Milestone, Task } from "./components";
import { AddSquareIcon } from "@/features";
import React from "react";
import { useAllUsersQuery } from "@/services";

const tabs = ["Milestones", "Followup's"];

export function MilestoneTabs({
  miletonesData = [],
  projectId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  miletonesData?: any[],
  projectId: string,
}) {
  // Milestone/task state
  const [milestones, setMilestones] = useState(miletonesData || []);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMilestone, setEditMilestone] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [editTask, setEditTask] = useState<any>(null);
  const [milestoneMenu, setMilestoneMenu] = useState<number | null>(null);
  const [taskMenu, setTaskMenu] = useState<any>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([]);

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

  // Handlers
  const toggleMilestone = (id: number) => {
    setExpandedMilestones((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };
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
  const handleDeleteMilestone = (id: number) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setMilestoneMenu(null);
  };
  const handleAddMilestone = () => {
    const newId = Math.max(0, ...milestones.map((m) => m.id)) + 1;
    const newMilestone = {
      id: newId,
      name: "",
      assignedTo: "--",
      status: "Open",
      estimatedStart: new Date().toISOString().slice(0, 10),
      estimatedEnd: new Date().toISOString().slice(0, 10),
      tasks: [],
    };
    setMilestones((prev) => [...prev, newMilestone]);
    setEditingId(newId);
    setEditMilestone(newMilestone);
  };
  // Task handlers
  const handleEditTask = (milestoneId: number, task: any) => {
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
              tasks: m.tasks.map((t: any) =>
                t.id === editTask.id ? { ...editTask } : t
              ),
            }
          : m
      )
    );
    setEditingTask(null);
    setEditTask(null);
  };
  const handleDeleteTask = (milestoneId: number, taskId: number) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === milestoneId
          ? { ...m, tasks: m.tasks.filter((t: any) => t.id !== taskId) }
          : m
      )
    );
    setTaskMenu(null);
  };
  const handleAddTask = (milestoneId: number) => {
    const newId =
      Math.max(0, ...milestones.flatMap((m) => m.tasks.map((t: any) => t.id))) + 1;
    const newTask = {
      id: newId,
      name: "",
      description: "",
      assignedTo: "--",
      status: "Open",
      dueDate: new Date().toISOString().slice(0, 10),
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
              className={` 2xl:gap-[2vw] font-medium text-[1rem] 2xl:text-[1vw] ${activeTab === tab
                ? "border-b-2 border-primary text-primary"
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
                                {milestone.tasks.map((task: any) => (
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
