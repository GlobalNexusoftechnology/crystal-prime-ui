import React, { useRef, useEffect } from "react";
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
import type { Milestone } from "../../Step2MilestoneSetup";
import { LuUserPlus } from "react-icons/lu";

interface MilestoneProps {
  milestone: Milestone;
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
  errors?: { [key: string]: string };
  projectStartDate: string;
  projectEndDate: string;
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

export function Milestone({
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
  children,
  errors,
  projectStartDate,
  projectEndDate,
}: MilestoneProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuOpen === milestone.id && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    if (menuOpen === milestone.id) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, milestone.id, setMenuOpen]);

  const getUserName = (userId: string) => {
    const user = userOptions.find((u) => u.value === userId);
    return user ? user.label : userId;
  };

  return (
    <tr className="bg-white rounded-lg 2xl:rounded-[0.5vw] shadow">
      {editingId === milestone.id && editMilestone ? (
        <>
          <td className="px-2 2xl:px-[0.5vw] py-4 2xl:py-[1vw] text-left flex gap-2 2xl:gap-[0.5vw]">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <InputField
              value={editMilestone.name}
              onChange={(e) =>
                onChange({ ...editMilestone, name: e.target.value })
              }
              error={errors?.name}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <InputField
              value={editMilestone.description}
              onChange={(e) =>
                onChange({ ...editMilestone, description: e.target.value })
              }
              placeholder="Description"
              error={errors?.description}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <Dropdown
              options={userOptions}
              value={editMilestone.assigned_to || ""}
              onChange={(val) =>
                onChange({ ...editMilestone, assigned_to: val })
              }
              error={errors?.assigned_to}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.9vw] font-semibold w-fit">
              {milestone.status}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <DatePicker
              value={sanitizeDateForPicker(editMilestone.start_date)}
              onChange={(val) => onChange({ ...editMilestone, start_date: val })}
              error={errors?.start_date}
              minDate={projectStartDate}
              maxDate={projectEndDate}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <DatePicker
              value={sanitizeDateForPicker(editMilestone.end_date)}
              onChange={(val) => onChange({ ...editMilestone, end_date: val })}
              error={errors?.end_date}
              minDate={projectStartDate}
              maxDate={projectEndDate}
            />
          </td>
        </>
      ) : (
        <>
          <td className="p-2 2xl:p-[0.5vw] text-left relative">
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
              <div ref={menuRef} className="absolute left-[80%] bottom-[10%] mt-2 2xl:mt-[0.5vw] bg-white border rounded 2xl:rounded-[0.25vw] shadow z-10 min-w-[100px]">
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100"
                  onClick={() => onEdit(milestone)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 text-red-600"
                  onClick={() => onDelete(milestone.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex items-center gap-4 2xl:gap-[1vw]">

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
            <div className="flex items-center gap-4 2xl-gap-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">{milestone.name}</span>
              <div className="flex items-center gap-1 2xl:gap-[0.25vw]">
                <TreeStructureIcon className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
                <p className="border-2 border-dotted border-primary rounded-full text-xs 2xl:text-[0.9vw] p-1 2xl:p-[0.25vw] text-primary">
                  {milestone.tasks.length}
                </p>
              </div>
            </div>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] min-w-[10rem] 2xl:min-w-[10vw]">
            <span className="text-gray-600">
              {milestone.description || "No description"}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] min-w-[14rem] 2xl:min-w-[14vw]">
            <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
              {milestone.assigned_to ? (
                <p
                  className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                  style={{
                    backgroundColor: getRandomColor(
                      milestone?.assigned_to || ""
                    ),
                  }}
                >
                  {getInitials(milestone.assigned_to || "")}
                </p>
              ) : (
                <LuUserPlus className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw] mb-2 2xl:mb-[0.5vw]" />
              )}
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {getUserName(milestone.assigned_to) || "---"}
              </p>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold">
              {milestone.status}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] min-w-[12rem] 2xl:min-w-[12vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {milestone.start_date ? formatDateToMMDDYYYY(milestone.start_date) : "---"}
              </span>
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] min-w-[10rem] 2xl:min-w-[10vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {milestone.end_date ? formatDateToMMDDYYYY(milestone.end_date) : "---"}
              </span>
            </span>
          </td>
        </>
      )}
      {children}
    </tr>
  );
}
