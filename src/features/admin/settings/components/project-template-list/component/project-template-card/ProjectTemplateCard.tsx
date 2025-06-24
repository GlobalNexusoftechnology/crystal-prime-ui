"use client"
import { ToDoListIcon } from "@/features";
import { MoreVertical } from "lucide-react";
import { TbTargetArrow } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
}: ProjectTemplateCardProps) {
  const router = useRouter();
  const handleClickOnView = () => {
    router.push(`/admin/settings/project-template/${id}`);
  };
  return (
    <div onClick={handleClickOnView} className=" flex flex-col gap-3 2xl:gap-[0.75vw] bg-[#BAD8FD] p-[1.5rem] 2xl:p-[1.5vw] rounded-2xl 2xl:rounded-[1vw] w-full md:w-[52vw] lg:w-[38vw] xl:w-[26vw] shadow-md relative">
      {/* More options */}
      <div className="absolute top-[1vw] right-[1vw]">
        <MoreVertical className="text-black"  />
      </div>

      <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
        {/* Template Name */}
        <p className="text-[0.9rem] 2xl:text-[0.9vw] text-black ">
          Template Name
        </p>
        <h2 className="text-[1rem] 2xl:text-[1vw] text-black ">
          {templateName}
        </h2>
      </div>

      {/* Milestone & Tasks */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-[1.5vw]">
        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
          <div className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw]">
            <TbTargetArrow className="h-full w-full text-gray-600" />
          </div>
          <p className="text-[1rem] 2xl:text-[1vw] text-black">
            {milestoneCount} Milestone
          </p>
        </div>
        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
          <div className="h-5 w-5 2xl:h-[1.5vw] 2xl:w-[1.5vw]">
            <ToDoListIcon className="h-full w-full" />
          </div>
          <p className="text-[1rem] 2xl:text-[1vw] text-black">
            {taskCount} Tasks
          </p>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="flex sm:justify-between flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
          <p className="text-[0.9rem] 2xl:text-[0.9vw] text-black">
            Estimated Days
          </p>
          <p className="text-[1rem] 2xl:text-[1vw] underline text-black">
            {estimatedDays} Days
          </p>
        </div>
        <div className="flex flex-col gap-2 2xl:gap-[0.5vw]">
          <p className="text-[0.9rem] 2xl:text-[0.9vw] text-black">
            Project Type
          </p>
          <Link
            href="#"
            className="text-[1rem] 2xl:text-[1vw] underline text-black"
          >
            {projectType}
          </Link>
        </div>
      </div>
    </div>
  );
}
