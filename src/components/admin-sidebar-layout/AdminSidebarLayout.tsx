"use client";
import React, { JSX, useState } from "react";
import { AdminHeader, AdminSidebar } from "@/components";
import { IAdminSidebarLayoutProps } from "@/constants";
import { usePermission } from "@/utils/hooks";
import { Announcement } from "../user-dropdown/announcement";

/**
 * AdminSidebarLayout component renders a responsive admin layout with a taggable sidebar.
 *
 * @component
 * @param {IAdminSidebarLayoutProps} props - The component props.
 * @param {JSX.Element} props.children - The main content to be displayed.
 * @param {IAdminSidebarLink[]} props.adminSidebarLinks - Array of sidebar navigation links.
 * @returns {JSX.Element} The rendered AdminSidebarLayout component.
 */
export function AdminSidebarLayout({
  children,
  adminSidebarLinks,
}: IAdminSidebarLayoutProps): JSX.Element {
  const [isVisibleSidebar, SetIsVisibleSidebar] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);
  const { hasPermission } = usePermission();

  const filteredLinks = adminSidebarLinks.filter((item) =>
    item.permission
      ? hasPermission(item.permission.module, item.permission.actions)
      : true
  );

  /**
   * Toggles the visibility of the sidebar.
   */
  const toggleSidebar = () => {
    SetIsVisibleSidebar((prev) => !prev);
  };

  return (
    <div className="w-full flex justify-end h-screen overflow-auto">
      {/* Sidebar */}
      <div
        className={`${
          isVisibleSidebar ? "w-0 xl:w-[6rem]" : "w-[70%] md:w-[17rem]"
        } h-full z-40 transition-all duration-500 ease-in-out overflow-hidden bg-white shadow-md fixed left-0`}
      >
        <AdminSidebar
          adminSidebarLinks={filteredLinks}
          isVisibleSidebar={isVisibleSidebar}
        />
      </div>
      {/* Main Content */}
      <div
        className={`${
          isVisibleSidebar
            ? "w-full xl:w-[calc(100%-6rem)]"
            : "w-[30%] md:w-[calc(100%-17rem)]"
        } transition-all duration-500 ease-in-out`}
      >
        <AdminHeader
          SetIsVisibleSidebar={toggleSidebar}
          setIsAnnouncementOpen={setIsAnnouncementOpen}
        />
        <div className="px-4 md:px-6 xl:px-[1.5vw] py-[1.5vw] overflow-auto min-h-[91.5vh]">
          {children}
        </div>
      </div>
      {isAnnouncementOpen ? (
        <Announcement
          isOpen={isAnnouncementOpen}
          onClose={() => setIsAnnouncementOpen(false)}
        />
      ) : null}
    </div>
  );
}
