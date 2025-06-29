import React from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import {
  HiCheck,
  HiXMark,
  HiChevronDown,
  HiChevronUp,
  HiOutlineCalendar,
} from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TreeStructureIcon } from "@/features";
import { formatDateToMMDDYYYY, getInitials, getRandomColor } from "@/utils";
import { useRouter } from "next/navigation";

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
  projectId: string;
  tasks: Task[];
}

interface MilestoneProps {
  milestone: Milestone;
  projectId: string;
  editingId: string | null;
  editMilestone: Milestone | null;
  onEdit: (milestone: Milestone) => void;
  onDelete: (id: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onChange: (milestone: Milestone) => void;
  onToggle: (id: string) => void;
  expanded: boolean;
  menuOpen: string | null;
  setMenuOpen: (id: string | null) => void;
  userOptions: { label: string; value: string }[];
  statusOptions: { label: string; value: string }[];
  children?: React.ReactNode;
  errors?: {[key: string]: string};
}

export function Milestone({
  projectId,
  milestone,
  editingId,
  editMilestone,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onChange,
  onToggle,
  expanded,
  menuOpen,
  setMenuOpen,
  userOptions,
  statusOptions,
  children,
  errors = {},
}: MilestoneProps) {
  const router = useRouter()

  const handleRedirectView = (milestoneId: string) => {
    router.push(`/admin/project-management/${projectId}/${milestoneId}`)
  }

  // Helper function to get user name from user ID
  const getUserName = (userId: string) => {
    const user = userOptions.find(option => option.value === userId);
    return user ? user.label : userId;
  }

  // Helper function to get user initials from user ID
  const getUserInitials = (userId: string) => {
    const userName = getUserName(userId);
    return getInitials(userName);
  }

  return (
    <tr className="bg-white rounded-lg 2xl:rounded-[0.5vw] shadow">
      {editingId === milestone.id && editMilestone ? (
        <>
          <td className="p-2 2xl:p-[0.5vw] font-medium flex items-center gap-2 2xl:gap-[0.5vw] pt-4 2xl:pt-[1vw]">
            <div className="flex flex-col">
              <InputField
                value={editMilestone.name}
                onChange={(e) =>
                  onChange({ ...editMilestone, name: e.target.value })
                }
                className={`${errors.name ? 'border-red-500' : ''}`}
              />
              {errors.name && (
                <span className="text-red-500 text-xs mt-1">{errors.name}</span>
              )}
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <InputField
              value={editMilestone.description}
              onChange={(e) =>
                onChange({ ...editMilestone, description: e.target.value })
              }
              placeholder="Description"
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <Dropdown
                options={userOptions}
                value={editMilestone.assigned_to || ''}
                onChange={(val) =>
                  onChange({ ...editMilestone, assigned_to: val })
                }
                error={errors.assigned_to}
              />
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.9vw] font-semibold w-fit">
              {milestone.status}
            </span>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <DatePicker
                value={editMilestone.start_date}
                onChange={(val) =>
                  onChange({ ...editMilestone, start_date: val })
                }
                error={errors.start_date}
              />
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <DatePicker
                value={editMilestone.end_date}
                onChange={(val) =>
                  onChange({ ...editMilestone, end_date: val })
                }
                error={errors.end_date}
              />
            </div>
          </td>
          <td className="px-2 py-4 text-right flex gap-2">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6 h-6" />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6 h-6" />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className={`p-2 2xl:p-[0.5vw] font-medium flex items-center gap-2 2xl:gap-[0.5vw] ${editingId === milestone.id ? "": "pt-4 2xl:pt-[1vw]"}`}>
            <button
              onClick={() => onToggle(milestone.id)}
              className="focus:outline-none"
              title={expanded ? "Collapse" : "Expand"}
              type="button"
            >
              {expanded ? (
                <HiChevronUp className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
              ) : (
                <HiChevronDown className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
              )}
            </button>
            <span className="text-sm 2xl:text-[0.9vw]">{milestone.name}</span>
            <div className="flex items-center gap-1">
              <TreeStructureIcon className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
              <p className="border-2 border-dotted border-primary rounded-full text-xs 2xl:text-[0.9vw] px-1 2xl:px-[0.25vw] text-primary">
                {milestone.tasks.length}
              </p>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-sm 2xl:text-[0.9vw]">
            <span className="text-gray-600">{milestone.description || "No description"}</span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-sm 2xl:text-[0.9vw]">
            <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <p
                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                style={{
                  backgroundColor: getRandomColor(milestone?.assigned_to || ''),
                }}
              >
                {getUserInitials(milestone.assigned_to || "")}
              </p>
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {getUserName(milestone.assigned_to || "")}
              </p>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.9vw] font-semibold">
              {milestone.status}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              <span className="text-sm 2xl:text-[0.9vw]">
                {formatDateToMMDDYYYY(milestone.start_date)}
              </span>
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              {formatDateToMMDDYYYY(milestone.end_date)}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-right relative">
            <button
              className="text-gray-400 hover:text-blue-600"
              title="Menu"
              type="button"
              onClick={() =>
                setMenuOpen(menuOpen === milestone.id ? null : milestone.id)
              }
            >
              <HiOutlineDotsVertical className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
            {menuOpen === milestone.id && (
              <div className="absolute right-[80%] bottom-[10%] mt-2 2xl:mt-[0.5vw] bg-white border rounded 2xl:rounded-[0.25vw] shadow z-10 min-w-[100px]">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleRedirectView(milestone.id)}>View</button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] hover:bg-gray-100"
                  onClick={() => onEdit(milestone)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] hover:bg-gray-100 text-red-600"
                  onClick={() => onDelete(milestone.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
        </>
      )}
      {children}
    </tr>
  );
}
