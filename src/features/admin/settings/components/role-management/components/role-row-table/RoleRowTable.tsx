"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { RolePermission } from "../role-permission/RolePermission";
import { IAllRoleList } from "@/services";
import { useState, useEffect, useRef } from "react";
import { FiMoreVertical } from "react-icons/fi";
// import { Pagination } from "@/components/table/components";

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

  // const handleSort = (accessor: keyof IAllRoleList) => {
  //   if (sortBy === accessor) {
  //     setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  //   } else {
  //     setSortBy(accessor);
  //     setSortOrder("asc");
  //   }
  // };

  // const sortedData = useMemo(() => {
  //   if (!sortBy) return data;
  //   return [...data].sort((a, b) => {
  //     const aValue = a[sortBy];
  //     const bValue = b[sortBy];
  //     return sortOrder === "asc"
  //       ? String(aValue).localeCompare(String(bValue))
  //       : String(bValue).localeCompare(String(aValue));
  //   });
  // }, [data, sortBy, sortOrder]);

  // const paginatedData = useMemo(() => {
  //   const start = (currentPage - 1) * pageSize;
  //   return sortedData.slice(start, start + pageSize);
  // }, [sortedData, currentPage, pageSize]);

  return (
    <>
      <tr
        className="bg-white border-b hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <td className="p-3  flex items-center gap-2  border border-gray-300">
          {isExpanded ? (
            <ChevronDown className="w-[1.2rem] h-[1.2rem]  " />
          ) : (
            <ChevronRight className="w-[1.2rem] h-[1.2rem]  " />
          )}
          <td className="p-3  text-[0.9rem]   font-medium text-gray-700">
            {index + 1}
          </td>
        </td>
        <td className="p-3  border border-gray-300">{role.role}</td>
        <td className="p-3  border border-gray-300">
          {new Date(role.created_at).toLocaleDateString()}
        </td>
        <td className="p-3  border border-gray-300">
          {new Date(role.updated_at).toLocaleDateString()}
        </td>
        <td className="p-3  relative border border-gray-300" ref={actionRef}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setOpenActionId(isOpen ? null : role.id);
            }}
            className="p-1  rounded hover:bg-gray-200"
          >
            <FiMoreVertical className="w-5  h-5 " />
          </button>

          {isOpen && (
            <div className="absolute right-[95%] top-[-40%] bg-white shadow-lg z-50 rounded  border  w-32 ">
              {actions?.length > 0 && actions?.map((action, index) => (
                <button
                  key={index}
                  className={`block w-full px-4 text-[0.9rem]    py-2  text-left hover:bg-gray-100 ${action.className}`}
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
          <td colSpan={6} className="border border-gray-300">
            <RolePermission permissions={role.permissions} />
          </td>
        </tr>
      )}
    </>
  );
}
