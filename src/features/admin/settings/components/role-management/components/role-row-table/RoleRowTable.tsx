"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { RolePermission } from "../role-permission/RolePermission";
import { IAllRoleList } from "@/services";
import { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";

interface RoleRowProps {
  role: IAllRoleList;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  onRoleDelete: (roleId: string) => void;
  onRoleEdit: (roleId: IAllRoleList) => void;
}

export function RoleRowTable({
  index,
  role,
  isExpanded,
  onToggle,
  onRoleDelete,
  onRoleEdit
}: RoleRowProps) {
  const [openActionId, setOpenActionId] = useState<string | number | null>(null);
  const actionRef = useRef<HTMLTableCellElement>(null);

  const isOpen = openActionId === role.id;

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (actionRef.current && !actionRef.current.contains(event.target as Node)) {
        setOpenActionId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const actions = [
    {
      label: "Edit",
      onClick: () => {
        onRoleEdit(role);
      },
      className: "text-blue-500",
    },
    {
      label: "Delete",
      onClick: () => {
        onRoleDelete(role.id);
      },
      className: "text-red-500",
    },
  ];

  return (
    <>
      <tr
        className="bg-white hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <td className="p-3 2xl:p-[0.75vw] flex items-center gap-2 2xl:gap-[0.5vw]">
          {isExpanded ? (
            <ChevronDown className="w-[1.2rem] h-[1.2rem] 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
          ) : (
            <ChevronRight className="w-[1.2rem] h-[1.2rem] 2xl:w-[1.2vw] 2xl:h-[1.2vw]" />
          )}
          <td className="p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] font-medium text-gray-700">
            {index + 1}
          </td>
        </td>
        <td className="p-3 2xl:p-[0.75vw]">{role.role}</td>
        <td className="p-3 2xl:p-[0.75vw]">
          {new Date(role.created_at).toLocaleDateString()}
        </td>
        <td className="p-3 2xl:p-[0.75vw]">
          {new Date(role.updated_at).toLocaleDateString()}
        </td>
        <td className="p-3 2xl:p-[0.75vw] relative" ref={actionRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenActionId(isOpen ? null : role.id);
            }}
            className="p-1 2xl:p-[0.25vw] rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5 2xl:w-[1.25vw] h-5 2xl:h-[1.25vw]" />
          </button>

          {isOpen && (
            <div className="absolute right-[95%] top-[-40%] bg-white shadow-lg z-50 rounded 2xl:rounded-[0.25vw] border 2xl:border-[0.1vw] w-32 2xl:w-[10vw]">
              {actions.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full px-4 text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] 2xl:px-[1vw] py-2 2xl:py-[0.5vw] text-left hover:bg-gray-100 ${action.className}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenActionId(null);
                    action.onClick();
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={6}>
            <RolePermission permissions={role.permissions} />
          </td>
        </tr>
      )}
    </>
  );
}
