"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProjectDropdown } from "../project-dropdown";
import { useRouter } from "next/navigation";
import { IProjectDetailResponse, useAllProjectsQuery, useDeleteProjectMutation } from "@/services";
import { formatIndiaTime } from "@/utils";
import { DeleteModal } from "@/components";

type Props = {
  project: IProjectDetailResponse;
  bgColor: string;
};

/**
 * ProjectCard: Displays individual project card with dropdown for actions
 */
export const ProjectCard: React.FC<Props> = ({ project, bgColor }) => {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false);
  const { refetchAllProjects } = useAllProjectsQuery();

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { onDeleteProject, isPending } = useDeleteProjectMutation({
    onSuccessCallback: (response) => {
      console.log("Project deleted successfully:", response);
      setShowDeleteConfirm(false);
      setShowDropdown(false);
      refetchAllProjects()
      // The projects list will automatically refresh due to cache invalidation
    },
    onErrorCallback: (error) => {
      console.error("Error deleting project:", error);
      alert(`Failed to delete project: ${error.message}`);
    },
  });

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleDelete = () => {
    setShowDeleteConfirm(true);
    setShowDropdown(false);
  };

  const confirmDelete = () => {
    onDeleteProject(project.data.id);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

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
    <>
      <div
        className={`relative rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] shadow-md ${bgColor}`}
      >
        <div className="flex justify-between items-start" ref={dropdownRef}>
          <div>
            <p className="text-sm 2xl:text-[0.9vw] 2xl:leading-[1.3vw] text-gray-600">
              Project Name
            </p>
            <h3 className="font-medium text-base 2xl:text-[1.1vw] 2xl:leading-[1.5vw]">
              {project.data.name}
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 text-xl 2xl:text-[1.25vw] 2xl:leading-[1.5vw]"
              disabled={isPending}
            >
              ⋮
            </button>
            {showDropdown && (
              <ProjectDropdown
                onView={() => router.push(`/admin/project-management/${project.data.id}`)}
                onEdit={() => router.push(`/admin/project-management/edit/${project.data.id}`)}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>

        <div className="flex justify-between mt-2 2xl:mt-[0.5vw] text-sm 2xl:text-[0.875vw] 2xl:leading-[1.2vw]">
          <div>
            <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              Client Name
            </p>
            <Link
              href="#"
              className="font-medium underline 2xl:text-[1vw] 2xl:leading-[1.4vw]"
            >
              {project?.data?.client.name}
            </Link>
          </div>
          <div className="text-right">
            <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              {project.data.status === "completed"
                ? "Actual End Date"
                : "Expected End Date"}
            </p>
            <p className="font-semibold 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              {formatIndiaTime(project.data.end_date?.toString() ?? "", "toReadable")}
            </p>
          </div>
        </div>

        <div className="mt-2 2xl:mt-[0.5vw] text-sm 2xl:text-[0.875vw]">
          <div className="flex justify-between">
            <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              Project status
            </p>
            <p className="text-right 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              {project.data.milestones?.length || 0}/100
            </p>
          </div>
          <div className="w-full h-1.5 2xl:h-[0.375vw] bg-white rounded-md overflow-hidden my-1 2xl:my-[0.25vw]">
            <div
              className="h-full bg-blue-900"
              style={{
                width: `${(project.data.milestones?.length || 0)}%`,
              }}
            />
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteConfirm}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        title="Confirm Delete Project"
        message="Are you sure you want to delete the project"
        itemName={project.data.name}
        isLoading={isPending}
        loadingText="Deleting project..."
        confirmText="Delete Project"
        cancelText="Cancel"
      />
    </>
  );
};
