"use client";

import {  MenuIcon, NotificationIcon } from "@/features";
import {
  INotification,
  useAuthStore,
  useDeleteNotificationMutation,
  useMarkAsReadNotificationMutation,
  useNotificationsQuery,
} from "@/services";
import { UserDropdown } from "../user-dropdown";
import { useEffect, useRef, useState } from "react";
import {  IApiError } from "@/utils";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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
  const { activeSession } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, isLoading } = useNotificationsQuery();
  const notificationRef = useRef<HTMLDivElement>(null); // ⬅️ Ref for dropdown

  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const userName = firstName && lastName ? `${firstName} ${lastName}` : null;

  const unreadCount = notifications?.filter((n: INotification) => !n.isRead).length || 0;
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
      toast.success('Notification deleted successfully');
    },
    onErrorCallback: (err) => {
      toast.error(err.message || 'Failed to delete notification');
    },
  });

  const handleDeleteNotification = (e: React.MouseEvent, notificationId: string) => {
    e.stopPropagation();
    deleteNotification({ id: notificationId });
  };



  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'LEAD_ASSIGNED':
        return '👤';
      case 'FOLLOWUP_REMINDER':
        return '⏰';
      case 'FOLLOWUP_CREATED':
        return '📝';
      case 'QUOTATION_SENT':
        return '📄';
      case 'BUSINESS_DONE':
        return '✅';
      case 'LEAD_ESCALATED':
        return '🔄';
      default:
        return '📢';
    }
  };

  const getNotificationTitle = (type: string) => {
    switch (type) {
      case 'LEAD_ASSIGNED':
        return 'New Lead Assigned';
      case 'FOLLOWUP_REMINDER':
        return 'Follow-up Reminder';
      case 'FOLLOWUP_CREATED':
        return 'New Follow-up Created';
      case 'QUOTATION_SENT':
        return 'Quotation Sent';
      case 'BUSINESS_DONE':
        return 'Business Completed';
      case 'LEAD_ESCALATED':
        return 'Lead Escalated';
      default:
        return type.replace('_', ' ');
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
    }

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white shadow-sm px-4 md:px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw]">
      {/* Left: Menu + SearchBar */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 flex" onClick={SetIsVisibleSidebar}>
          <MenuIcon className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]" />
        </button>
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <div
          className="relative cursor-pointer border 2xl:border-[0.1vw] bg-customGray border-gray-300 p-4 2xl:p-[0.75vw] rounded-xl 2xl:rounded-[0.75vw]"
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
        {userName ? (
          <UserDropdown name={userName} />
        ) : (
          <div className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw] rounded-full bg-gray-200 animate-pulse" />
        )}
      </div>

      {showNotifications && (
        <div  ref={notificationRef}
         className="absolute top-[100%] right-4 md:right-6 2xl:right-[1.5vw] mt-2 w-[300px] 2xl:w-[22vw] bg-white shadow-lg rounded-xl p-4 z-30 space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4">Loading notifications...</div>
          ) : !notifications || notifications.length === 0 ? (
            <div className="text-center py-4">No notifications</div>
          ) : (
            notifications.length > 0 && notifications.map((notification: INotification) => (
              <div 
                key={notification.id} 
                className={`border rounded-xl p-4 shadow-sm ${!notification.isRead ? 'bg-blue-50' : ''} relative group cursor-pointer`}
              >
                <button
                  onClick={(e) => handleDeleteNotification(e, notification.id)}
                  className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                  <div className="flex-1">
                    <p className="font-bold">{getNotificationTitle(notification.type)}</p>
                    <p className="text-[0.9rem] mt-1">{notification.message}</p>
                    {notification.metadata && (
                      <div className="text-[0.9rem] mt-2 space-y-1">
                        {notification.metadata.leadName && (
                          <p>Lead: <span className="font-semibold text-blue-600">{notification.metadata.leadName}</span></p>
                        )}
                        {notification.metadata.assignedBy && (
                          <p>Assigned by: <span className="font-semibold text-blue-600">{notification.metadata.assignedBy}</span></p>
                        )}
                        {notification.metadata.leadContact && (
                          <p>Contact: <span className="font-semibold text-blue-600">{notification.metadata.leadContact}</span></p>
                        )}
                        {notification.metadata.dueDate && (
                          <p>Due Date: <span className="font-semibold text-blue-600">{format(new Date(notification.metadata.dueDate), 'MMM d, yyyy')}</span></p>
                        )}
                        {notification.metadata.remarks && (
                          <p>Remarks: <span className="font-semibold text-blue-600">{notification.metadata.remarks}</span></p>
                        )}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">
                        {format(new Date(notification.created_at), 'MMM d, yyyy h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </header>
  );
}
