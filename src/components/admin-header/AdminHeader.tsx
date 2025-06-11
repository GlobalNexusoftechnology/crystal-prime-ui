"use client";

import { CrossIcon, MenuIcon, NotificationIcon } from "@/features";
import {
  useAuthStore,
  useDeleteNotificationMutation,
  useMarkAsReadNotificationMutation,
  useNotificationsQuery,
} from "@/services";
import { UserDropdown } from "../user-dropdown";
import { useState } from "react";
import { formatDate, IApiError } from "@/utils";

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

  const firstName = activeSession?.user?.first_name;
  const lastName = activeSession?.user?.last_name;
  const userName = firstName && lastName ? `${firstName} ${lastName}` : null;

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  const { markNotificationAsRead } = useMarkAsReadNotificationMutation({
    onSuccessCallback: () => {
      // do something on success
    },
    onErrorCallback: (err: IApiError) => {
      console.error("Failed to mark as read", err.message);
    },
  });
  const { deleteNotification } = useDeleteNotificationMutation();

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
      {/* {showNotifications && (
        <div className="absolute top-[100%] right-4 md:right-6 2xl:right-[1.5vw] mt-2 w-[300px] 2xl:w-[22vw] bg-white shadow-lg rounded-xl p-4 z-30 space-y-4 max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <div className="text-center py-4">Loading notifications...</div>
          ) : notifications?.length === 0 ? (
            <div className="text-center py-4">No notifications</div>
          ) : (
            notifications?.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-xl p-4 shadow-sm ${
                  !notification.isRead ? "bg-blue-50" : ""
                }`}
              >
                <p className="font-bold">
                  {notification.type.replace("_", " ")}
                </p>
                <p className="text-sm">{notification.message}</p>
                {notification.metadata && (
                  <div className="text-sm mt-2">
                    <p>
                      Lead:{" "}
                      <span className="font-semibold text-blue-600">
                        {notification.metadata.leadName}
                      </span>
                    </p>
                    <p>
                      Assigned by:{" "}
                      <span className="font-semibold text-blue-600">
                        {notification.metadata.assignedBy}
                      </span>
                    </p>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {formatDate(notification.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      )} */}
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
                className={`border-2 border-[#044A9F] flex flex-col gap-[1rem] 2xl:gap-[1vw] p-5 2xl:p-[1.25vw] rounded-2xl w-full relative ${
                  !notification.isRead ? "bg-blue-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg 2xl:text-[1.2vw]">
                    {notification.type.replace("_", " ")}
                  </h3>
                  <div   onClick={() =>
                    deleteNotification({ id: notification.id })
                  } className="bg-[#E5E5E5] h-7 2xl:h-[1.75vw] w-7 2xl:w-[1.75vw] flex items-center justify-center rounded-full absolute top-2 2xl:top-[0.5vw] right-2 2xl:right-[0.5vw] cursor-pointer">
                    <div className="h-3 w-3 2xl:h-[0.75vw] 2xl:w-[0.75vw]">
                      <CrossIcon className="h-full w-full" />
                    </div>
                  </div>
                </div>

                <div className="text-sm 2xl:text-[0.9vw] flex flex-wrap gap-1 2xl:gap-[0.25vw]">
                  {/* <p className="m-0">A new lead has been assigned to staff member</p>
            <span className="font-bold text-[#044A9F]">
              {notification.metadata?.leadName || "Unknown"}
            </span>
            <p className="m-0">by</p>
            <span className="font-bold text-[#044A9F] underline">
              {notification.metadata?.assignedBy || "Someone"}
            </span> */}
                  {notification.metadata && (
                    <div className="text-sm mt-2">
                      <p>
                        Lead:{" "}
                        <span className="font-bold text-[#044A9F]">
                          {notification.metadata.leadName}
                        </span>
                      </p>
                      <p>
                        Assigned by:{" "}
                        <span className="font-bold text-[#044A9F] underline">
                          {notification.metadata.assignedBy}
                        </span>
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-2">
                    {formatDate(notification.created_at)}
                  </p>
                </div>

                <span className="text-sm font-bold 2xl:text-[0.9vw] whitespace-nowrap">
                  Read More
                </span>

                <p className="text-xs text-gray-500 absolute bottom-2 right-2">
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
