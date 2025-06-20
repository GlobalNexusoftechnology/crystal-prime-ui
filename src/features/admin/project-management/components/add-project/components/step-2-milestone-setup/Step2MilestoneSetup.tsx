import React, { useState } from "react";
import { Dropdown, InputField, DatePicker, Button } from "@/components";
import { HiOutlineDotsVertical, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { AddSquareIcon } from "@/features";
import { HiOutlineCalendar, HiCheck, HiXMark } from "react-icons/hi2";

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
      <div className="mb-4">
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
      <div className="mb-4">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr className="text-gray-500 text-sm">
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
                <th className="text-left px-2 py-2">Assigned To</th>
                <th className="text-left px-2 py-2">Status</th>
                <th className="text-left px-2 py-2">Estimated Start Date</th>
                <th className="text-left px-2 py-2">Estimated End Date</th>
                <th className="px-2 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((milestone) => (
                <React.Fragment key={milestone.id}>
                  <tr className="bg-white rounded-lg shadow">
                    {editingId === milestone.id && editMilestone ? (
                      <>
                        <td className="px-2 py-2 font-medium flex items-center gap-2">
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
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-2">
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
                        <td className="px-2 py-4 text-right flex gap-2">
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
                        <td className="px-2 py-2 font-medium flex items-center gap-2">
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
                          <span>{milestone.name}</span>
                        </td>
                        <td className="px-2 py-2">{milestone.assignedTo}</td>
                        <td className="px-2 py-2">
                          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                            {milestone.status}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <span className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                            {milestone.estimatedStart}
                          </span>
                        </td>
                        <td className="px-2 py-2">
                          <span className="flex items-center gap-2">
                            <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                            {milestone.estimatedEnd}
                          </span>
                        </td>
                        <td className="px-2 py-2 text-right relative">
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
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="p-0">
                          <table className="w-full">
                            <thead>
                              <tr className="text-gray-500 text-sm">
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
                                <th className="py-2 text-left">Description</th>
                                <th className="py-2 text-left">Assigned To</th>
                                <th className="py-2 text-left">Status</th>
                                <th className="py-2 text-left">Due Date</th>
                                <th className="py-2"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {milestone.tasks.map((task) => (
                                <tr
                                  key={task.id}
                                  className="border-t border-gray-200"
                                >
                                  {editingTask &&
                                    editingTask.milestoneId === milestone.id &&
                                    editingTask.taskId === task.id &&
                                    editTask ? (
                                    <>
                                      <td className="pl-8 py-2 font-medium">
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
                                      <td className="py-2">
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
                                      <td className="py-2">
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
                                      <td className="py-2">
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
                                      <td className="py-2">
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
                                      <td className="px-2 py-4 text-right flex gap-2">
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
                                      <td className="pl-8 py-2 font-medium">
                                        {task.name}
                                      </td>
                                      <td className="py-2">{task.description}</td>
                                      <td className="py-2">{task.assignedTo}</td>
                                      <td className="py-2">
                                        <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                                          {task.status}
                                        </span>
                                      </td>
                                      <td className="py-2">
                                        <span className="flex items-center gap-2">
                                          <HiOutlineCalendar className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] text-gray-400" />
                                          {task.dueDate}
                                        </span>
                                      </td>
                                      <td className="py-2 text-right relative">
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
                                            <div className="absolute right-0 mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                                              <button
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
                                                className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
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
