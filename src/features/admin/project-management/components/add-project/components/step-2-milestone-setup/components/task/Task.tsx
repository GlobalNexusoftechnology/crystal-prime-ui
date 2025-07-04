import React from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import type { Task } from "../../Step2MilestoneSetup";
import { LuUserPlus } from "react-icons/lu";

interface TaskProps {
  task: Task;
  editingTask: { milestoneId: string; taskId: string } | null;
  editTask: Task | null;
  onEdit: (milestoneId: string, task: Task) => void;
  onDelete: (milestoneId: string, taskId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (task: Task) => void;
  menuOpen: { milestoneId: string; taskId: string } | null;
  setMenuOpen: (menu: { milestoneId: string; taskId: string } | null) => void;
  userOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  milestoneId: string;
  errors?: { [key: string]: string };
}

export function Task({
  task,
  editingTask,
  editTask,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onChange,
  menuOpen,
  setMenuOpen,
  userOptions,
  milestoneId,
  errors = {},
}: TaskProps) {
  return (
    <tr className="border-t border-gray-200">
      {editingTask &&
      editingTask.milestoneId === milestoneId &&
      editingTask.taskId === task.id &&
      editTask ? (
        <>
          <td className="px-2 2xl:px-[0.5vw] py-4 2xl:py-[1vw] text-right flex gap-2 2xl:gap-[0.5vw]">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6 2xl:w-[1.5w] h-6 2xl:h-[1.5vw]" />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6 2xl:w-[1.5w] h-6 2xl:h-[1.5vw]" />
            </button>
          </td>
          <td className="p-2 2xl:p-[0.5vw] pl-16 2xl:pl-[4vw] font-medium">
            <InputField
              value={editTask.title}
              onChange={(e) => onChange({ ...editTask, title: e.target.value })}
              error={errors.title}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <InputField
              value={editTask.description}
              onChange={(e) =>
                onChange({ ...editTask, description: e.target.value })
              }
              error={errors.description}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <Dropdown
              options={userOptions}
              value={editTask.assigned_to}
              onChange={(val) => onChange({ ...editTask, assigned_to: val })}
              error={errors.assigned_to}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.9vw] font-semibold w-fit">
              {task.status}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <DatePicker
              value={editTask.due_date}
              onChange={(val) => onChange({ ...editTask, due_date: val })}
              error={errors.due_date}
            />
          </td>
        </>
      ) : (
        <>
          <td className="py-2 2xl:py-[0.5vw] text-right relative">
            <button
              className="text-gray-400 hover:text-blue-600"
              title="Menu"
              type="button"
              onClick={() =>
                setMenuOpen(
                  menuOpen && menuOpen.taskId === task.id
                    ? null
                    : { milestoneId, taskId: task.id }
                )
              }
            >
              <HiOutlineDotsVertical className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
            {menuOpen && menuOpen.taskId === task.id && (
              <div className="absolute left-[80%] bottom-[10%] mt-2 2xl:mt-[0.5vw] bg-white border rounded shadow z-10 min-w-[100px]">
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-[0.9rem] 2xl:text-[0.9vw]"
                  onClick={() => onEdit(milestoneId, task)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-red-600 text-[0.9rem] 2xl:text-[0.9vw]"
                  onClick={() => onDelete(milestoneId, task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="pl-16 2xl:pl-[4vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
            {task.title}
          </td>
          <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">{task.description}</td>
          <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
            <div className="flex items-center gap-2">
              {task.assigned_to ? (
                <p
                  className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                  style={{
                    backgroundColor: getRandomColor(task?.assigned_to || ""),
                  }}
                >
                  {getInitials(task.assigned_to || "")}
                </p>
              ) : (
                <LuUserPlus className=" 2xl:w-[1.5vw] 2xl:w-[1.5vw] 2xl:h-[1.5vw] mb-2 2xl:mb-[0.5vw]" />
              )}
              <p className="px-3 py-1 text-[0.9rem]">
                {task.assigned_to || "---"}
              </p>
            </div>
          </td>
          <td className="py-2 2xl:py-[0.5vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold">
              {task.status}
            </span>
          </td>
          <td className="py-2 2xl:py-[0.5vw]">
            <span className="flex items-center gap-2">
              <HiOutlineCalendar className=" 2xl:w-[1.5vw] text-gray-400" />
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {task.due_date || "---"}
              </span>
            </span>
          </td>
        </>
      )}
    </tr>
  );
}
