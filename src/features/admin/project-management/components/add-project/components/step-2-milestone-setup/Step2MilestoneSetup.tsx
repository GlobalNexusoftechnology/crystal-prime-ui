"use client"
import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "@/components";
import { AddSquareIcon } from "@/features";
import { Milestone, Task } from "./components";
import { IUsersDetails, useAllUsersQuery } from "@/services";

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
  start_date?: string;
  end_date?: string;
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

// Add local types for editing
export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  due_date: string;
}

export interface Milestone {
  id: string;
  name: string;
  assigned_to: string;
  status: string;
  start_date: string;
  end_date: string;
  tasks: Task[];
}

interface Step2MilestoneSetupProps {
  onBack: () => void;
  onNext: (milestones: Milestone[]) => void;
  milestoneOption: string;
  projectTemplateOptions: { label: string; value: string }[];
  projectTemplateLoading: boolean;
  projectTemplateError: boolean;
  allProjectTemplatesData?: AllProjectTemplatesData;
  initialMilestones?: Milestone[];
  projectTemplate: string;
  setProjectTemplate: (id: string) => void;
}

// Mock options
const statusOptions = [
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Completed", value: "Completed" },
];

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
        assigned_to: m.assigned_to || "",
        status: m.status || "Open",
        start_date: m.start_date || "",
        end_date: m.end_date || "",
        tasks: (m.project_task_master || []).map((t, tIdx) => ({
          id: t.id || String(tIdx),
          title: t.title,
          description: t.description,
          assigned_to: t.assigned_to || "",
          status: t.status || "Open",
          due_date: t.due_date || "",
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
        assigned_to: m.assigned_to || "",
        status: m.status || "Open",
        start_date: m.start_date || "",
        end_date: m.end_date || "",
        tasks: (m.tasks || []).map(t => ({
          id: t.id || "",
          title: t.title,
          description: t.description || "",
          assigned_to: t.assigned_to || "",
          status: t.status || "Open",
          due_date: t.due_date || "",
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
      assigned_to: "--",
      status: "Open",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
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
                      title: editTask.title || "",
                      description: editTask.description || "",
                      assigned_to: editTask.assigned_to || "",
                      status: editTask.status || "",
                      due_date: editTask.due_date || "",
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
    setEditingTask({ milestoneId, taskId: newTask.id });
    setEditTask(newTask);
  };

  const isTemplateSelected = milestoneOption === "template";

  // When user clicks next, pass milestones to parent
  const handleNext = () => {
    const backendMilestones: Milestone[] = milestones.map(m => ({
      id: m.id,
      name: m.name,
      assigned_to: m.assigned_to,
      status: m.status,
      start_date: m.start_date,
      end_date: m.end_date,
      project: {
        id: "dummy_project_id",
        name: "dummy_project_name",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        deleted: false,
        deleted_at: null,
        status: "Active",
        client: {
          id: "dummy_client_id",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          deleted: false,
          deleted_at: null,
          name: "dummy_client_name",
          email: "dummy@email.com",
          contact_number: "0000000000",
          address: "dummy address",
          website: "dummy.com",
          company_name: "dummy company",
          contact_person: "dummy person",
          lead_id: null,
          client_details: []
        },
        milestones: [],
        documents: [],
      },
      tasks: m.tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        assigned_to: t.assigned_to,
        status: t.status,
        due_date: t.due_date,
        created_at: "",
        updated_at: "",
        deleted: false,
        deleted_at: null,
      })),
    }));
    onNext(backendMilestones); // Cast if needed for type compatibility
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
