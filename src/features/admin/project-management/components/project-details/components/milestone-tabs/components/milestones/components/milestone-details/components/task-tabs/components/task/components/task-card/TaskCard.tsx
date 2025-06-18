"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProjectDropdown } from "../../../../../../../../../../../../../project-dropdown"

type Project = {
  id: number;
  name: string;
  clientName: string;
  endDate: string;
  status: number;
  totalTasks: number;
  stage: "open" | "inProgress" | "completed";
  slug?: string
};

type Props = {
  project: Project;
  bgColor: string;
};

/**
 * MilestoneCard: Displays individual milestone card with dropdown for actions
 */
export const TaskCard: React.FC<Props> = ({ project, bgColor }) => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] shadow-md ${bgColor}`}
    >
      <div className="flex justify-between items-start" ref={dropdownRef}>
        <div>
          <p className="text-sm 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-600">
            Milestone Name
          </p>
          <h3 className="font-medium text-base 2xl:text-[1.1vw] 2xl:leading-[1.5vw]">
            {project.name}
          </h3>
        </div>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="text-gray-600 text-xl 2xl:text-[1.25vw] 2xl:leading-[1.5vw]"
          >
            ⋮
          </button>
          {showDropdown && (
            <ProjectDropdown
              onView={() => router.push(`/admin/project-management/${project.slug}/${project.slug}/${project.slug}`)}
              onEdit={() => alert(`Editing ${project.name}`)}
              onDelete={() => alert(`Deleting ${project.name}`)}
            />
          )}
        </div>
      </div>

      <div className="flex justify-between mt-2 2xl:mt-[0.5vw] text-sm 2xl:text-[0.875vw] 2xl:leading-[1.2vw]">
        <div>
          <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            Assigned To
          </p>
          <Link
            href="#"
            className="text-blue-700 font-medium underline 2xl:text-[1vw] 2xl:leading-[1.4vw]"
          >
            {project.clientName}
          </Link>
        </div>
        <div className="text-right">
          <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            {project.stage === "completed"
              ? "Actual End Date"
              : "Expected End Date"}
          </p>
          <p className="font-semibold 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            {project.endDate}
          </p>
        </div>
      </div>

      <div className="mt-2 2xl:mt-[0.5vw] text-sm 2xl:text-[0.875vw]">
        <div className="flex justify-between">
          <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            Milestone status
          </p>
          <p className="text-right 2xl:text-[1vw] 2xl:leading-[1.4vw]">
            {project.status}/{project.totalTasks}
          </p>
        </div>
        <div className="w-full h-1.5 2xl:h-[0.375vw] bg-white rounded-md overflow-hidden my-1 2xl:my-[0.25vw]">
          <div
            className="h-full bg-blue-900"
            style={{
              width: `${(project.status / project.totalTasks) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
