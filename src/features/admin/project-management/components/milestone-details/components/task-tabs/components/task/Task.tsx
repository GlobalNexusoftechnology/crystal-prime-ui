import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { getInitials, getRandomColor } from "@/utils";
import { useRouter } from "next/navigation";

interface TaskType {
  id: string;
  name: string;
  description: string;
  assigned_to: string;
  status: string;
  priority?: "Critical" | "High" | "Medium" | "Low";
  due_date: string;
  projectId?: string;
  milestoneId?: string;
}

interface TaskProps {
  task: TaskType;
  editingTask: string | null;
  editTask: TaskType | null;
  onEdit: (task: TaskType) => void;
  onDelete: (taskId: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (task: TaskType) => void;
  menuOpen: string | null;
  setMenuOpen: (menu: string | null) => void;
  userOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  priorityOptions: { label: string; value: string }[];
  errors?: { [key: string]: string };
  canViewTask?: boolean;
  canEditTask?: boolean;
  canDeleteTask?: boolean;
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
  statusOptions,
  priorityOptions,
  errors = {},
  canViewTask = true,
  canEditTask = true,
  canDeleteTask = true,
}: TaskProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleRedirectView = (
    projectId: string,
    milestoneId: string,
    taskId: string
  ) => {
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

  // Helper function to get priority color
  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-200 text-red-800";
      case "High":
        return "bg-red-100 text-red-600";
      case "Medium":
        return "bg-yellow-100 text-yellow-600";
      case "Low":
        return "bg-green-100 text-green-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    if (menuOpen !== task.id) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, setMenuOpen, task.id]);

  return (
    <tr className="border-t border-gray-200 ">
      {editingTask === task.id && editTask ? (
        <>
          <td className="px-2 py-4   flex gap-2 ">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6  h-6 " />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6  h-6 " />
            </button>
          </td>
          <td className="pl-8 px-2 py-2   font-medium">
            <div className="flex flex-col">
              <InputField
                value={editTask.name}
                onChange={(e) =>
                  onChange({ ...editTask, name: e.target.value })
                }
                error={errors.name}
              />
            </div>
          </td>
          <td className="px-2 py-2  ">
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
          <td className="px-2 py-2  ">
            <div className="flex flex-col">
              <Dropdown
                options={userOptions}
                value={editTask.assigned_to}
                onChange={(val) => onChange({ ...editTask, assigned_to: val })}
                error={errors.assigned_to}
              />
            </div>
          </td>
          <td className="px-2 py-2  ">
            <div className="flex flex-col">
              <Dropdown
                options={statusOptions}
                value={editTask.status}
                onChange={(val) => onChange({ ...editTask, status: val })}
                error={errors.status}
              />
            </div>
          </td>
          <td className="px-2 py-2  ">
            <div className="flex flex-col">
              <Dropdown
                options={priorityOptions}
                value={editTask.priority || ""}
                onChange={(val) => onChange({ ...editTask, priority: val as "Critical" | "High" | "Medium" | "Low" | undefined })}
                error={errors.priority}
              />
            </div>
          </td>
          <td className="px-2 py-2  ">
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
          <td className="py-2  text-right relative">
            <button
              className="text-gray-400 hover:text-blue-600"
              title="Menu"
              type="button"
              onClick={() => setMenuOpen(menuOpen === task.id ? null : task.id)}
            >
              <HiOutlineDotsVertical className="w-6 h-6  " />
            </button>
            {menuOpen === task.id && (
              <div ref={menuRef} className="absolute left-[80%] bottom-[20%] mt-2  bg-white border border-gray-300  rounded-lg  shadow z-10 min-w-[100px] ">
                {canViewTask && (
                  <button
                    className="block w-full text-left px-4 py-1   hover:bg-gray-100 text-sm "
                    onClick={() =>
                      handleRedirectView(
                        task.projectId || "",
                        task.milestoneId || "",
                        task.id
                      )
                    }
                  >
                    View
                  </button>
                )}
                {canEditTask && (
                  <button
                    className="block w-full text-left px-4 py-1   hover:bg-gray-100 text-sm "
                    onClick={() => onEdit(task)}
                  >
                    Edit
                  </button>
                )}
                {canDeleteTask && (
                  <button
                    className="block w-full text-left px-4 py-1   hover:bg-gray-100 text-red-600 text-sm "
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            )}
          </td>
          <td className="pl-8 py-2  text-[0.9rem]  text-center font-medium">{task.name}</td>
          <td className="py-2  text-[0.9rem]  text-center">{task.description}</td>
          <td className="py-2  text-[0.9rem] ">
            <div className="flex items-center justify-center gap-2 ">
              <p
                className="flex items-center justify-center p-2  w-10 h-10   text-white text-[0.9rem]  rounded-full"
                style={{
                  backgroundColor: getRandomColor(task.assigned_to || ""),
                }}
              >
                {getUserInitials(task.assigned_to)}
              </p>
              <p className="px-3 py-1   text-[0.9rem] ">
                {getUserName(task.assigned_to)}
              </p>
            </div>
          </td>
          <td className="py-2  text-center">
            <span className="bg-blue-100 text-blue-600 px-3 py-1   rounded-full text-xs  font-semibold">
              {task.status}
            </span>
          </td>
          <td className="py-2  text-center">
            <span className={`px-3  py-1  rounded-full text-xs  font-semibold ${getPriorityColor(task.priority)}`}>
              {task.priority || "Medium"}
            </span>
          </td>
          <td className="py-2  text-center">
            <span className="flex items-center justify-center gap-2 ">
              <span className="text-[0.9rem] ">{task.due_date}</span>
            </span>
          </td>
        </>
      )}
    </tr>
  );
}
