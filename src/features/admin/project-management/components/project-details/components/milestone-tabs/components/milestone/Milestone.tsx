import React, { useRef, useEffect } from "react";
import { Dropdown, InputField, DatePicker } from "@/components";
import { HiCheck, HiXMark, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TreeStructureIcon } from "@/features";
import { formatDateToDDMMYYYY, getInitials, getRandomColor } from "@/utils";
import { useRouter } from "next/navigation";
import { ITicketData } from "@/services";

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
  tickets?: ITicketData[];
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
  errors?: { [key: string]: string };
  canEditMilestone?: boolean;
  canDeleteMilestone?: boolean;
  canViewMilestone?: boolean;
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
  children,
  errors = {},
  canEditMilestone = true,
  canDeleteMilestone = true,
  canViewMilestone = true,
}: MilestoneProps) {
  const router = useRouter();

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

  const handleRedirectView = (milestoneId: string) => {
    router.push(`/admin/project-management/${projectId}/${milestoneId}`);
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
    <tr className="bg-white">
      {editingId === milestone.id && editMilestone ? (
        <>
          <td></td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <InputField
                value={editMilestone.name}
                onChange={(e) =>
                  onChange({ ...editMilestone, name: e.target.value })
                }
                className={`${errors.name ? "border-red-500" : ""} ${
                  editMilestone.name === "Support" ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                disabled={editMilestone.name === "Support"}
              />
              {errors.name && (
                <span className="text-red-500 text-xs 2xl:text-[0.8vw] mt-1 2xl:mt-[0.25vw]">
                  {errors.name}
                </span>
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
              className={editMilestone.name === "Support" ? "bg-gray-100 cursor-not-allowed" : ""}
              disabled={editMilestone.name === "Support"}
            />
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <Dropdown
                options={userOptions}
                value={editMilestone.assigned_to || ""}
                onChange={(val) =>
                  onChange({ ...editMilestone, assigned_to: val })
                }
                error={errors.assigned_to}
              />
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw]">
            <div className="flex flex-col">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs 2xl:text-[0.8vw] font-semibold w-fit">
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
          <td className="px-2 2xl:px-[0.5vw] py-4 2xl:py-[1vw] text-right flex gap-2 2xl:gap-[0.5vw]">
            <button onClick={onSave} className="text-green-600" title="Save">
              <HiCheck className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
            <button onClick={onCancel} className="text-red-600" title="Cancel">
              <HiXMark className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]" />
            </button>
          </td>
        </>
      ) : (
        <>
          <td className="p-2 2xl:p-[0.5vw] text-right relative bg-gray-200">
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
              <div
                ref={menuRef}
                className="absolute left-[80%] bottom-[10%] mt-2 2xl:mt-[0.5vw] bg-white border rounded 2xl:rounded-[0.25vw] shadow z-10 min-w-[100px]"
              >
                {milestone.name === "Support" ? (
                  // For Support milestone, show only Edit action
                  canEditMilestone && (
                    <button
                      className="block w-full text-left px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] hover:bg-gray-100"
                      onClick={() => onEdit(milestone)}
                    >
                      Edit
                    </button>
                  )
                ) : (
                  // For other milestones, show all actions
                  <>
                    {canViewMilestone && (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleRedirectView(milestone.id)}
                      >
                        View
                      </button>
                    )}
                    {milestone.tickets && milestone.tickets.length > 0 && (
                      <button
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleRedirectView(milestone.id)}
                      >
                        View Tickets ({milestone.tickets.length})
                      </button>
                    )}
                    {canEditMilestone && (
                      <button
                        className="block w-full text-left px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] hover:bg-gray-100"
                        onClick={() => onEdit(milestone)}
                      >
                        Edit
                      </button>
                    )}
                    {canDeleteMilestone && (
                      <button
                        className="block w-full text-left px-4 2xl:px-[1vw] py-1 2xl:py-[0.25vw] hover:bg-gray-100 text-red-600"
                        onClick={() => onDelete(milestone.id)}
                      >
                        Delete
                      </button>
                    )}
                  </>
                )}
              </div>
            )}
          </td>
          <td className={`p-2 2xl:p-[0.5vw] bg-gray-200`}>
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
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {milestone.name}
              </span>
              <div className="flex items-center gap-1 2xl:gap-[0.25vw]">
                <TreeStructureIcon className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
                <p className="border-2 2xl:border-[0.05vw] border-dotted border-primary rounded-full text-[0.9rem] 2xl:text-[0.9vw] px-2 2xl:px-[0.5vw] py-0 2xl:py-[0.4vw] text-primary">
                  {milestone.tasks.length}
                </p>
              </div>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] bg-gray-200">
            <span className="text-gray-600 text-[0.9rem] 2xl:text-[0.9vw]">
              {milestone.description || "No description"}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] bg-gray-200">
            <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <p
                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                style={{
                  backgroundColor: getRandomColor(milestone?.assigned_to || ""),
                }}
              >
                {getUserInitials(milestone.assigned_to || "")}
              </p>
              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                {getUserName(milestone.assigned_to || "")}
              </p>
            </div>
          </td>
          <td className="p-2 2xl:p-[0.5vw] bg-gray-200">
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold">
              {milestone.status}
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] bg-gray-200">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {formatDateToDDMMYYYY(milestone.start_date)}
              </span>
            </span>
          </td>
          <td className="p-2 2xl:p-[0.5vw] bg-gray-200">
            <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
              <span className="text-[0.9rem] 2xl:text-[0.9vw]">
                {formatDateToDDMMYYYY(milestone.end_date)}
              </span>
            </span>
          </td>
        </>
      )}
      {children}
    </tr>
  );
}
