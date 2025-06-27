"use client"
import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "@/components";
import { AddSquareIcon } from "@/features";
import { Milestone, Task } from "./components";
import { IUsersDetails, useAllUsersQuery, IProjectMilestoneResponse } from "@/services";

interface ProjectTaskMaster {
  id: string;
  title: string;
  description: string;
  assigned_to?: string;
  status?: string;
  due_date?: string;
}

interface ProjectMilestoneMaster {
  id: string;
  name: string;
  assigned_to?: string;
  status?: string;
  estimated_start?: string;
  estimated_end?: string;
  project_task_master?: ProjectTaskMaster[];
}

interface ProjectTemplate {
  id: string;
  name: string;
  project_milestone_master?: ProjectMilestoneMaster[];
}

interface AllProjectTemplatesData {
  templates: ProjectTemplate[];
}

interface Step2MilestoneSetupProps {
  onBack: () => void;
  onNext: (milestones: IProjectMilestoneResponse[]) => void;
  milestoneOption: string;
  projectTemplateOptions: { label: string; value: string }[];
  projectTemplateLoading: boolean;
  projectTemplateError: boolean;
  allProjectTemplatesData?: AllProjectTemplatesData;
  initialMilestones?: IProjectMilestoneResponse[];
  projectTemplate: string;
  setProjectTemplate: (id: string) => void;
}

// Mock options
const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

// Add local types for editing
export interface Task {
  id: string;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

export interface Milestone {
  id: string;
  name: string;
  assignedTo: string;
  status: string;
  estimatedStart: string;
  estimatedEnd: string;
  tasks: Task[];
}

export function Step2MilestoneSetup({
  onBack,
  onNext,
  milestoneOption,
  projectTemplateOptions,
  projectTemplateLoading,
  projectTemplateError,
  allProjectTemplatesData,
  initialMilestones,
  projectTemplate,
  setProjectTemplate,
}: Step2MilestoneSetupProps) {
  // Editable milestone state
  const [milestones, setMilestones] = useState<Milestone[]>(initialMilestones || []);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMilestone, setEditMilestone] = useState<Milestone | null>(null);
  // Task editing state
  const [editingTask, setEditingTask] = useState<{
    milestoneId: string;
    taskId: string;
  } | null>(null);
  const [editTask, setEditTask] = useState<Task | null>(null);
  // 3-dots menu state
  const [milestoneMenu, setMilestoneMenu] = useState<string | null>(null);
  const [taskMenu, setTaskMenu] = useState<{
    milestoneId: string;
    taskId: string;
  } | null>(null);

  // Fetch users for userOptions
  const { allUsersData, isLoading: usersLoading, isError: usersError } = useAllUsersQuery();
  const userOptions = usersLoading
    ? [{ label: "Loading...", value: "" }]
    : usersError || !allUsersData
      ? [{ label: "Error loading users", value: "" }]
      : (allUsersData as IUsersDetails[]).map((user: IUsersDetails) => ({
          label: `${user.first_name} ${user.last_name}`,
          value: `${user.first_name} ${user.last_name}`,
        }));

  // Auto-populate milestones/tasks when a template is selected
  useEffect(() => {
    if (!projectTemplate || !allProjectTemplatesData) return;
    const selectedTemplate = (allProjectTemplatesData.templates || []).find(
      (tpl) => tpl.id === projectTemplate
    );
    if (selectedTemplate) {
      const mappedMilestones: Milestone[] = (selectedTemplate.project_milestone_master || []).map((m, idx) => ({
        id: m.id || String(idx),
        name: m.name,
        assignedTo: m.assigned_to || "",
        status: m.status || "Open",
        estimatedStart: m.estimated_start || "",
        estimatedEnd: m.estimated_end || "",
        tasks: (m.project_task_master || []).map((t, tIdx) => ({
          id: t.id || String(tIdx),
          name: t.title,
          description: t.description,
          assignedTo: t.assigned_to || "",
          status: t.status || "Open",
          dueDate: t.due_date || "",
        })),
      }));
      setMilestones(mappedMilestones);
    }
  }, [projectTemplate, allProjectTemplatesData]);

