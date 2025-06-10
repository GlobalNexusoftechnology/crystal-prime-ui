'use client'

import { MenuIcon, NotificationIcon } from "@/features";
import { useAuthStore, useNotificationsQuery } from "@/services";
import { UserDropdown } from '../user-dropdown';
import { useState } from "react";
import { formatDate } from "@/utils";

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
  const {activeSession} = useAuthStore()
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications, isLoading } = useNotificationsQuery();

  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const userName = firstName && lastName ? `${firstName} ${lastName}` : null;

  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;
  
  return (
    <header className="flex justify-between items-center sticky z-20 top-0 bg-white shadow-sm px-4 md:px-6 2xl:px-[1.5vw] py-4 2xl:py-[1vw]">
      {/* Left: Menu + SearchBar */}
      <div className="flex items-center gap-4">
        <button className="text-gray-700 flex" onClick={SetIsVisibleSidebar}>
          <MenuIcon className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]" />
        </button>
      </div>
      <div className="flex items-center gap-4 2xl:gap-[1vw]">
        <div className="relative cursor-pointer border 2xl:border-[0.1vw] bg-customGray border-gray-300 p-4 2xl:p-[0.75vw] rounded-xl 2xl:rounded-[0.75vw]"
          onClick={() => setShowNotifications(!showNotifications)}>
          <NotificationIcon className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </div>
        {userName ? (
          <UserDropdown
            name={userName}
          />
        ) : (
          <div className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw] rounded-full bg-gray-200 animate-pulse" />
        )}
      </div>
      {showNotifications && (
        <div className="absolute top-[100%] right-4 md:right-6 2xl:right-[1.5vw] mt-2 w-[300px] 2xl:w-[22vw] bg-white shadow-lg rounded-xl p-4 z-30 space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4">Loading notifications...</div>
          ) : notifications?.length === 0 ? (
            <div className="text-center py-4">No notifications</div>
          ) : (
            notifications?.map((notification) => (
              <div 
                key={notification.id} 
                className={`border rounded-xl p-4 shadow-sm ${!notification.isRead ? 'bg-blue-50' : ''}`}
              >
                <p className="font-bold">{notification.type.replace('_', ' ')}</p>
                <p className="text-sm">{notification.message}</p>
                {notification.metadata && (
                  <div className="text-sm mt-2">
                    <p>Lead: <span className="font-semibold text-blue-600">{notification.metadata.leadName}</span></p>
                    <p>Assigned by: <span className="font-semibold text-blue-600">{notification.metadata.assignedBy}</span></p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(notification.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </header>
  );
}
