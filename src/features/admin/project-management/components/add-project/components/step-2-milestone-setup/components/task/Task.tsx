import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import { formatDateToMMDDYYYY } from "@/utils/helpers/formatDateToMMDDYYYY";
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

// Utility to sanitize date for DatePicker
function sanitizeDateForPicker(date: string | undefined | null): string {
  if (!date) return '';
  // Accept only YYYY-MM-DD
  const match = date.match(/^\d{4}-\d{2}-\d{2}$/);
  if (match) return date;
  // Try to extract from ISO string
  if (date.length >= 10) return date.slice(0, 10);
  return '';
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
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuOpen && menuOpen.taskId === task.id && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    if (menuOpen && menuOpen.taskId === task.id) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, task.id, setMenuOpen]);

  const getUserName = (userId: string) => {
    const user = userOptions.find((u) => u.value === userId);
    return user ? user.label : userId;
  };

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
          <td className="p-2 2xl:p-[0.5vw] pl-32 2xl:pl-[8vw] font-medium">
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
              value={sanitizeDateForPicker(editTask.due_date)}
              onChange={(val) => onChange({ ...editTask, due_date: val })}
              error={errors.due_date}
            />
          </td>
        </>
      ) : (
        <>
          <td className="pl-2 2xl:pl-[0.5vw] py-2 2xl:py-[0.5vw] text-left relative">
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
              <div ref={menuRef} className="absolute left-[80%] bottom-[10%] mt-2 2xl:mt-[0.5vw] bg-white border rounded shadow z-10 min-w-[100px]">
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-[0.9rem] 2xl:text-[0.9vw]"
                  onClick={() => onEdit(milestoneId, task)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-red-600 text-[0.9rem] 2xl:text-[0.9vw]"
                  onClick={() => onDelete(milestoneId, task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="pl-32 2xl:pl-[8vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
            {task.title}
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">{task.description}</td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
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
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {getUserName(task.assigned_to) || "---"}
              </p>
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold">
              {task.status}
            </span>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {task.due_date ? formatDateToMMDDYYYY(task.due_date) : "---"}
              </span>
            </span>
          </td>
        </>
      )}
    </tr>
  );
}
