"use client";
import React from "react";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
  canViewProject?: boolean;
  canEditProject?: boolean;
  canDeleteProject?: boolean;
};

/**
 * ProjectDropdown
 * Displays a dropdown with View, Edit, and Delete options
 */
export const ProjectDropdown: React.FC<Props> = ({
  onView,
  onEdit,
  onDelete,
  canViewProject = true,
  canEditProject = true,
  canDeleteProject = true,
}) => {
  return (
    <div className="absolute top-full right-0 mt-2  bg-white border border-gray-300 rounded-md  shadow-md z-10 w-[8rem] ">
      <ul className="flex flex-col text-[0.9rem]  ">
        {canViewProject && (
          <li
            className="px-4  py-2  hover:bg-gray-100 cursor-pointer"
            onClick={onView}
          >
            View
          </li>
        )}
        {canEditProject && (
          <li
            className="px-4  py-2  hover:bg-gray-100 cursor-pointer"
            onClick={onEdit}
          >
            Edit
          </li>
        )}
        {canDeleteProject && (
          <li
            className="px-4  py-2  hover:bg-red-100 text-red-600 cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </li>
        )}
      </ul>
    </div>
  );
};
