"use client";
import React, { JSX } from "react";
import { Sidebar } from "@/components";
import { ISidebarLayoutProps } from "@/constants";

/**
 * SidebarLayout component renders a responsive layout with a toggleable sidebar.
 *
 * This component supports responsive design:
 * - The sidebar is hidden by default on smaller screens and can be toggled via a menu button.
 * - On larger screens, the sidebar is always visible.
 *
 * @param {ISidebarLayoutProps} props - Props containing children elements.
 * @returns {JSX.Element} The rendered SidebarLayout component.
 */
export function SidebarLayout({
  children,
  sidebarLinks,
}: ISidebarLayoutProps): JSX.Element {
  return (
    <div className="w-full flex gap-8 md:gap-[5vw]">
      <div
        className={`w-[80%] md:w-[50%] lg:w-[26%] xl:w-[20%] h-full z-40 transition-transform duration-300 ease-in-out scrollbar-none`}
      >
        <Sidebar sidebarLinks={sidebarLinks} />
      </div>
      <div className="w-full lg:w-[75%] xl:w-[80%]">{children}</div>
    </div>
  );
}
