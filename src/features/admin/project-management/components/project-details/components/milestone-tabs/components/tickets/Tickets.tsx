import React, { useRef, useEffect } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { formatDateToDDMMYYYY } from "@/utils";
import { useRouter } from "next/navigation";
import { ITicketData } from "@/services";

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
}

export function Tickets({
  projectId,
  ticket,
  milestoneId,
  menuOpen,
  setMenuOpen,
  canViewTicket = true,
}: TicketsProps) {
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

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
      <td className="pl-32 2xl:pl-[8vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
        {ticket.title}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">
        {ticket.description.length > 50 
          ? `${ticket.description.substring(0, 50)}...` 
          : ticket.description}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw]">
        <span className={`px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold ${getStatusColor(ticket.status)}`}>
          {ticket.status}
        </span>
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw]">
        <span className={`px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-[0.9rem] 2xl:text-[0.9vw] font-semibold ${getPriorityColor(ticket.priority)}`}>
          {ticket.priority}
        </span>
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] text-[0.9rem] 2xl:text-[0.9vw]">
        {ticket.remark || '-'}
      </td>
      <td className="px-4 2xl:px-[1vw] py-2 2xl:py-[0.9vw] 2xl:text-[0.9vw]">
        <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
          <span className="text-[0.9rem] 2xl:text-[0.9vw]">
            {ticket.created_at ? formatDateToDDMMYYYY(ticket.created_at) : "---"}
          </span>
        </span>
      </td>
    </tr>
  );
}