  useEffect(() => {
    if (initialMilestones && initialMilestones.length > 0) {
      setMilestones(initialMilestones.map(m => ({
        id: m.id || "",
        name: m.name,
        assignedTo: m.assigned_to || "",
        status: m.status || "Open",
        estimatedStart: m.start_date || "",
        estimatedEnd: m.end_date || "",
        tasks: (m.tasks || []).map(t => ({
          id: t.id || "",
          name: t.title,
          description: t.description || "",
          assignedTo: t.assigned_to || "",
          status: t.status || "Open",
          dueDate: t.due_date || "",
        })),
      })));
    }
  }, [initialMilestones]);

  // Add expandedMilestones state
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>([]);

  // Toggle expand/collapse for milestone
  const toggleMilestone = (id: string) => {
    setExpandedMilestones((prev) =>
      prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]
    );
  };

  // Milestone handlers
  const handleEdit = (milestone: Milestone) => {
    setEditingId(milestone?.id ?? null);
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
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setMilestoneMenu(null);
  };
  // Add new milestone
  const handleAddMilestone = () => {
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      name: "",
      assignedTo: "--",
      status: "Open",
      estimatedStart: new Date().toISOString().slice(0, 10),
      estimatedEnd: new Date().toISOString().slice(0, 10),
      tasks: [],
    };
    setMilestones((prev) => [...prev, newMilestone]);
    setEditingId(newMilestone.id);
    setEditMilestone(newMilestone);
  };
  // Task handlers
  const handleEditTask = (milestoneId: string, task: Task) => {
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
                t.id === editTask.id
                  ? {
                      ...t,
                      name: editTask.name || "",
                      description: editTask.description || "",
                      assignedTo: editTask.assignedTo || "",
                      status: editTask.status || "",
                      dueDate: editTask.dueDate || "",
                    }
                  : t
              ),
            }
          : m
      )
    );
    setEditingTask(null);
    setEditTask(null);
  };
  const handleDeleteTask = (milestoneId: string, taskId: string) => {
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
  const handleAddTask = (milestoneId: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
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
    setEditingTask({ milestoneId, taskId: newTask.id });
    setEditTask(newTask);
  };

  const isTemplateSelected = milestoneOption === "template";

  // When user clicks next, pass milestones to parent
  const handleNext = () => {
    const backendMilestones: IProjectMilestoneResponse[] = milestones.map(m => ({
      id: m.id,
      name: m.name,
      assigned_to: m.assignedTo,
      status: m.status,
      start_date: m.estimatedStart,
      end_date: m.estimatedEnd,
      project: {},
      tasks: m.tasks.map(t => ({
        id: t.id,
        title: t.name,
        description: t.description,
        assigned_to: t.assignedTo,
        status: t.status,
        due_date: t.dueDate,
        created_at: "",
        updated_at: "",
        deleted: false,
        deleted_at: null,
      })),
    }));
    onNext(backendMilestones);
  };

  return (
    <div className="flex flex-col gap-6 2xl:gap-[2vw]">
      {/* Project Template Dropdown */}
      {isTemplateSelected && (
        <div className="mb-4 2xl:mb-[1vw]">
          <Dropdown
            label="Project Template"
            options={projectTemplateLoading
              ? [{ label: "Loading...", value: "" }]
              : projectTemplateError
                ? [{ label: "Error loading templates", value: "" }]
                : projectTemplateOptions}
            value={projectTemplate}
            onChange={setProjectTemplate}
            dropdownWidth="w-full"
            error={undefined}
          />
        </div>
      )}
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
          onClick={handleNext}
          width="w-full md:w-[10rem] 2xl:w-[10vw]"
        />
      </div>
    </div>
  );
}
