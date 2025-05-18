"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";

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
    <aside className="flex flex-col items-center w-full h-full bg-white p-2 2xl:p-[1vw] overflow-hidden">
      <div className="flex justify-center pb-4 2xl:pb-[2vw]">
        <div
          className={`w-[13rem] xl:w-[15vw] ${
            isVisibleSidebar ? "hidden" : "flex"
          }`}
        >
          <Image
            src={ImageRegistry.websiteLogo}
            alt="website-logo"
            className="w-full h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
        <div
          className={`w-12 2xl:w-[3.5vw] ${
            isVisibleSidebar ? "flex" : "hidden"
          }`}
        >
          <Image
            src={ImageRegistry.websiteLogo}
            alt="website-logo"
            className="w-full h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
      </div>

      <ul className="flex flex-col gap-4 2xl:gap-[1vw] overflow-scroll admin-sidebar-links-container">
        {adminSidebarLinks.map((link, index) => {
          const isActive = pathName === link.path;
          return (
            <li key={index} className="relative group">
              <button
                onClick={() => handleRedirect(link.path)}
                className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                  isActive
                    ? "bg-primary text-white"
                    : null
                }`}
              >
                <span className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]">
                  {isActive ? link.activeIcon : link.icon}
                </span>
                <span
                  className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                    isActive ? "text-white font-medium" : " text-gray-600"
                  } text-base 2xl:text-[1vw]`}
                >
                  {link.name}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
