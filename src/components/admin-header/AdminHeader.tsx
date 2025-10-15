"use client";

import { MenuIcon, NotificationIcon } from "@/features";
import { useRouter } from "next/navigation";
import {
  INotification,
  useAuthStore,
  useDeleteNotificationMutation,
  useMarkAsReadNotificationMutation,
  useNotificationsQuery,
} from "@/services";
import { UserDropdown } from "../user-dropdown";
import { useEffect, useRef, useState } from "react";
import { IApiError } from "@/utils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { SupportTicketsIcon } from "@/features";
import { useAllTicketsAcrossProjectsQuery, ITicketData } from "@/services";
import { formatDate } from "@/utils";
import Image from "next/image";
import { CheckInCheckOut } from "./check-in-check-out";
import { Announcement } from "../user-dropdown/announcement";

interface AdminHeaderProps {
  SetIsVisibleSidebar: () => void;
}

/**
 * AdminHeader component for the admin panel.
 * Displays a menu button, search bar, notifications, and user profile dropdown.
 *
 * @component
 * @param {AdminHeaderProps} props - The component props.
 * @param {Function} props.SetIsVisibleSidebar - Function to toggle the sidebar visibility.
 * @returns {JSX.Element} The rendered AdminHeader component.
 */
export function AdminHeader({ SetIsVisibleSidebar }: AdminHeaderProps) {
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  const router = useRouter();
  const { activeSession } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSupportTickets, setShowSupportTickets] = useState(false);
  const { notifications, isLoading } = useNotificationsQuery();
  const notificationRef = useRef<HTMLDivElement>(null); // ⬅️ Ref for dropdown
  const supportTicketsRef = useRef<HTMLDivElement>(null); // ⬅️ Ref for support tickets dropdown

  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const userName =
    [firstName, lastName]
      .filter((part) => typeof part === "string" && part.trim().length > 0)
      .join(" ") || null;
  const isClient = activeSession?.user?.role?.role?.toLowerCase() === "client";

  const unreadCount =
    notifications?.filter((n: INotification) => !n.isRead).length || 0;

  // Support Tickets Query
  const {
    ticketsData,
    isLoading: ticketsLoading,
    error: ticketsError,
  } = useAllTicketsAcrossProjectsQuery({
    status: "open", // Only show open tickets
  });

  // Filter to only show open tickets
  const openTickets =
    ticketsData?.data.list?.filter(
      (ticket: ITicketData) => ticket.status.toLowerCase() === "open"
    ) || [];

  const { markNotificationAsRead } = useMarkAsReadNotificationMutation({
    onSuccessCallback: () => {
      // do something on success
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to mark as read", err.message);
    },
  });
  const { deleteNotification } = useDeleteNotificationMutation({
    onSuccessCallback: () => {
      toast.success("Notification deleted successfully");
    },
    onErrorCallback: (err) => {
      toast.error(err.message || "Failed to delete notification");
    },
  });

  const handleDeleteNotification = (
    e: React.MouseEvent,
    notificationId: string
  ) => {
    e.stopPropagation();
    deleteNotification({ id: notificationId });
  };

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, "_blank");
  };

  const handleTicketClick = (ticket: ITicketData) => {
    setShowSupportTickets(false);

    if (ticket.project?.id) {
      let url: string;

      if (activeSession?.user?.role?.role?.toLowerCase() === "client") {
        url = `/admin/my-projects/${ticket.project.id}/${ticket.id}`;
      } else {
        if (ticket.milestone?.id) {
          url = `/admin/project-management/${ticket.project.id}/${ticket.milestone.id}/tickets/${ticket.id}`;
        } else {
          return;
        }
      }
      try {
        router.push(url);
      } catch (error) {
        console.log(error);
        window.location.href = url;
      }
    } else {
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

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "LEAD_ASSIGNED":
        return "👤";
      case "FOLLOWUP_REMINDER":
        return "⏰";
      case "FOLLOWUP_CREATED":
        return "📝";
      case "QUOTATION_SENT":
        return "📄";
      case "BUSINESS_DONE":
        return "✅";
      case "LEAD_ESCALATED":
        return "🔄";
      default:
        return "📢";
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case "LEAD_ASSIGNED":
        return "New Lead Assigned";
      case "FOLLOWUP_REMINDER":
        return "Follow-up Reminder";
      case "FOLLOWUP_CREATED":
        return "New Follow-up Created";
      case "QUOTATION_SENT":
        return "Quotation Sent";
      case "BUSINESS_DONE":
        return "Business Completed";
      case "LEAD_ESCALATED":
        return "Lead Escalated";
      default:
        return type.replace("_", " ");
    }
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (
        supportTicketsRef.current &&
        !supportTicketsRef.current.contains(event.target as Node)
      ) {
        setShowSupportTickets(false);
      }
    }

    if (showNotifications || showSupportTickets) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications, showSupportTickets]);
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white shadow-sm px-4 md:px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw]">
      {/* Left: Menu + SearchBar */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 flex" onClick={SetIsVisibleSidebar}>
          <MenuIcon className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]" />
        </button>
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <CheckInCheckOut />
        {/* Support Tickets Icon */}
        {!isClient && (
          <div
            className="relative cursor-pointer border 2xl:border-[0.05vw] bg-customGray border-gray-300 p-4 2xl:p-[0.75vw] rounded-xl 2xl:rounded-[0.75vw] hover:bg-gray-100 transition-colors"
            onClick={() => setShowSupportTickets(!showSupportTickets)}
            title="View All Open Tickets"
          >
            <SupportTicketsIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
            {openTickets.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {openTickets.length}
              </span>
            )}
          </div>
        )}

        {/* Notifications Icon */}
        <div
          className="relative cursor-pointer border 2xl:border-[0.05vw] bg-customGray border-gray-300 p-4 2xl:p-[0.75vw] rounded-xl 2xl:rounded-[0.75vw]"
          onClick={() => {
            setShowNotifications(!showNotifications);
            markNotificationAsRead(); // 🔁 Call API to mark all as read
          }}
        >
          <NotificationIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {userName ? (
            <UserDropdown
              name={userName}
              onAnnouncementClick={() => setIsAnnouncementOpen(true)}
            />
          ) : (
            <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
          )}

          <Announcement
            isOpen={isAnnouncementOpen}
            onClose={() => setIsAnnouncementOpen(false)}
          />
        </div>
      </div>

      {showNotifications && (
        <div
          ref={notificationRef}
          className="absolute top-[100%] right-4 md:right-6 2xl:right-[1.5vw] mt-2 w-[300px] 2xl:w-[22vw] bg-white shadow-lg rounded-xl p-4 z-30 space-y-4 max-h-[400px] overflow-y-auto"
        >
          {isLoading ? (
            <div className="text-center py-4">Loading notifications...</div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="text-center py-4">No notifications</div>
          ) : (
            notifications.length > 0 &&
            notifications.map((notification: INotification) => (
              <div
                key={notification.id}
                className={`border rounded-xl p-4 shadow-sm ${
                  !notification.isRead ? "bg-blue-50" : ""
                } relative group cursor-pointer`}
              >
                <button
                  onClick={(e) => handleDeleteNotification(e, notification.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">
                    {getNotificationIcon(notification.type)}
                  </span>
                  <div className="flex-1">
                    <p className="font-bold">
                      {getNotificationTitle(notification.type)}
                    </p>
                    <p className="text-[0.9rem] mt-1">{notification.message}</p>
                    {notification.metadata && (
                      <div className="text-[0.9rem] mt-2 space-y-1">
                        {notification.metadata.leadName && (
                          <p>
                            Lead:{" "}
                            <span className="font-semibold text-blue-600">
                              {notification.metadata.leadName}
                            </span>
                          </p>
                        )}
                        {notification.metadata.assignedBy && (
                          <p>
                            Assigned by:{" "}
                            <span className="font-semibold text-blue-600">
                              {notification.metadata.assignedBy}
                            </span>
                          </p>
                        )}
                        {notification.metadata.leadContact && (
                          <p>
                            Contact:{" "}
                            <span className="font-semibold text-blue-600">
                              {notification.metadata.leadContact}
                            </span>
                          </p>
                        )}
                        {notification.metadata.dueDate && (
                          <p>
                            Due Date:{" "}
                            <span className="font-semibold text-blue-600">
                              {format(
                                new Date(notification.metadata.dueDate),
                                "MMM d, yyyy"
                              )}
                            </span>
                          </p>
                        )}
                        {notification.metadata.remarks && (
                          <p>
                            Remarks:{" "}
                            <span className="font-semibold text-blue-600">
                              {notification.metadata.remarks}
                            </span>
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {format(
                          new Date(notification.created_at),
                          "MMM d, yyyy h:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {showSupportTickets && (
        <div
          ref={supportTicketsRef}
          className="fixed inset-y-0 right-0 w-[22rem] md:w-[25rem] mt-[6.5rem] md:mt-[6rem] 2xl:mt-[6vw] mb-2 2xl:mb-[0.5vw] 2xl:w-[25vw] rounded-l-xl bg-white shadow-lg z-30"
        >
          <div className="h-full flex flex-col">
            <div className="p-4 2xl:p-[1vw] border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg 2xl:text-[1.2vw] font-semibold text-[#1D2939]">
                  Open Tickets
                </h3>
                <span className="text-sm 2xl:text-[0.9vw] text-gray-500">
                  ({openTickets.length} tickets)
                </span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 2xl:p-[1vw]">
              {ticketsLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : ticketsError ? (
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
                <div className="space-y-4 2xl:space-y-[1vw]">
                  {openTickets.map((ticket: ITicketData) => (
                    <button
                      key={ticket.id}
                      className="flex flex-col gap-3 2xl:gap-[0.75vw] bg-customGray border 2xl:border-[0.05vw] border-grey-300 rounded-xl 2xl:rounded-[0.75vw] p-3 2xl:p-[0.75vw] text-[0.9rem] 2xl:text-[0.9vw] text-[#1D2939] w-full cursor-pointer hover:bg-gray-100 transition-colors text-left"
                      onClick={() => handleTicketClick(ticket)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Header with title and project info */}
                      <div className="flex flex-wrap justify-between items-start gap-2 2xl:gap-[0.5vw]">
                        <div className="flex-1">
                          <h4 className="font-semibold text-[0.9rem] 2xl:text-[1vw] text-[#1D2939] mb-1 2xl:mb-[0.25vw]">
                            {ticket.title}
                          </h4>
                          <div className="flex flex-wrap gap-3 2xl:gap-[0.75vw] mb-1 2xl:mb-[0.25vw] font-medium text-[#1D2939]">
                            <span>
                              <span className="2xl:text-[0.9vw] font-normal">
                                Priority:{" "}
                              </span>
                              <span
                                className={`underline 2xl:text-[0.9vw] ${getPriorityColor(
                                  ticket.priority
                                )}`}
                              >
                                {ticket.priority}
                              </span>
                            </span>
                            {ticket.project && (
                              <span>
                                <span className="2xl:text-[0.9vw] font-normal">
                                  Project:{" "}
                                </span>
                                <span className="underline 2xl:text-[0.9vw] text-blue-600">
                                  {ticket.project.name}
                                </span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="2xl:text-[0.9vw] mb-1 2xl:mb-[0.25vw] text-sm">
                        {ticket.description?.length > 100
                          ? `${ticket.description.substring(0, 100)}...`
                          : ticket.description || "No description provided"}
                      </p>

                      {/* Remark */}
                      {/* {ticket.remark && (
                        <p className="2xl:text-[0.9vw] mb-1 2xl:mb-[0.25vw] text-gray-600 text-sm">
                          <span className="font-medium">Remark: </span>
                          {ticket.remark.length > 50
                            ? `${ticket.remark.substring(0, 50)}...`
                            : ticket.remark}
                        </p>
                      )} */}

                      {/* Image */}
                      {ticket.image_url && (
                        <div className="mb-1 2xl:mb-[0.25vw]">
                          <Image
                            src={ticket.image_url}
                            alt="Ticket attachment"
                            width={80}
                            height={80}
                            className="w-20 h-20 object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent ticket click when clicking on image
                              handleImageClick(ticket.image_url!);
                            }}
                          />
                        </div>
                      )}

                      {/* Footer with dates */}
                      <div className="flex flex-wrap items-center gap-3 2xl:gap-[0.75vw] font-medium text-xs">
                        <p className="2xl:text-[0.8vw] underline">
                          Created: {formatDate(ticket.created_at)}
                        </p>
                        <p className="text-lightGreen 2xl:text-[0.8vw]">
                          Updated: {formatDate(ticket.updated_at)}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
