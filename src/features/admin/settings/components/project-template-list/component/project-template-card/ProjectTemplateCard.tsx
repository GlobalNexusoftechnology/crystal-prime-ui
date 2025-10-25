"use client";
import { ToDoListIcon } from "@/features";
import { MoreVertical } from "lucide-react";
import { TbTargetArrow } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionDropdown } from "@/components/action-dropdown";
import { useAllTypesQuery, useDeleteProjectTemplateMutation } from "@/services";
import toast from "react-hot-toast";
import { DeleteModal } from "@/components";
import { useState } from "react";

/**
 * Props for the ProjectTemplateCard component.
 */
type ProjectTemplateCardProps = {
  id: string;
  templateName: string;
  milestoneCount: number;
  taskCount: number;
  estimatedDays: number;
  projectType: string;
  refetchAllProjectTemplates: () => void;
};

/**
 * ProjectTemplateCard: A reusable UI card to display project template details.
 *
 * Displays:
 * - Template name
 * - Milestone and task count with icons
 * - Estimated days
 * - Project type with link
 *
 * Responsive styling with flex and vw units for adaptive layout.
 */
export function ProjectTemplateCard({
  id,
  templateName,
  milestoneCount,
  taskCount,
  estimatedDays,
  projectType,
  refetchAllProjectTemplates,
}: ProjectTemplateCardProps) {
  const router = useRouter();

  const { allTypesData } = useAllTypesQuery();

  const projectTypeName =
    allTypesData?.data?.list?.find(
      (type) => type.id?.toString() === projectType
    )?.name || projectType;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { onDeleteProjectTemplate } = useDeleteProjectTemplateMutation({
    onSuccessCallback: (response) => {
      toast.success(
        response.message || "Project template deleted successfully"
      );
      refetchAllProjectTemplates();
      setShowDeleteModal(false);
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete project template");
      setShowDeleteModal(false);
    },
  });

  const handleClickOnView = () => {
    router.push(`/admin/settings/project-template/${id}`);
  };

  const handleClickOnEdit = () => {
    router.push(`/admin/settings/project-template/edit/${id}`);
  };

  const handleDelete = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDeleteProjectTemplate(id);
  };

  return (
    <div
      onClick={handleClickOnView}
      className=" flex flex-col bg-[#BAD8FD] p-[1.5rem]  rounded-2xl  w-full md:w-[52vw] lg:w-[38vw] xl:w-[26vw] shadow-md relative"
    >
      {/* More options */}
      <div
        className="absolute top-4  right-4  z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <ActionDropdown
          direction="bottom"
          icon={<MoreVertical className="text-black" />}
          options={[
            { label: "View", onClick: handleClickOnView },
            {
              label: "Edit",
              onClick: handleClickOnEdit,
            },
            {
              label: "Delete",
              onClick: handleDelete,
              className: "text-red-500",
            },
          ]}
        />
      </div>

      <div className="flex flex-col gap-2  pb-2 ">
        {/* Template Name */}
        <p className="text-[0.9rem]  text-black ">
          Template Name
        </p>
        <h2 className="text-[1rem]  text-black ">
          {templateName}
        </h2>
      </div>

      {/* Milestone & Tasks */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-[1.5vw] border-y border-gray-400">
        <div className="flex items-center gap-2  py-2 ">
          <div className="h-5 w-5  ">
            <TbTargetArrow className="h-full w-full text-gray-600" />
          </div>
          <p className="text-[1rem]  text-black">
            {milestoneCount} Milestone
          </p>
        </div>
        <div className="w-[1px] h-full bg-gray-400"></div>
        <div className="flex items-center gap-2  py-2 ">
          <div className="h-5 w-5  ">
            <ToDoListIcon className="h-full w-full" />
          </div>
          <p className="text-[1rem]  text-black">
            {taskCount} Tasks
          </p>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex sm:justify-between flex-col gap-3 sm:flex-row sm:items-center border-b border-gray-400">
        <div className="flex flex-col gap-2  py-2 ">
          <p className="text-[0.9rem]  text-black">
            Estimated Days
          </p>
          <p className="text-[1rem]  underline text-black">
            {estimatedDays} Days
          </p>
        </div>
        <div className="w-[1px] h-full bg-gray-400"></div>
        <div className="flex flex-col gap-2  py-2 ">
          <p className="text-[0.9rem]  text-black">
            Project Type
          </p>
          <Link
            href="#"
            className="text-[1rem]  underline text-black"
          >
            {projectTypeName}
          </Link>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        isLoading={false}
        title="Delete Project Template"
        message="Are you sure you want to delete this Project Template "
        itemName={templateName}
      />
    </div>
  );
}
