"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ProjectDropdown } from "../project-dropdown";
import { useRouter } from "next/navigation";
import { IProjectDetailResponse, useAllProjectsQuery, useDeleteProjectMutation } from "@/services";
import { formatDate } from "@/utils";
import { DeleteModal } from "@/components";

type Props = {
  project: IProjectDetailResponse;
  bgColor: string;
  canViewProject?: boolean;
  canEditProject?: boolean;
  canDeleteProject?: boolean;
};

/**
 * ProjectCard: Displays individual project card with dropdown for actions
 */
export const ProjectCard: React.FC<Props> = ({ 
  project, 
  bgColor,
  canViewProject = true,
  canEditProject = true,
  canDeleteProject = true,
}) => {
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
        className={`relative rounded-lg  p-4  shadow-md ${bgColor}`}
      >
        <div className="flex justify-between items-start border-b border-gray-400 pb-2 " ref={dropdownRef}>
          <div>
            <p className="text-[0.9rem]   underline text-gray-600">
              Project Name
            </p>
            <h3 className="font-medium break-all text-base  ">
              {project.data.name}
            </h3>
          </div>
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-gray-600 text-xl  "
              disabled={isPending}
            >
              ⋮
            </button>
            {showDropdown && (
              <ProjectDropdown
                onView={() => router.push(`/admin/project-management/${project.data.id}`)}
                onEdit={() => router.push(`/admin/project-management/edit/${project.data.id}`)}
                onDelete={handleDelete}
                canViewProject={canViewProject}
                canEditProject={canEditProject}
                canDeleteProject={canDeleteProject}
              />
            )}
          </div>
        </div>

        <div className="flex border-b border-gray-400 flex-nowrap gap-2 h-[5.2rem]  overflow-hidden  items-center justify-between text-[0.9rem]  ">
          <div className="py-2  w-[45%]">
            <p className="text-gray-600  ">
              Client Name
            </p>
            <Link
              href="#"
              className="font-medium underline  "
            >
              {project?.data?.client?.name || "Unknown Client"}
            </Link>
          </div>
          <div className="w-[1px]  h-[10rem]  bg-gray-400"/>
          <div className="text-left py-2 ">
            <p className="text-gray-600  underline ">
              {project.data.status === "completed" || project.data.status === "Completed"
                ? "Actual End Date"
                : "Expected End Date"}
            </p>
            <p className="font-semibold  ">
              {formatDate(project.data.end_date?.toString() ?? "")}
            </p>
          </div>
        </div>

        <div className="mt-2  text-[0.9rem] ">
          <div className="flex justify-between">
            <p className="text-gray-600  underline ">
              Project status
            </p>
            <p className="text-right  ">
              {(() => {
                const allMilestones = project.data.milestones || [];
                const milestones = allMilestones.filter(m => {
                  const name = m.name?.toLowerCase();
                  if (name === "support") {
                    const ticketsLen = Array.isArray(m.tickets) ? m.tickets.length : 0;
                    return ticketsLen > 0;
                  }
                  return true;
                });
                const completed = milestones.filter(m => m.status?.toLowerCase() === "completed").length;
                return `${completed}/${milestones.length}`;
              })()}
            </p>
          </div>
          <div className="w-full h-1.5  bg-white rounded-md overflow-hidden my-1">
            <div
              className="h-full bg-blue-900"
              style={{
                width: `${(() => {
                  const allMilestones = project.data.milestones || [];
                  const milestones = allMilestones.filter(m => {
                    const name = m.name?.toLowerCase();
                    if (name === "support") {
                      const ticketsLen = Array.isArray(m.tickets) ? m.tickets.length : 0;
                      return ticketsLen > 0;
                    }
                    return true;
                  });
                  if (milestones.length === 0) return 0;
                  const completed = milestones.filter(m => m.status?.toLowerCase() === "completed").length;
                  return (completed / milestones.length) * 100;
                })()}%`,
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
