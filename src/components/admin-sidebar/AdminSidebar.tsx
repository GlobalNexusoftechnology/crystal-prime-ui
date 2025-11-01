"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { IoChevronDown, IoChevronForward, IoClose } from "react-icons/io5";

interface IAdminSidebarProps {
  adminSidebarLinks: IAdminSidebarLink[];
  isVisibleSidebar: boolean;
  setIsVisibleSidebar: (isVisible: boolean) => void;
}

export function AdminSidebar({
  adminSidebarLinks,
  isVisibleSidebar,
  setIsVisibleSidebar,
}: IAdminSidebarProps) {
  const pathName = usePathname();
  const router = useRouter();
  const [expandedLinks, setExpandedLinks] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile (below lg breakpoint)
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint is 1024px in Tailwind
    };

    // Initial check
    checkScreenSize();

    // Add event listener for resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Auto-expand parent links if any child is active
  React.useEffect(() => {
    const newExpandedLinks = new Set<number>();
    adminSidebarLinks.forEach((link, index) => {
      if (Array.isArray(link.links) && link.links.length > 0) {
        const hasActiveChild = link.links.some(
          (child) => pathName === child.path
        );
        if (hasActiveChild) {
          newExpandedLinks.add(index);
        }
      }
    });
    setExpandedLinks(newExpandedLinks);
  }, [pathName, adminSidebarLinks]);

  // Function to handle navigation and close sidebar on mobile
  const handleRedirect = (link: string) => {
    router.push(link);
    // Close sidebar only on mobile devices after navigation
    if (isMobile) {
      setIsVisibleSidebar(true);
    }
  };

  // Function to toggle sublinks visibility
  const toggleSublinks = (index: number) => {
    setExpandedLinks((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Function to handle logo click - close sidebar only on mobile
  const handleLogoClick = () => {
    if (isMobile) {
      setIsVisibleSidebar(true);
    }
  };

  // Function to handle close button click
  const handleCloseSidebar = () => {
    setIsVisibleSidebar(true);
  };

  return (
    <aside
      className={`relative flex flex-col items-center w-full h-full bg-white py-2 overflow-hidden`}
    >
      {/* Header with logo and close button */}
      <div className="flex lg:justify-center justify-between items-center w-full px-4 pb-4 relative">
        {!isVisibleSidebar ? (
          <div className={`w-[13rem]`}>
            <Image
              src={ImageRegistry.websiteLogo}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
        ) : (
          <div className={`w-[5rem]`}>
            <Image
              src={ImageRegistry.websiteLogoIcon}
              alt="website-logo"
              className="w-full h-full cursor-pointer"
              onClick={handleLogoClick}
            />
          </div>
        )}

        {/* Close Button - Only show on mobile devices (below lg) when sidebar is expanded */}
        {!isVisibleSidebar && isMobile && (
          <button
            onClick={handleCloseSidebar}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <ul className="w-full h-full flex flex-col justify-between gap-4 overflow-scroll">
        <div className="flex flex-col">
          {adminSidebarLinks.length > 0 &&
            adminSidebarLinks.map((link, index) => {
              const isActive = pathName === link.path;
              const hasSublinks =
                Array.isArray(link.links) && link.links.length > 0;
              const isExpanded = expandedLinks.has(index);

              return (
                <React.Fragment key={index}>
                  <li className="flex items-center relative group border-b px-4 py-2">
                    {isActive ? (
                      <div className="absolute left-0 w-[4px] rounded-full h-[80%] bg-primary"></div>
                    ) : null}
                    <div className="flex items-center w-full">
                      <button
                        onClick={() => handleRedirect(link.path)}
                        className={`flex items-center gap-3 px-4 py-3 transition flex-1 text-left ${
                          isActive ? "text-primary" : null
                        }`}
                      >
                        <span className="w-8 h-8">
                          {isActive ? link.activeIcon : link.icon}
                        </span>
                        <span
                          className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                            isActive
                              ? "text-primary font-medium"
                              : "text-gray-600"
                          } text-base`}
                        >
                          {link.name}
                        </span>
                      </button>
                      {hasSublinks && !isVisibleSidebar && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSublinks(index);
                          }}
                          className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          {isExpanded ? (
                            <IoChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <IoChevronForward className="w-4 h-4 text-gray-600" />
                          )}
                        </button>
                      )}
                    </div>
                  </li>
                  {/* Render child links if present and expanded */}
                  {Array.isArray(link.links) &&
                    link.links.length > 0 &&
                    !isVisibleSidebar && (
                      <ul
                        className={`flex flex-col gap-2 transition-all duration-300 ease-in-out overflow-hidden ${
                          isExpanded
                            ? "max-h-96 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        {link.links.length > 0 &&
                          link.links.map((child, childIdx) => {
                            const isChildActive = pathName === child.path;
                            return (
                              <li
                                key={childIdx}
                                className="flex items-center pl-10 py-2 border-b relative group"
                              >
                                {isChildActive ? (
                                  <div className="absolute left-0 w-[4px] rounded-full h-[80%] bg-primary"></div>
                                ) : null}
                                <button
                                  onClick={() => handleRedirect(child.path)}
                                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition w-full text-left ${
                                    isChildActive ? "text-primary" : null
                                  }`}
                                >
                                  <span className="w-6 h-6">
                                    {isChildActive
                                      ? child.activeIcon
                                      : child.icon}
                                  </span>
                                  <span
                                    className={`${
                                      isChildActive
                                        ? "text-primary font-medium"
                                        : "text-gray-600"
                                    } text-sm`}
                                  >
                                    {child.name}
                                  </span>
                                </button>
                              </li>
                            );
                          })}
                      </ul>
                    )}
                </React.Fragment>
              );
            })}
        </div>
      </ul>
    </aside>
  );
}
