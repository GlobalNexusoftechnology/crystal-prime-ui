import React, { useState } from "react";
import { Dropdown, InputField, DatePicker, Button } from "@/components";
import { HiOutlineDotsVertical, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AddSquareIcon, TreeStructureIcon } from "@/features";
import { HiOutlineCalendar, HiCheck, HiXMark } from "react-icons/hi2";
import { getInitials, getRandomColor } from "@/utils";

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
                  <tr className="bg-white rounded-lg 2xl:rounded-[0.7vw] shadow">
                    {editingId === milestone.id && editMilestone ? (
                      <>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] font-medium flex items-center gap-2">
                          <InputField
                            value={editMilestone.name}
                            onChange={(e) =>
                              setEditMilestone({
                                ...editMilestone,
                                name: e.target.value,
                              })
                            }
                            className="w-40"
                          />
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <Dropdown
                            options={userOptions}
                            value={editMilestone.assignedTo}
                            onChange={(val) =>
                              setEditMilestone({
                                ...editMilestone,
                                assignedTo: val,
                              })
                            }
                            dropdownWidth="w-40"
                          />
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <Dropdown
                            options={statusOptions}
                            value={editMilestone.status}
                            onChange={(val) =>
                              setEditMilestone({
                                ...editMilestone,
                                status: val,
                              })
                            }
                            dropdownWidth="w-32"
                          />
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <DatePicker
                            value={editMilestone.estimatedStart}
                            onChange={(val) =>
                              setEditMilestone({
                                ...editMilestone,
                                estimatedStart: val,
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <DatePicker
                            value={editMilestone.estimatedEnd}
                            onChange={(val) =>
                              setEditMilestone({
                                ...editMilestone,
                                estimatedEnd: val,
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-4 2xl:px-[0.5vw] 2xl:py-[1vw] text-right flex gap-2 2xl:gap-[0.5vw]">
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <HiCheck className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <HiXMark className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] font-medium flex items-center gap-2">
                          <button
                            onClick={() => toggleMilestone(milestone.id)}
                            className="focus:outline-none"
                            title={
                              expandedMilestones.includes(milestone.id)
                                ? "Collapse"
                                : "Expand"
                            }
                            type="button"
                          >
                            {expandedMilestones.includes(milestone.id) ? (
                              <HiChevronUp className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                            ) : (
                              <HiChevronDown className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                            )}
                          </button>
                          <span className="text-sm 2xl:text-[0.8vw]">{milestone.name}</span>
                          <span className="flex items-center gap-1 2xl:gap-[0.3vw]">
                            <TreeStructureIcon className="w-4 h-4 2xl:w-[1vw] 2xl:h-[1vw]" />
                            <span className="border-2 border-dotted border-primary rounded-full text-xs 2xl:text-[0.7vw] px-1 2xl:px-[0.3vw] text-primary">{milestone.tasks.length}</span>
                          </span>
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-sm 2xl:text-[0.8vw]">
                          <div className="flex items-center gap-2">
                            <p
                              className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                              style={{ backgroundColor: getRandomColor(milestone.assignedTo) }}
                            >
                              {getInitials(milestone.assignedTo)}
                            </p>
                            <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
                              {milestone.assignedTo}
                            </p>
                          </div>
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.8vw] font-semibold">
                            {milestone.status}
                          </span>
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <span className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                            <span className="text-sm 2xl:text-[0.8vw]">{milestone.estimatedStart}</span>
                          </span>
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]">
                          <span className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                            {milestone.estimatedEnd}
                          </span>
                        </td>
                        <td className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-right relative">
                          <button
                            className="text-gray-400 hover:text-blue-600"
                            title="Menu"
                            type="button"
                            onClick={() =>
                              setMilestoneMenu(
                                milestoneMenu === milestone.id
                                  ? null
                                  : milestone.id
                              )
                            }
                          >
                            <HiOutlineDotsVertical className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                          </button>
                          {milestoneMenu === milestone.id && (
                            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                onClick={() => handleEdit(milestone)}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                                onClick={() =>
                                  handleDeleteMilestone(milestone.id)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </>
                    )}
                  </tr>
                  {/* Tasks under milestone (expand/collapse or editable) */}
                  {(expandedMilestones.includes(milestone.id) ||
                    editingId === milestone.id) && (
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
                                <tr
                                  key={task.id}
                                  className="border-t border-gray-200 2xl:border-[0.1vw] 2xl:border-gray-300"
                                >
                                  {editingTask &&
                                    editingTask.milestoneId === milestone.id &&
                                    editingTask.taskId === task.id &&
                                    editTask ? (
                                    <>
                                      <td className="pl-8 py-2 2xl:pl-[2vw] 2xl:py-[0.5vw] font-medium">
                                        <InputField
                                          value={editTask.name}
                                          onChange={(e) =>
                                            setEditTask({
                                              ...editTask,
                                              name: e.target.value,
                                            })
                                          }
                                          className="w-32"
                                        />
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <InputField
                                          value={editTask.description}
                                          onChange={(e) =>
                                            setEditTask({
                                              ...editTask,
                                              description: e.target.value,
                                            })
                                          }
                                          className="w-40"
                                        />
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <Dropdown
                                          options={userOptions}
                                          value={editTask.assignedTo}
                                          onChange={(val) =>
                                            setEditTask({
                                              ...editTask,
                                              assignedTo: val,
                                            })
                                          }
                                          dropdownWidth="w-32"
                                        />
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <Dropdown
                                          options={statusOptions}
                                          value={editTask.status}
                                          onChange={(val) =>
                                            setEditTask({
                                              ...editTask,
                                              status: val,
                                            })
                                          }
                                          dropdownWidth="w-28"
                                        />
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <DatePicker
                                          value={editTask.dueDate}
                                          onChange={(val) =>
                                            setEditTask({
                                              ...editTask,
                                              dueDate: val,
                                            })
                                          }
                                        />
                                      </td>
                                      <td className="px-2 py-4 2xl:px-[0.5vw] 2xl:py-[1vw] text-right flex gap-2 2xl:gap-[0.5vw]">
                                        <button
                                          onClick={handleSaveTask}
                                          className="text-green-600 hover:text-green-800"
                                          title="Save"
                                        >
                                          <HiCheck className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                                        </button>
                                        <button
                                          onClick={handleCancelTask}
                                          className="text-red-600 hover:text-red-800"
                                          title="Cancel"
                                        >
                                          <HiXMark className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                                        </button>
                                      </td>
                                    </>
                                  ) : (
                                    <>
                                      <td className="pl-8 py-2 2xl:pl-[2vw] 2xl:py-[0.5vw] text-sm 2xl:text-[0.8vw] font-medium">
                                        {task.name}
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.8vw]">{task.description}</td>
                                      <td className="py-2 2xl:py-[0.5vw] text-sm 2xl:text-[0.8vw]">
                                        <div className="flex items-center gap-2">
                                          <p
                                            className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 h-10 2xl:w-[2.5vw] 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] rounded-full"
                                            style={{ backgroundColor: getRandomColor(task.assignedTo) }}
                                          >
                                            {getInitials(task.assignedTo)}
                                          </p>
                                          <p className="px-3 py-1 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw]">
                                            {task.assignedTo}
                                          </p>
                                        </div>
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <span className="bg-blue-100 2xl:bg-blue-50 text-blue-600 px-3 2xl:px-[0.7vw] py-1 2xl:py-[0.3vw] rounded-full 2xl:rounded-[1vw] text-xs 2xl:text-[0.8vw] font-semibold">
                                          {task.status}
                                        </span>
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw]">
                                        <span className="flex items-center gap-2 2xl:gap-[0.5vw] ">
                                          <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                                          <span className="text-sm 2xl:text-[0.8vw]">{task.dueDate}</span>
                                        </span>
                                      </td>
                                      <td className="py-2 2xl:py-[0.5vw] text-right relative">
                                        <button
                                          className="text-gray-400 hover:text-blue-600"
                                          title="Menu"
                                          type="button"
                                          onClick={() =>
                                            setTaskMenu(
                                              taskMenu &&
                                                taskMenu.milestoneId ===
                                                milestone.id &&
                                                taskMenu.taskId === task.id
                                                ? null
                                                : {
                                                  milestoneId: milestone.id,
                                                  taskId: task.id,
                                                }
                                            )
                                          }
                                        >
                                          <HiOutlineDotsVertical className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
                                        </button>
                                        {taskMenu &&
                                          taskMenu.milestoneId === milestone.id &&
                                          taskMenu.taskId === task.id && (
                                            <div className="absolute right-0 mt-2 2xl:mt-[0.5vw] bg-white border 2xl:border-[0.1vw] rounded 2xl:rounded-[0.7vw] shadow z-10 min-w-[100px] 2xl:min-w-[7vw]">
                                              <button
                                                className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 2xl:hover:bg-gray-200"
                                                onClick={() =>
                                                  handleEditTask(
                                                    milestone.id,
                                                    task
                                                  )
                                                }
                                              >
                                                Edit
                                              </button>
                                              <button
                                                className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 2xl:hover:bg-gray-200 text-red-600"
                                                onClick={() =>
                                                  handleDeleteTask(
                                                    milestone.id,
                                                    task.id
                                                  )
                                                }
                                              >
                                                Delete
                                              </button>
                                            </div>
                                          )}
                                      </td>
                                    </>
                                  )}
                                </tr>
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
