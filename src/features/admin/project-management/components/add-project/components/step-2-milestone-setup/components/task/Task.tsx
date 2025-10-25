import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import { formatDateToDDMMYYYY } from "@/utils/helpers/formatDateToDDMMYYYY";
import type { Task } from "../../Step2MilestoneSetup";

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
  milestoneStartDate?: string;
  milestoneEndDate?: string;
}

// Utility to sanitize date for DatePicker
function sanitizeDateForPicker(date: string | undefined | null): string {
  if (!date) return "";
  // Accept only YYYY-MM-DD
  const match = date.match(/^\d{4}-\d{2}-\d{2}$/);
  if (match) return date;
  // Try to extract from ISO string
  if (date.length >= 10) return date.slice(0, 10);
  return "";
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
  milestoneStartDate,
  milestoneEndDate,
}: TaskProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuOpen.taskId === task.id &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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

  return (
    <tr className="border-t border-gray-200">
      {editingTask &&
      editingTask.milestoneId === milestoneId &&
      editingTask.taskId === task.id &&
      editTask ? (
        <>
         <td></td>
          <td className="p-2  pl-32  font-medium">
            <InputField
              value={editTask.title}
              onChange={(e) => onChange({ ...editTask, title: e.target.value })}
              error={errors.title}
            />
          </td>
          <td className="p-2 ">
            <InputField
              value={editTask.description}
              onChange={(e) =>
                onChange({ ...editTask, description: e.target.value })
              }
              error={errors.description}
            />
          </td>
          <td className="p-2 ">
            <Dropdown
              options={userOptions}
              value={editTask.assigned_to}
              onChange={(val) => onChange({ ...editTask, assigned_to: val })}
              error={errors.assigned_to}
            />
          </td>
          <td className="p-2 ">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs  font-semibold w-fit">
              {task.status}
            </span>
          </td>
          <td className="p-2 ">
            <DatePicker
              value={sanitizeDateForPicker(editTask.due_date)}
              onChange={(val) => onChange({ ...editTask, due_date: val })}
              error={errors.due_date}
              minDate={milestoneStartDate}
              maxDate={milestoneEndDate}
            />
          </td>
          <td className="px-2  py-4  text-right flex gap-2 ">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6  h-6 " />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6  h-6 " />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="pl-2  py-2  text-left relative">
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
              <HiOutlineDotsVertical className="w-6  h-6 " />
            </button>
            {menuOpen && menuOpen.taskId === task.id && (
              <div
                ref={menuRef}
                className="absolute left-[80%] bottom-[10%] mt-2  bg-white border rounded shadow z-10 min-w-[100px]"
              >
                <button
                  className="block w-full text-left px-4  py-2  hover:bg-gray-100 text-[0.9rem] "
                  onClick={() => onEdit(milestoneId, task)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4  py-2  hover:bg-gray-100 text-red-600 text-[0.9rem] "
                  onClick={() => onDelete(milestoneId, task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="pl-32  py-2  text-[0.9rem]  font-medium">
            {task.title}
          </td>
          <td className="px-4  py-2  text-[0.9rem] ">
            {task.description}
          </td>
          <td className="px-4  py-2  text-[0.9rem] ">
            <div className="flex items-center gap-2">
              {task.assigned_to ? (
                (() => {
                  const user = userOptions.find(
                    (u) => u.value === task.assigned_to
                  );
                  const fullName = user ? user.label : "";
                  return (
                    <>
                      <p
                        className="flex items-center justify-center p-2  w-10  h-10  text-white text-[0.9rem]  rounded-full"
                        style={{ backgroundColor: getRandomColor(fullName) }}
                      >
                        {getInitials(fullName)}
                      </p>
                      <p className="px-3  py-1  text-[0.9rem] ">
                        {fullName || task.assigned_to}
                      </p>
                    </>
                  );
                })()
              ) : (
                <p className="text-[0.9rem] ">---</p>
              )}
            </div>
          </td>
          <td className="px-4  py-2 ">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem]  font-semibold">
              {task.status}
            </span>
          </td>
          <td className="px-4  py-2 ">
            <span className="flex items-center gap-2 ">
              <span className="text-[0.9rem] ">
                {task.due_date ? formatDateToDDMMYYYY(task.due_date) : "---"}
              </span>
            </span>
          </td>
        </>
      )}
    </tr>
  );
}
