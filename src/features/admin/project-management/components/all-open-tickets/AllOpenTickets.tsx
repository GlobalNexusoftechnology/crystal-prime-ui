"use client";
import Image from "next/image";
import { ModalOverlay } from "@/components";
import {
  useAllTicketsAcrossProjectsQuery,
  ITicketData,
} from "@/services";
import { formatDate } from "@/utils";

interface AllOpenTicketsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AllOpenTickets({ isOpen, onClose }: AllOpenTicketsProps) {
  // Fetch all open tickets across all projects
  const {
    ticketsData,
    isLoading: ticketsLoading,
    error,
  } = useAllTicketsAcrossProjectsQuery({
    status: "open", // Only show open tickets
  });

  // Filter to only show open tickets
  const openTickets = ticketsData?.filter((ticket: ITicketData) => 
    ticket.status.toLowerCase() === "open"
  ) || [];

  const handleImageClick = (imageUrl: string) => {
    // Open image in new tab for simplicity
    window.open(imageUrl, '_blank');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "text-green-600";
      case "medium":
        return "text-yellow-600";
      case "high":
        return "text-orange-600";
      case "critical":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };



  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      modalTitle="All Open Tickets"
      modalClassName="w-full md:w-[500px] 2xl:w-[30vw] max-w-[500px]"
      position="right"
    >
      <div className="flex flex-col gap-4 2xl:gap-[1vw] h-full">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 2xl:gap-[1vw]">
            <h3 className="text-lg 2xl:text-[1.2vw] font-semibold text-[#1D2939]">
              Open Tickets
            </h3>
            <span className="text-sm 2xl:text-[0.9vw] text-gray-500">
              ({openTickets.length} tickets)
            </span>
          </div>
        </div>



        {/* Tickets List */}
        <div className="flex-1 overflow-y-auto">
          {ticketsLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4 2xl:text-[1.1vw]">
                Failed to load tickets. Please try again.
              </p>
            </div>
          ) : openTickets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4 2xl:text-[1.1vw]">
                No open tickets found across all projects.
              </p>
            </div>
          ) : (
            <div className="space-y-4 2xl:space-y-[1vw] max-h-[60vh] overflow-y-auto">
              {openTickets.map((ticket: ITicketData) => (
                <div
                  key={ticket.id}
                  className="flex flex-col gap-4 2xl:gap-[1vw] bg-customGray border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-4 2xl:p-[1vw] text-[0.9rem] 2xl:text-[0.9vw] text-[#1D2939] w-full"
                >
                  {/* Header with title and project info */}
                  <div className="flex flex-wrap justify-between items-start gap-4 2xl:gap-[1vw]">
                    <div className="flex-1">
                      <h4 className="font-semibold text-[1rem] 2xl:text-[1.1vw] text-[#1D2939] mb-2 2xl:mb-[0.5vw]">
                        {ticket.title}
                      </h4>
                      <div className="flex flex-wrap gap-4 2xl:gap-[1vw] mb-2 2xl:mb-[0.5vw] font-medium text-[#1D2939]">
                        <span>
                          <span className="2xl:text-[1.1vw] font-normal">Priority: </span>
                          <span className={`underline 2xl:text-[1.1vw] ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </span>
                        {ticket.project && (
                          <span>
                            <span className="2xl:text-[1.1vw] font-normal">Project: </span>
                            <span className="underline 2xl:text-[1.1vw] text-blue-600">
                              {ticket.project.name}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw]">
                    {ticket.description || 'No description provided'}
                  </p>

                  {/* Remark */}
                  {ticket.remark && (
                    <p className="2xl:text-[1.1vw] mb-2 2xl:mb-[0.5vw] text-gray-600">
                      <span className="font-medium">Remark: </span>
                      {ticket.remark}
                    </p>
                  )}

                  {/* Image */}
                  {ticket.image_url && (
                    <div className="mb-2 2xl:mb-[0.5vw]">
                      <Image
                        src={ticket.image_url}
                        alt="Ticket attachment"
                        width={120}
                        height={120}
                        className="w-30 h-30 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleImageClick(ticket.image_url!)}
                      />
                    </div>
                  )}

                  {/* Footer with dates */}
                  <div className="flex flex-wrap items-center gap-4 2xl:gap-[1vw] font-medium">
                    <p className="2xl:text-[1.1vw] underline">
                      Created: {formatDate(ticket.created_at)}
                    </p>
                    <p className="text-lightGreen 2xl:text-[1.1vw]">
                      Updated: {formatDate(ticket.updated_at)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ModalOverlay>
  );
}
