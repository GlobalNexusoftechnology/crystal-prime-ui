import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TreeStructureIcon } from "@/features";
import { formatDateToDDMMYYYY, getInitials, getRandomColor } from "@/utils";
import type { Milestone } from "../../Step2MilestoneSetup";

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
  if (!date) return "";
  // Accept only YYYY-MM-DD
  const match = date.match(/^\d{4}-\d{2}-\d{2}$/);
  if (match) return date;
  // Try to extract from ISO string
  if (date.length >= 10) return date.slice(0, 10);
  return "";
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
      if (
        menuOpen === milestone.id &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
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

  return (
    <tr className="bg-white">
      {editingId === milestone.id && editMilestone ? (
        <>
          <td></td>
          <td className="p-2 ">
            <InputField
              value={editMilestone.name}
              onChange={(e) =>
                onChange({ ...editMilestone, name: e.target.value })
              }
              error={errors?.name}
            />
          </td>
          <td className="p-2 ">
            <InputField
              value={editMilestone.description}
              onChange={(e) =>
                onChange({ ...editMilestone, description: e.target.value })
              }
              placeholder="Description"
              error={errors?.description}
            />
          </td>
          <td className="p-2 ">
            <Dropdown
              options={userOptions}
              value={editMilestone.assigned_to || ""}
              onChange={(val) =>
                onChange({ ...editMilestone, assigned_to: val })
              }
              error={errors?.assigned_to}
            />
          </td>
          <td className="p-2 ">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs  font-semibold w-fit">
              {milestone.status}
            </span>
          </td>
          <td className="p-2 ">
            <DatePicker
              value={sanitizeDateForPicker(editMilestone.start_date)}
              onChange={(val) =>
                onChange({ ...editMilestone, start_date: val })
              }
              error={errors?.start_date}
              minDate={projectStartDate}
              maxDate={projectEndDate}
            />
          </td>
          <td className="p-2 ">
            <DatePicker
              value={sanitizeDateForPicker(editMilestone.end_date)}
              onChange={(val) => onChange({ ...editMilestone, end_date: val })}
              error={errors?.end_date}
              minDate={projectStartDate}
              maxDate={projectEndDate}
            />
          </td>
          <td className="px-2  py-4  text-left flex gap-2 ">
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
          <td className="p-2  text-left relative bg-gray-200">
            <button
              className="text-gray-400 hover:text-blue-600"
              title="Menu"
              type="button"
              onClick={() =>
                setMenuOpen(menuOpen === milestone.id ? null : milestone.id)
              }
            >
              <HiOutlineDotsVertical className="w-6  h-6 " />
            </button>
            {menuOpen === milestone.id && (
              <div
                ref={menuRef}
                className="absolute left-[80%] bottom-[10%] mt-2  bg-white border rounded  shadow z-10 min-w-[100px]"
              >
                <button
                  className="block w-full text-left px-4  py-2  hover:bg-gray-100"
                  onClick={() => onEdit(milestone)}
                >
                  Edit
                </button>
                <button
                  className="block w-full text-left px-4  py-2  hover:bg-gray-100 text-red-600"
                  onClick={() => onDelete(milestone.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </td>
          <td className="p-2  bg-gray-200">
            <div className="flex items-center gap-4 ">
              <button
                onClick={() => onToggle(milestone.id)}
                className="focus:outline-none"
                title={expanded ? "Collapse" : "Expand"}
                type="button"
              >
                {expanded ? (
                  <HiChevronUp className="w-4  h-4 " />
                ) : (
                  <HiChevronDown className="w-4  h-4 " />
                )}
              </button>
              <div className="flex items-center gap-4 2xl-gap-[1vw] min-w-[10rem] ">
                <span className="text-[0.9rem] ">
                  {milestone.name}
                </span>
                <div className="flex items-center gap-1 ">
                  <TreeStructureIcon className="w-4  h-4 " />
                  <p className="border-2  border-dotted border-primary rounded-full text-xs  px-2  py-0  text-primary">
                    {milestone.tasks.length}
                  </p>
                </div>
              </div>
            </div>
          </td>
          <td className="p-2  text-[0.9rem]  min-w-[10rem]  bg-gray-200">
            <span className="text-gray-600">
              {milestone.description || "No description"}
            </span>
          </td>
          <td className="p-2  text-[0.9rem]  min-w-[14rem]  bg-gray-200">
            <div className="flex items-center gap-2 ">
              {milestone.assigned_to ? (
                (() => {
                  const user = userOptions.find(
                    (u) => u.value === milestone.assigned_to
                  );
                  const fullName = user ? `${user.label}` : "";
                  return (
                    <>
                      <p
                        className="flex items-center justify-center p-2  w-10  h-10  text-white text-[0.9rem]  rounded-full"
                        style={{ backgroundColor: getRandomColor(fullName) }}
                      >
                        {getInitials(fullName)}
                      </p>
                      <p className="px-3  py-1  text-[0.9rem] ">
                        {fullName || milestone.assigned_to || "---"}
                      </p>
                    </>
                  );
                })()
              ) : (
                <p className="text-[0.9rem] ">---</p>
              )}
            </div>
          </td>
          <td className="p-2  min-w-[10rem]  bg-gray-200">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem]  font-semibold">
              {milestone.status}
            </span>
          </td>
          <td className="p-2  min-w-[12rem]  bg-gray-200">
            <span className="flex items-center gap-2 ">
              <span className="text-[0.9rem] ">
                {milestone.start_date
                  ? formatDateToDDMMYYYY(milestone.start_date)
                  : "---"}
              </span>
            </span>
          </td>
          <td className="p-2  min-w-[10rem]  bg-gray-200">
            <span className="flex items-center gap-2 ">
              <span className="text-[0.9rem] ">
                {milestone.end_date
                  ? formatDateToDDMMYYYY(milestone.end_date)
                  : "---"}
              </span>
            </span>
          </td>
        </>
      )}
      {children}
    </tr>
  );
}
