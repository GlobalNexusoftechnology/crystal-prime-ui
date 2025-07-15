"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";
import { usePermission } from "@/utils/hooks";
import { CgLogOut } from "react-icons/cg";

interface IAdminSidebarProps {
  adminSidebarLinks: IAdminSidebarLink[];
  isVisibleSidebar: boolean;
}

export function AdminSidebar({
  adminSidebarLinks,
  isVisibleSidebar,
}: IAdminSidebarProps) {
  const pathName = usePathname();
  const router = useRouter();
  const { removeSession } = useAuthStore();
  const [reportsOpen, setReportsOpen] = useState(() => {
    // Open if any sublink is active on initial render
    return adminSidebarLinks.some(link => link.links && link.links.some(sublink => pathName === sublink.path));
  });
  // Use the usePermission hook for permission checks
  const { hasPermission } = usePermission();

  // Auto-open Reports dropdown if navigating to a sublink
  useEffect(() => {
    if (adminSidebarLinks.some(link => link.links && link.links.some(sublink => pathName === sublink.path))) {
      setReportsOpen(true);
    }
  }, [pathName, adminSidebarLinks]);

  // Helper to check if any sublink is active
  const isAnySublinkActive = (link: IAdminSidebarLink) => {
    if (!link.links) return false;
    return link.links.some((sublink) => pathName === sublink.path);
  };

  // Function to handle navigation
  const handleRedirect = (link: string) => {
    if (link === "/admin/logout") {
      handleLogout();
    } else {
      router.push(link);
    }
  };

  // Logout function
  const handleLogout = () => {
    removeSession();
    router.push("/login"); // Redirect to login page
  };

  return (
    <aside
      className={`relative flex flex-col items-center w-full h-full bg-white py-2 2xl:py-[1vw] overflow-hidden`}
    >
      <div className="flex justify-center pb-4 2xl:pb-[1vw]">
        {!isVisibleSidebar ? (
          <div className={`w-[13rem] xl:w-[15vw]`}>
            <Image
              src={ImageRegistry.websiteLogo}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
            />
          </div>
        ) : (
          <div className={`w-[5rem] xl:w-[5vw]`}>
            <Image
              src={ImageRegistry.websiteLogoIcon}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={() => router.push("/")}
            />
          </div>
        )}
      </div>
      <ul className="w-full h-full flex flex-col justify-between gap-4 2xl:gap-[1vw] overflow-scroll admin-sidebar-links-container">
        <div className="flex flex-col gap-4 2xl:gap-[1vw]">
          {adminSidebarLinks.map((link, index) => {
            if (link.links && link.links.length > 0) {
              // Render parent link with dropdown for sublinks
              const isActive = isAnySublinkActive(link);
              const isOpen = (reportsOpen || isActive) && !isVisibleSidebar;
              return (
                <li key={index} className="flex flex-col px-4">
                  <button
                    onClick={() => setReportsOpen((prev) => !prev)}
                    className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left text-base 2xl:text-[1vw] font-medium ${isActive ? "text-primary" : "text-gray-600"}`}
                  >
                    <span className="w-6 h-6 2xl:w-[1.2vw] 2xl:h-[1.2vw] flex items-center justify-center">
                      {link.icon}
                    </span>
                    <span className={`${isVisibleSidebar ? "hidden" : "flex"}`}>{link.name}</span>
                    <svg className={`w-4 h-4 ml-auto transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {isOpen && !isVisibleSidebar && (
                    <ul className="ml-8 mt-1 flex flex-col gap-1">
                      {link.links.map((sublink, subIdx) => {
                        // Permission check for sublink
                        if (sublink.permission && !hasPermission(sublink.permission.module, sublink.permission.actions)) return null;
                        return (
                          <li key={subIdx}>
                            <button onClick={() => handleRedirect(sublink.path)}
                              className={`w-full text-left px-2 py-1 hover:text-primary ${pathName === sublink.path ? "text-primary font-medium" : "text-gray-600"}`}
                            >{sublink.name}</button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            }
            // All other links
            const isActive = pathName === link.path;
            return (
              <li key={index} className="flex items-center relative group px-4">
                {isActive ? (
                  <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
                ) : null}
                <button
                  onClick={() => handleRedirect(link.path)}
                  className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                    isActive ? "text-primary" : null
                  }`}
                >
                  <span className="w-8 2xl:w-[2vw] h-8 2xl:h-[2vw]">
                    {isActive ? link.activeIcon : link.icon}
                  </span>
                  <span
                    className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                      isActive ? "text-primary font-medium" : " text-gray-600"
                    } text-base 2xl:text-[1vw]`}
                  >
                    {link.name}
                  </span>
                </button>
              </li>
            );
          })}
        </div>
        <div
          onClick={handleLogout}
          className={`${
            isVisibleSidebar ? "justify-center" : "justify-start"
          } flex items-center gap-4 2xl:gap-[1vw] p-6 2xl:p-[1.5vw]  cursor-pointer`}
        >
          <CgLogOut className="w-6 h-6 2xl:w-[1.5vw] 2xl:h-[1.5vw]" />
          <h1
            className={`${
              isVisibleSidebar ? "hidden" : "flex"
            } text-base 2xl:text-[1vw]`}
          >
            Logout
          </h1>
        </div>
      </ul>
    </aside>
  );
}
