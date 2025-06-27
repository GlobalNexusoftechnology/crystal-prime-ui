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
import { getInitials, getRandomColor } from "@/utils";
import type { Milestone } from '../../Step2MilestoneSetup';

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
  statusOptions,
  children,
}: MilestoneProps) {
  return (
    <tr className="bg-white rounded-lg 2xl:rounded-[0.5vw] shadow">
      {editingId === milestone.id && editMilestone ? (
        <>
          <td className="p-2 2xl:p-[0.5vw] font-medium flex items-center gap-2 2xl:gap-[0.5vw]">
            <InputField
              value={editMilestone.name}
              onChange={(e) =>
                onChange({ ...editMilestone, name: e.target.value })
              }
              className="w-40"
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <Dropdown
              options={userOptions}
              value={editMilestone.assigned_to || ''}
              onChange={(val) =>
                onChange({ ...editMilestone, assigned_to: val })
              }
              dropdownWidth="w-40 2xl:w-[10vw]"
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <Dropdown
              options={statusOptions}
              value={editMilestone.status}
              onChange={(val) => onChange({ ...editMilestone, status: val })}
              dropdownWidth="w-32 2xl:w-[8vw]"
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <DatePicker
              value={editMilestone.start_date || ""}
              onChange={(val) =>
                onChange({ ...editMilestone, start_date: val })
              }
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <DatePicker
              value={editMilestone.end_date || ""}
              onChange={(val) =>
                onChange({ ...editMilestone, end_date: val })
              }
            />
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
          <td className="p-2 2xl:p-[0.5vw] font-medium flex items-center gap-2 2xl:gap-[0.5vw]">
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
            <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <p
                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                style={{
                  backgroundColor: getRandomColor(milestone?.assigned_to || ''),
                }}
              >
                {getInitials(milestone.assigned_to || "")}
              </p>
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {milestone.assigned_to || ""}
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
                {milestone.start_date}
              </span>
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <HiOutlineCalendar className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw] text-gray-400" />
              {milestone.end_date}
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
              <div className="absolute right-0 mt-2 2xl:mt-[0.5vw] bg-white border rounded 2xl:rounded-[0.25vw] shadow z-10 min-w-[100px]">
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
        </>
      )}
      {children}
    </tr>
  );
}
