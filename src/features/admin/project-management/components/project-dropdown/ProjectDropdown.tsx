"use client";
import React from "react";

type Props = {
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

/**
 * ProjectDropdown
 * Displays a dropdown with View, Edit, and Delete options
 */
export const ProjectDropdown: React.FC<Props> = ({
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="absolute top-full right-0 mt-2 2xl:mt-[0.5vw] bg-white border border-gray-300 rounded-md 2xl:rounded-[0.5vw] shadow-md z-10 w-[8rem] 2xl:w-[10vw]">
      <ul className="flex flex-col text-sm 2xl:text-[1vw] 2xl:leading-[1.5vw]">
        <li
          className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 cursor-pointer"
          onClick={onView}
        >
          View
        </li>
        <li
          className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-gray-100 cursor-pointer"
          onClick={onEdit}
        >
          Edit
        </li>
        <li
          className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] hover:bg-red-100 text-red-600 cursor-pointer"
          onClick={onDelete}
        >
          Delete
        </li>
      </ul>
    </div>
  );
};
