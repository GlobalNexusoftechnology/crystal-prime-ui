import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiOutlineCalendar } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import { useRouter } from "next/navigation";
import { IProjectTaskResponse } from "@/services";

export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  due_date: string;
}

interface TaskProps {
  task: IProjectTaskResponse;
  projectId: string;
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
  projectId,
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
  const router = useRouter();

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

  const handleRedirectView = (taskId: string) => {
    router.push(
      `/admin/project-management/${projectId}/${milestoneId}/${taskId}`
    );
  };

  // Helper function to get user name from user ID
  const getUserName = (userId: string) => {
    const user = userOptions.find((option) => option.value === userId);
    return user ? user.label : userId;
  };

  // Helper function to get user initials from user ID
  const getUserInitials = (userId: string) => {
    const userName = getUserName(userId);
    return getInitials(userName);
  };

  return (
    <tr className="border-t border-gray-200">
      {editingTask &&
      editingTask.milestoneId === milestoneId &&
      editingTask.taskId === task.id &&
      editTask ? (
        <>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw] text-right flex gap-2 2xl:gap-[0.5vw]">
            <button onClick={onSave} className="text-green-600 2xl:text-[1vw]" title="Save">
              <HiCheck className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
            <button onClick={onCancel} className="text-red-600 2xl:text-[1vw]" title="Cancel">
              <HiXMark className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
          </td>
          <td className="pl-32 2xl:pl-[8vw] py-2 2xl:py-[0.5vw] font-medium">
            <div className="flex flex-col">
              <InputField
                value={editTask.title}
                onChange={(e) =>
                  onChange({ ...editTask, title: e.target.value })
                }
                error={errors.title}
              />
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <div className="flex flex-col">
              <InputField
                value={editTask.description}
                onChange={(e) =>
                  onChange({ ...editTask, description: e.target.value })
                }
                error={errors.description}
              />
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <div className="flex flex-col">
              <Dropdown
                options={userOptions}
                value={editTask.assigned_to}
                onChange={(val) => onChange({ ...editTask, assigned_to: val })}
                error={errors.assigned_to}
              />
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <div className="flex flex-col">
              <span className="bg-blue-100 text-blue-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold w-fit">
                {task.status}
              </span>
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
            <div className="flex flex-col">
              <DatePicker
                value={editTask.due_date}
                onChange={(val) => onChange({ ...editTask, due_date: val })}
                error={errors.due_date}
              />
            </div>
          </td>
          
        </>
      ) : (
        <>
          <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.9vw] text-left relative">
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
              <HiOutlineDotsVertical className="w-6 h-6" />
            </button>
            {menuOpen && menuOpen.taskId === task.id && (
              <div ref={menuRef} className="absolute left-[80%] bottom-[10%] mt-2 bg-white border rounded shadow z-10 min-w-[100px]">
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] hover:bg-gray-100"
                  onClick={() => handleRedirectView(task.id)}
                >
                  View
                </button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] hover:bg-gray-100"
                  onClick={() =>
                    onEdit(milestoneId, {
                      id: task.id,
                      title: task.title,
                      description: task.description || "",
                      assigned_to: task.assigned_to || "",
                      status: task.status || "",
                      due_date: task.due_date || "",
                    })
                  }
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] hover:bg-gray-100 text-red-600"
                  onClick={() => onDelete(milestoneId, task.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="pl-32 2xl:pl-[8vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">{task.title}</td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">{task.description}</td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">
            <div className="flex items-center gap-2">
              <p
                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                style={{
                  backgroundColor: getRandomColor(task.assigned_to || ""),
                }}
              >
                {getUserInitials(task.assigned_to || "")}
              </p>
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {getUserName(task.assigned_to || "")}
              </p>
            </div>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw]">
            <span className="bg-blue-100 text-blue-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold">
              {task.status}
            </span>
          </td>
          <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] 2xl:text-[0.9vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">{task.due_date}</span>
            </span>
          </td>
        
        </>
      )}
    </tr>
  );
}
