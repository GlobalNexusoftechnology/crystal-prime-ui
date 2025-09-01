import React, { useRef, useEffect, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatDateToDDMMYYYY } from "@/utils";
import { useRouter } from "next/navigation";
import { ITicketData, useAllUsersQuery, useUpdateTicketMutation } from "@/services";
import Image from "next/image";
import { Dropdown } from "@/components";
import toast from "react-hot-toast";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  remark: string;
  image_url?: string | null;
}

interface TicketsProps {
  ticket: ITicketData;
  projectId: string;
  milestoneId: string;
  menuOpen: { milestoneId: string; ticketId: string } | null;
  setMenuOpen: (menu: { milestoneId: string; ticketId: string } | null) => void;
  canViewTicket?: boolean;
  onAssignmentChange?: (ticketId: string, assignedTo: string) => void;
}

export function Tickets({
  projectId,
  ticket,
  milestoneId,
  menuOpen,
  setMenuOpen,
  canViewTicket = true,
  onAssignmentChange,
}: TicketsProps) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState<string>(ticket.assigned_to || "");

  const menuRef = useRef<HTMLDivElement | null>(null);

  // Fetch all users for the dropdown
  const { allUsersData, isLoading: isLoadingUsers } = useAllUsersQuery({ page: 1 });

  // Update ticket mutation
  const { updateTicket, isPending: isUpdating } = useUpdateTicketMutation({
    onSuccessCallback: (data) => {
      toast.success(data.message);
    },
    onErrorCallback: (error) => {
      toast.error("Failed to update ticket assignment. Please try again.");
      console.error("Error updating ticket assignment:", error);
    },
  });

  // Prepare dropdown options from users data
  const userOptions = React.useMemo(() => {
    const options = [
      { label: "None", value: "" }
    ];
    
    if (allUsersData?.data?.list) {
      options.push(...allUsersData.data.list.map((user) => ({
        label: `${user.first_name} ${user.last_name}`,
        value: user.id,
      })));
    }
    
    return options;
  }, [allUsersData]);

  // Handle assignment change
  const handleAssignmentChange = (value: string) => {
    // Prevent multiple simultaneous updates
    if (isUpdating) {
      return;
    }
    
    setAssignedTo(value);
    
    // Update ticket assignment via API
    const payload = {
      id: ticket.id,
      payload: {
        assigned_to: value || null,
      }
    };
    
    console.log("Updating ticket assignment with payload:", payload);
    updateTicket(payload);
    
    if (onAssignmentChange) {
      onAssignmentChange(ticket.id, value);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuOpen &&
        menuOpen.ticketId === ticket.id &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(null);
      }
    }
    if (menuOpen && menuOpen.ticketId === ticket.id) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen, ticket.id, setMenuOpen]);

  const handleRedirectView = (ticketId: string) => {
    router.push(
      `/admin/project-management/${projectId}/${milestoneId}/tickets/${ticketId}`
    );
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage(null);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-blue-100 text-blue-600";
      case "in_progress":
        return "bg-yellow-100 text-yellow-600";
      case "completed":
        return "bg-green-100 text-green-600";
      case "closed":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-600";
      case "medium":
        return "bg-yellow-100 text-yellow-600";
      case "high":
        return "bg-orange-100 text-orange-600";
      case "critical":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <>
      <tr className="border-t border-gray-200">
      <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.9vw] text-left relative">
        <button
          className="text-gray-400 hover:text-blue-600"
          title="Menu"
          type="button"
          onClick={() =>
            setMenuOpen(
              menuOpen && menuOpen.ticketId === ticket.id
                ? null
                : { milestoneId, ticketId: ticket.id }
            )
          }
        >
          <HiOutlineDotsVertical className="w-6 h-6" />
        </button>
        {menuOpen && menuOpen.ticketId === ticket.id && (
          <div
            ref={menuRef}
            className="absolute left-[80%] bottom-[10%] mt-2 bg-white border rounded shadow z-10 min-w-[100px]"
          >
            {canViewTicket && (
              <button
                className="block w-full text-left px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] hover:bg-gray-100"
                onClick={() => handleRedirectView(ticket.id)}
              >
                View
              </button>
            )}
          </div>
        )}
      </td>
      <td className="ml-32 2xl:ml-[8vw] text-center py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
        {ticket.title}
      </td>
      <td className="px-4 2xl:px-[1vw] text-center py-2 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">
        {ticket.description.length > 50 
          ? `${ticket.description.substring(0, 50)}...` 
          : ticket.description}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 text-center 2xl:py-[0.9vw]">
        <div className="flex justify-center">
          {isLoadingUsers ? (
            <span className="text-gray-400 text-sm">Loading...</span>
          ) : isUpdating ? (
            <span className="text-blue-500 text-sm">Updating...</span>
          ) : (
            <div className="text-center">
              <Dropdown
                options={userOptions}
                value={assignedTo}
                onChange={handleAssignmentChange}
                dropdownWidth="w-[15rem] 2xl:w-[15vw]"
                dropdownBorderRadius="rounded-md"
              />
            </div>
          )}
        </div>
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 text-center 2xl:py-[0.9vw]">
        <span className={`px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 text-center 2xl:py-[0.9vw]">
        <span className={`px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 text-center 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">
        {ticket.remark || '-'}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 text-center 2xl:py-[0.9vw]">
        {ticket.image_url ? (
          <div className="flex justify-center">
            <Image
              src={ticket.image_url}
              alt="Ticket attachment"
              width={60}
              height={60}
              className="w-15 h-15 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => handleImageClick(ticket.image_url!)}
            />
          </div>
        ) : (
          <span className="text-gray-400 text-sm ">No image</span>
        )}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] 2xl:text-[0.9vw]">
        <span className="flex items-center justify-center gap-2 2xl:gap-[0.5vw]">
          <span className="text-[0.9rem] 2xl:text-[0.9vw]">
            {ticket.created_at ? formatDateToDDMMYYYY(ticket.created_at) : "---"}
          </span>
        </span>
      </td>
    </tr>
    {/* Image Modal */}
    {isImageModalOpen && selectedImage && (
      <div
        className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
        onClick={handleCloseImageModal}
      >
        <div
          className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleCloseImageModal}
              className="bg-black bg-opacity-50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-all"
            >
              ×
            </button>
          </div>
          <div className="relative w-full h-full">
            <Image
              src={selectedImage}
              alt="Ticket attachment"
              width={800}
              height={600}
              className="w-full h-auto max-h-[90vh] object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>
    )}
  </>
  );
}
