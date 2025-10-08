"use client";

import Link from "next/link";
import { useState } from "react";
import { IProjectDetailResponse } from "@/services";
import { formatDate } from "@/utils";
import { Button } from "@/components";
import { GenerateTicketModal } from "../";
import { useRouter } from "next/navigation";

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
export const ProjectCard: React.FC<Props> = ({ project, bgColor }) => {
  const [isGenerateTicketModalOpen, setIsGenerateTicketModalOpen] = useState(false);
  const router = useRouter()

  const handleShowAllTickets = (projectId: string) => {
    router.push(`/admin/my-projects/${projectId}`)
  }
  
  return (
    <>
      <div
        className={`relative rounded-lg 2xl:rounded-[0.5vw] p-4 2xl:p-[1vw] shadow-md ${bgColor}`}
      >
        <div className="flex justify-between items-start border-b border-gray-400 pb-2 2xl:pb-[0.5vw]">
          <div>
            <p className="text-[0.9rem] 2xl:text-[0.9vw] 2xl:leading-[1.3vw] underline text-gray-600">
              Project Name
            </p>
            <h3 className="font-medium break-all text-base 2xl:text-[1.1vw] 2xl:leading-[1.5vw]">
              {project.data.name}
            </h3>
          </div>
        </div>
        <div className="flex border-b border-gray-400 flex-nowwrap h-[5rem] 2xl:h-[5vw] overflow-hidden gap-2 2xl:gap-[0.5vw] justify-between items-center text-[0.9rem] 2xl:text-[0.875vw] 2xl:leading-[1.2vw]">
          <div className="py-2 2xl:py-[0.5vw] w-[45%]">
            <p className="text-gray-600 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              Client Name
            </p>
            <Link
              href="#"
              className="font-medium underline 2xl:text-[1vw] 2xl:leading-[1.4vw]"
            >
              {project?.data?.client?.name || "Unknown Client"}
            </Link>
          </div>
          <div className="w-[1px] 2xl:w-[0.1vw] h-[10rem] 2xl:h-[10vw] bg-gray-400" />
          <div className="text-left py-2 2xl:py-[0.5vw]">
            <p className="text-gray-600 2xl:text-[1vw] underline 2xl:leading-[1.4vw]">
              {project.data.status === "completed" ||
              project.data.status === "Completed"
                ? "Actual End Date"
                : "Expected End Date"}
            </p>
            <p className="font-semibold 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              {formatDate(project.data.end_date?.toString() ?? "")}
            </p>
          </div>
        </div>

        <div className="mt-2 2xl:mt-[0.5vw] text-[0.9rem] 2xl:text-[0.875vw]">
          <div className="flex justify-between">
            <p className="text-gray-600 2xl:text-[1vw] underline 2xl:leading-[1.4vw]">
              Project status
            </p>
            <p className="text-right 2xl:text-[1vw] 2xl:leading-[1.4vw]">
              {(() => {
                const allMilestones = project.data.milestones || [];
                const milestones = allMilestones.filter((m) => {
                  const name = m.name?.toLowerCase();
                  if (name === "support") {
                    const ticketsLen = Array.isArray(m.tickets) ? m.tickets.length : 0;
                    return ticketsLen > 0;
                  }
                  return true;
                });
                const completed = milestones.filter(
                  (m) => m.status?.toLowerCase() === "completed"
                ).length;
                return `${completed}/${milestones.length}`;
              })()}
            </p>
          </div>
          <div className="w-full h-1.5 2xl:h-[0.375vw] bg-white rounded-md overflow-hidden my-1 2xl:my-[0.25vw]">
            <div
              className="h-full bg-blue-900"
              style={{
                width: `${(() => {
                  const allMilestones = project.data.milestones || [];
                  const milestones = allMilestones.filter((m) => {
                    const name = m.name?.toLowerCase();
                    if (name === "support") {
                      const ticketsLen = Array.isArray(m.tickets) ? m.tickets.length : 0;
                      return ticketsLen > 0;
                    }
                    return true;
                  });
                  if (milestones.length === 0) return 0;
                  const completed = milestones.filter(
                    (m) => m.status?.toLowerCase() === "completed"
                  ).length;
                  return (completed / milestones.length) * 100;
                })()}%`,
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 2xl:gap-[0.5vw] mt-4 2xl:mt-[1vw]">
          <Button
            title="Generate Ticket"
            variant="primary"
            onClick={() => setIsGenerateTicketModalOpen(true)}
            width="w-full"
          />
          <Button
            title="Show All Ticket"
            variant="primary"
            onClick={() => handleShowAllTickets(project.data.id)}
            width="w-full"
          />
        </div>
      </div>

      {/* Generate Ticket Modal */}
      <GenerateTicketModal
        isOpen={isGenerateTicketModalOpen}
        onClose={() => setIsGenerateTicketModalOpen(false)}
      />
    </>
  );
};
