"use client"
import React, { useState } from "react";
import { Dropdown, Button } from "@/components";
import { AddSquareIcon } from "@/features";
import { Milestone, Task } from "./components";

interface Step2MilestoneSetupProps {
  onBack: () => void;
  onNext: () => void;
}

interface Task {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

interface Milestone {
  id: number;
  name: string;
  assignedTo: string;
  status: string;
  estimatedStart: string;
  estimatedEnd: string;
  tasks: Task[];
}

// Mock options
const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];
const userOptions = [
  { label: "--", value: "--" },
  { label: "Ramesh Gupta", value: "Ramesh Gupta" },
  { label: "Nisha Sharma", value: "Nisha Sharma" },
];

export function Step2MilestoneSetup({
  onBack,
  onNext,
}: Step2MilestoneSetupProps) {
  // Editable milestone state
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 1,
      name: "Dashboard For Admin",
      assignedTo: "--",
      status: "Open",
      estimatedStart: "2021-02-24",
      estimatedEnd: "2021-02-24",
      tasks: [],
    },
    {
      id: 2,
      name: "Customer section",
      assignedTo: "Ramesh Gupta",
      status: "Open",
      estimatedStart: "2021-02-24",
      estimatedEnd: "2021-02-24",
      tasks: [
        {
          id: 1,
          name: "Product List",
          description: "This Project Belongs to ...",
          assignedTo: "Ramesh Gupta",
          status: "Open",
          dueDate: "2021-02-24",
        },
        {
          id: 2,
          name: "Offer List",
          description: "This Project Belongs to ...",
          assignedTo: "Ramesh Gupta",
          status: "Open",
          dueDate: "2021-02-24",
        },
      ],
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editMilestone, setEditMilestone] = useState<Milestone | null>(null);
  // Task editing state
  const [editingTask, setEditingTask] = useState<{
    milestoneId: number;
    taskId: number;
  } | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  // 3-dots menu state
  const [milestoneMenu, setMilestoneMenu] = useState<number | null>(null);
  const [taskMenu, setTaskMenu] = useState<{
    milestoneId: number;
    taskId: number;
  } | null>(null);

  // Mock project template dropdown
  const projectTemplateOptions = [
    { label: "Select Project Template", value: "" },
    { label: "Product Overview", value: "product_overview" },
    { label: "Update Details", value: "update_details" },
  ];
  const [projectTemplate, setProjectTemplate] = useState("");

  // Add expandedMilestones state
  const [expandedMilestones, setExpandedMilestones] = useState<number[]>([]);

  // Toggle expand/collapse for milestone
  const toggleMilestone = (id: number) => {
    setExpandedMilestones((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  // Milestone handlers
  const handleEdit = (milestone: Milestone) => {
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
  // Add new milestone
  const handleAddMilestone = () => {
    const newId = Math.max(0, ...milestones.map((m) => m.id)) + 1;
    const newMilestone: Milestone = {
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
  const handleEditTask = (milestoneId: number, task: Task) => {
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
            tasks: m.tasks.map((t) =>
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
          ? { ...m, tasks: m.tasks.filter((t) => t.id !== taskId) }
          : m
      )
    );
    setTaskMenu(null);
  };
  // Add new task
  const handleAddTask = (milestoneId: number) => {
    const newId =
      Math.max(0, ...milestones.flatMap((m) => m.tasks.map((t) => t.id))) + 1;
    const newTask: Task = {
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

  return (
    <div className="flex flex-col gap-6 2xl:gap-[2vw]">
      {/* Project Template Dropdown */}
      <div className="mb-4 2xl:mb-[1vw]">
        <Dropdown
          label="Project Template"
          options={projectTemplateOptions}
          value={projectTemplate}
          onChange={setProjectTemplate}
          dropdownWidth="w-full"
          error={undefined}
        />
      </div>
      {/* Milestone Table */}
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
                            {milestone.tasks.map((task) => (
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
      {/* Action Buttons */}
      <div className="flex justify-start items-center mt-6 2xl:mt-[1.5vw] gap-4 2xl:gap-[1vw]">
        <Button
          title="Back"
          variant="primary-outline"
          onClick={onBack}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
        <Button
          title="Next"
          onClick={onNext}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
      </div>
    </div>
  );
}
