"use client"
import React, { useState, useEffect } from "react";
import { Dropdown, Button } from "@/components";
import { AddSquareIcon } from "@/features";
import { Milestone, Task } from "./components";
import { IUsersDetails, useAllUsersQuery } from "@/services";
import toast from "react-hot-toast";

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
  description?: string;
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
  description: string;
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

  // Flag to prevent multiple template applications
  const [templateApplied, setTemplateApplied] = useState(false);

  // Validation state
  const [milestoneErrors, setMilestoneErrors] = useState<{[key: string]: string}>({});
  // taskErrors: { [milestoneId_taskId]: { title: string, ... } }
  const [taskErrors, setTaskErrors] = useState<{[key: string]: {[key: string]: string}}>({});

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

  // Validation functions
  const validateMilestone = (milestone: Milestone) => {
    const errors: {[key: string]: string} = {};
    
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

  const validateTask = (task: Task, milestoneId: string) => {
    const errors: {[key: string]: string} = {};
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
    setTaskErrors(prev => ({ ...prev, [`${milestoneId}_${task.id}`]: errors }));
    return Object.keys(errors).length === 0;
  };

  const isMilestoneValid = (milestone: Milestone) => {
    return milestone.name && 
           milestone.name.trim() !== "" && 
           milestone.description &&
           milestone.description.trim() !== "" &&
           milestone.assigned_to && 
           milestone.assigned_to !== "--" &&
           milestone.status &&
           milestone.start_date &&
           milestone.end_date;
  };

  const isTaskValid = (task: Task) => {
    return task.title && 
           task.title.trim() !== "" && 
           task.description && 
           task.description.trim() !== "" &&
           task.assigned_to && 
           task.assigned_to !== "--" &&
           task.status &&
           task.due_date;
  };

  const hasIncompleteMilestone = () => {
    return milestones.some(m => !isMilestoneValid(m));
  };

  const hasIncompleteTask = (milestoneId: string) => {
    const milestone = milestones.find(m => m.id === milestoneId);
    if (!milestone) return false;
    return milestone.tasks.some(t => !isTaskValid(t));
  };

  // Auto-populate milestones/tasks when a template is selected
  useEffect(() => {
    if (!projectTemplate || !allProjectTemplatesData || templateApplied) return;
    console.log("Template selected:", projectTemplate);
    console.log("Available templates:", allProjectTemplatesData.templates);
    const selectedTemplate = (allProjectTemplatesData.templates || []).find(
      (tpl) => tpl.id === projectTemplate
    );
    if (selectedTemplate) {
      console.log("Selected template found:", selectedTemplate);
      const mappedMilestones: Milestone[] = (selectedTemplate.project_milestone_master || []).map((m, idx) => ({
        id: m.id || String(idx),
        name: m.name,
        description: m.description || "",
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
      console.log("Setting milestones from template:", mappedMilestones);
      setMilestones(mappedMilestones);
      setTemplateApplied(true);
    } else {
      console.log("Template not found for ID:", projectTemplate);
    }
  }, [projectTemplate, allProjectTemplatesData, templateApplied]);

  // Initialize milestones from existing data (for edit mode)
  useEffect(() => {
    if (initialMilestones && initialMilestones.length > 0 && milestones.length === 0 && !templateApplied) {
      console.log("Setting initial milestones:", initialMilestones);
      setMilestones(initialMilestones.map(m => ({
        id: m.id || "",
        name: m.name,
        description: m.description || "",
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
  }, [initialMilestones, milestones.length, templateApplied]);

  // Reset template applied flag when template changes
  useEffect(() => {
    setTemplateApplied(false);
  }, [projectTemplate]);

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
    setMilestoneErrors({});
  };
  const handleCancel = () => {
    // If this is a new milestone (empty name), remove it from the list
    if (editMilestone && (!editMilestone.name || editMilestone.name.trim() === "")) {
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
      return; // Don't save if validation fails, errors are already displayed
    }
    
    setMilestones((prev) =>
      prev.map((m) => (m.id === editMilestone.id ? { ...editMilestone } : m))
    );
    setEditingId(null);
    setEditMilestone(null);
    setMilestoneErrors({});
  };
  const handleDeleteMilestone = (id: string) => {
    setMilestones((prev) => prev.filter((m) => m.id !== id));
    setMilestoneMenu(null);
  };
  // Add new milestone
  const handleAddMilestone = () => {
    // Check if there's an incomplete milestone
    if (hasIncompleteMilestone()) {
      toast.error("Please complete the current milestone before adding a new one.");
      return;
    }
    
    const newMilestone: Milestone = {
      id: Date.now().toString(),
      name: "",
      description: "",
      assigned_to: "--",
      status: "Open",
      start_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
      tasks: [],
    };
    setMilestones((prev) => [...prev, newMilestone]);
    setEditingId(newMilestone.id);
    setEditMilestone(newMilestone);
    setMilestoneErrors({});
  };
  // Task handlers
  const handleEditTask = (milestoneId: string, task: Task) => {
    setEditingTask({ milestoneId, taskId: task.id });
    setEditTask({ ...task });
    setTaskMenu(null);
    setTaskErrors({});
  };
  const handleCancelTask = () => {
    // If this is a new task (empty title), remove it from the list
    if (editTask && (!editTask.title || editTask.title.trim() === "") && editingTask) {
      setMilestones((prev) =>
        prev.map((m) =>
          m.id === editingTask.milestoneId
            ? { ...m, tasks: m.tasks.filter((t) => t.id !== editTask.id) }
            : m
        )
      );
    }
    // Remove errors for this task
    if (editingTask) {
      setTaskErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`${editingTask.milestoneId}_${editTask?.id}`];
        return newErrors;
      });
    }
    setEditingTask(null);
    setEditTask(null);
  };
  const handleSaveTask = () => {
    if (!editTask || !editingTask) return;
    // Validate task before saving
    if (!validateTask(editTask, editingTask.milestoneId)) {
      return; // Don't save if validation fails, errors are already displayed
    }
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
    // Remove errors for this task
    setTaskErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[`${editingTask.milestoneId}_${editTask.id}`];
      return newErrors;
    });
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
    // Check if there's an incomplete task in this milestone
    if (hasIncompleteTask(milestoneId)) {
      toast.error("Please complete the current task before adding a new one.");
      return;
    }
    
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
    setTaskErrors({});
  };

  // Handle milestone change with error clearing
  const handleMilestoneChange = (updatedMilestone: Milestone) => {
    setEditMilestone(updatedMilestone);
    
    // Clear specific field errors when user makes changes
    if (milestoneErrors.name && updatedMilestone.name && updatedMilestone.name.trim() !== "") {
      setMilestoneErrors(prev => ({ ...prev, name: "" }));
    }
    if (milestoneErrors.description && updatedMilestone.description && updatedMilestone.description.trim() !== "") {
      setMilestoneErrors(prev => ({ ...prev, description: "" }));
    }
    if (milestoneErrors.assigned_to && updatedMilestone.assigned_to && updatedMilestone.assigned_to !== "--") {
      setMilestoneErrors(prev => ({ ...prev, assigned_to: "" }));
    }
    if (milestoneErrors.status && updatedMilestone.status) {
      setMilestoneErrors(prev => ({ ...prev, status: "" }));
    }
    if (milestoneErrors.start_date && updatedMilestone.start_date) {
      setMilestoneErrors(prev => ({ ...prev, start_date: "" }));
    }
    if (milestoneErrors.end_date && updatedMilestone.end_date) {
      setMilestoneErrors(prev => ({ ...prev, end_date: "" }));
    }
  };

  // Handle task change with error clearing
  const handleTaskChange = (updatedTask: Task, milestoneId?: string) => {
    setEditTask(updatedTask);
    const key = `${milestoneId || editingTask?.milestoneId || ''}_${updatedTask.id}`;
    if (taskErrors[key]) {
      const newErrors = { ...taskErrors[key] };
      if (newErrors.title && updatedTask.title && updatedTask.title.trim() !== "") newErrors.title = "";
      if (newErrors.description && updatedTask.description && updatedTask.description.trim() !== "") newErrors.description = "";
      if (newErrors.assigned_to && updatedTask.assigned_to && updatedTask.assigned_to !== "--") newErrors.assigned_to = "";
      if (newErrors.status && updatedTask.status) newErrors.status = "";
      if (newErrors.due_date && updatedTask.due_date) newErrors.due_date = "";
      setTaskErrors(prev => ({ ...prev, [key]: newErrors }));
    }
  };

  const isTemplateSelected = milestoneOption === "template";

  // When user clicks next, pass milestones to parent
  const handleNext = () => {
    // Validate all milestones and tasks before proceeding
    const incompleteMilestones = milestones.filter(m => !isMilestoneValid(m));
    const incompleteTasks = milestones.flatMap(m => 
      m.tasks.filter(t => !isTaskValid(t))
    );

    if (incompleteMilestones.length > 0) {
      toast.error(`Please complete ${incompleteMilestones.length} milestone(s) before proceeding.`);
      return;
    }

    if (incompleteTasks.length > 0) {
      toast.error(`Please complete ${incompleteTasks.length} task(s) before proceeding.`);
      return;
    }

    const backendMilestones: Milestone[] = milestones.map(m => ({
      id: m.id,
      name: m.name,
      description: m.description,
      assigned_to: m.assigned_to,
      status: m.status,
      start_date: m.start_date,
      end_date: m.end_date,
      tasks: m.tasks.map(t => ({
        id: t.id,
        title: t.title,
        description: t.description,
        assigned_to: t.assigned_to,
        status: t.status,
        due_date: t.due_date,
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
            onChange={(value) => {
              console.log("Template dropdown onChange:", value);
              console.log("Previous template:", projectTemplate);
              console.log("Milestone option:", milestoneOption);
              setProjectTemplate(value);
            }}
            dropdownWidth="w-full"
            error={undefined}
          />
        </div>
      )}
      {/* Milestone Table */}
      <div className="mb-4 2xl:mb-[1vw]">
        <h1 className="text-[1.2rem] 2xl:text-[1.2vw]">Milestone</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 2xl:border-spacing-y-[0.5vw]">
            <thead>
              <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                <th className="text-left p-2 2xl:p-[0.5vw] flex items-center gap-4 2xl:gap-[1vw] min-w-[12rem] 2xl:min-w-[12vw]">
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
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Description</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Assigned To</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Status</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[12rem] 2xl:min-w-[12vw]">Estimated Start Date</th>
                <th className="text-left 2xl:text-[1vw] px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">Estimated End Date</th>
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
                    onChange={handleMilestoneChange}
                    onToggle={toggleMilestone}
                    expanded={expandedMilestones.includes(milestone.id)}
                    menuOpen={milestoneMenu}
                    setMenuOpen={setMilestoneMenu}
                    userOptions={userOptions}
                    statusOptions={statusOptions}
                    errors={milestoneErrors}
                  />
                  {(expandedMilestones.includes(milestone.id) || editingId === milestone.id) && (
                    <tr className="bg-gray-50 2xl:bg-gray-100">
                      <td colSpan={7} className="p-0">
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
                                onChange={(t) => handleTaskChange(t, milestone.id)}
                                menuOpen={taskMenu}
                                setMenuOpen={setTaskMenu}
                                userOptions={userOptions}
                                statusOptions={statusOptions}
                                milestoneId={milestone.id}
                                errors={editingTask && editingTask.milestoneId === milestone.id && editingTask.taskId === task.id ? (taskErrors[`${milestone.id}_${task.id}`] || {}) : {}}
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
