"use client";
import { useState } from "react";
import Image from "next/image";
import { Dropdown, ModalOverlay } from "@/components";
import { useAllTicketsQuery, ITicketData } from "@/services";
import { formatDate } from "@/utils";

interface ITicketsProps {
  projectId: string;
}

export function Tickets({ projectId }: ITicketsProps) {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Fetch tickets for this project with filters
  const {
    ticketsData,
    isLoading: ticketsLoading,
    error,
  } = useAllTicketsQuery(projectId, {
    status: statusFilter,
    priority: priorityFilter,
  });

  // Use API-filtered data directly
  const filteredTickets = ticketsData || [];

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "text-blue-600";
      case "in_progress":
        return "text-yellow-600";
      case "resolved":
        return "text-green-600";
      case "closed":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
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

  // Filter options
  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "Open", value: "open" },
    { label: "In Progress", value: "in_progress" },
    { label: "Resolved", value: "resolved" },
    { label: "Closed", value: "closed" },
  ];

  const priorityOptions = [
    { label: "All Priority", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
    { label: "Critical", value: "critical" },
  ];

  if (ticketsLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 ">
      {/* Header with filters */}
      <div className="flex flex-col md:flex-row gap-4  justify-between items-start md:items-center">
        <div className="flex items-center gap-4 ">
          <h3 className="text-lg  font-semibold text-[#1D2939]">
            Project Tickets
          </h3>
          <span className="text-sm  text-gray-500">
            ({filteredTickets.length} tickets)
          </span>
        </div>
      </div>

      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-4  justify-between items-start md:items-center">
        <div className="flex flex-col sm:flex-row gap-3  w-full md:w-auto">
          <div className="w-full sm:w-48 ">
            <Dropdown
              options={statusOptions}
              value={statusFilter}
              onChange={(value) => setStatusFilter(value)}
            />
          </div>
          <div className="w-full sm:w-48 ">
            <Dropdown
              options={priorityOptions}
              value={priorityFilter}
              onChange={(value) => setPriorityFilter(value)}
            />
          </div>
        </div>
      </div>

      {/* Tickets List */}
      {error ? (
        <div className="text-center py-8">
          <p className="text-red-600 mb-4 ">
            Failed to load tickets. Please try again.
          </p>
          <button
            className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      ) : filteredTickets.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4 ">
            {statusFilter || priorityFilter
              ? "No tickets found matching your filters."
              : "No tickets found for this project."}
          </p>
          {!statusFilter && !priorityFilter && (
            <p className="text-gray-400 ">
              No tickets available for this project.
            </p>
          )}
        </div>
      ) : (
        <div className="space-y-4 ">
          {filteredTickets.map((ticket: ITicketData) => (
            <div
              key={ticket.id}
              className="flex flex-col gap-4  bg-customGray border  border-grey-300 rounded-xl  p-4  text-[0.9rem]  text-[#1D2939] w-full"
            >
              {/* Header with title */}
              <div className="flex flex-wrap justify-between items-start gap-4 ">
                <div className="flex-1">
                  <h4 className="font-semibold text-[1rem]  text-[#1D2939] mb-2 ">
                    {ticket.title}
                  </h4>
                  <div className="flex flex-wrap gap-4  mb-2  font-medium text-[#1D2939]">
                    <span>
                      <span className=" font-normal">
                        Status:{" "}
                      </span>
                      <span
                        className={`underline  ${getStatusColor(
                          ticket.status
                        )}`}
                      >
                        {ticket.status}
                      </span>
                    </span>
                    <span>
                      <span className=" font-normal">
                        Priority:{" "}
                      </span>
                      <span
                        className={`underline  ${getPriorityColor(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority}
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className=" mb-2 ">
                {ticket.description || "No description provided"}
              </p>

              {/* Remark */}
              {/* {ticket.remark && (
                <p className=" mb-2  text-gray-600">
                  <span className="font-medium">Remark: </span>
                  {ticket.remark}
                </p>
              )} */}

              {/* Image */}
              {ticket.image_url && (
                <div className="mb-2 ">
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
              <div className="flex flex-wrap items-center gap-4  font-medium">
                <p className=" underline">
                  Created: {formatDate(ticket.created_at)}
                </p>
                <p className="text-lightGreen ">
                  Updated: {formatDate(ticket.updated_at)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Image Popup Modal */}
      <ModalOverlay
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setSelectedImage(null);
        }}
        modalTitle="Ticket Image"
        modalClassName="w-full md:w-[80vw] max-w-4xl"
      >
        <div className="flex justify-center items-center p-4">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt="Ticket attachment"
              width={800}
              height={600}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          )}
        </div>
      </ModalOverlay>
    </div>
  );
}
