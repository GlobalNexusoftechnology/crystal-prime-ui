"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";
import { BsBoxArrowLeft } from "react-icons/bs";

interface IAdminSidebarProps {
  adminSidebarLinks: IAdminSidebarLink[];
  SetIsVisibleSidebar: () => void;
}

export function AdminSidebar({
  adminSidebarLinks,
  SetIsVisibleSidebar,
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
    <aside
      className={`relative flex flex-col items-center w-full h-full bg-white py-2 2xl:py-[1vw] overflow-hidden`}
    >
      <div
        className="absolute right-2 top-2 flex xl:hidden"
        onClick={SetIsVisibleSidebar}
      >
        <BsBoxArrowLeft className="w-7 h-7" />
      </div>
      <div className="flex justify-center py-4 2xl:py-[2vw]">
        <div className={`w-[13rem] xl:w-[15vw]`}>
          <Image
            src={ImageRegistry.websiteLogo}
            alt="website-logo"
            className="w-full h-full cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
      <ul className="w-full flex flex-col gap-4 2xl:gap-[1vw] overflow-scroll admin-sidebar-links-container">
        {adminSidebarLinks.map((link, index) => {
          const isActive = pathName === link.path;
          return (
            <li
              key={index}
              className="flex items-center relative group px-4"
            >
              {isActive ? (
                <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
              ) : null}
              <button
                onClick={() => handleRedirect(link.path)}
                className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                  isActive ? "text-primary" : null
                }`}
              >
                <span className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]">
                  {isActive ? link.activeIcon : link.icon}
                </span>
                <span
                  className={`${
                    isActive ? "text-primary font-medium" : " text-gray-600"
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
