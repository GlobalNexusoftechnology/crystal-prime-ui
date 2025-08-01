"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";
import { useAuthStore } from "@/services";
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
            />
          </div>
        )}
      </div>
      <ul className="w-full h-full flex flex-col justify-between gap-4 2xl:gap-[1vw] overflow-scroll">
        <div className="flex flex-col">
          {adminSidebarLinks.length > 0 &&  adminSidebarLinks.map((link, index) => {
            const isActive = pathName === link.path;
            return (
              <React.Fragment key={index}>
                <li className="flex items-center relative group border-b px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw]">
                  {isActive ? (
                    <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
                  ) : null}
                  <button
                    onClick={() => handleRedirect(link.path)}
                    className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-3 2xl:py-[0.8vw] transition w-full text-left ${
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
                {/* Render child links if present */}
                {Array.isArray(link.links) && link.links.length > 0 && !isVisibleSidebar && (
                  <ul className="flex flex-col gap-2">
                    {link.links.length > 0 &&  link.links.map((child, childIdx) => {
                      const isChildActive = pathName === child.path;
                      return (
                        <li key={childIdx} className="flex items-center pl-10 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] border-b relative group">
                          {isChildActive ? (
                            <div className="absolute left-0 w-[4px] 2xl:w-[0.4vw] rounded-full h-[80%] bg-primary"></div>
                          ) : null}
                          <button
                            onClick={() => handleRedirect(child.path)}
                            className={`flex items-center gap-3 2xl:gap-[0.8vw] px-4 2xl:px-[1vw] py-2 2xl:py-[0.5vw] rounded-lg 2xl:rounded-[0.5vw] transition w-full text-left ${
                              isChildActive ? "text-primary" : null
                            }`}
                          >
                            <span className="w-6 2xl:w-[1.5vw] h-6 2xl:h-[1.5vw]">
                              {isChildActive ? child.activeIcon : child.icon}
                            </span>
                            <span
                              className={`${isChildActive ? "text-primary font-medium" : " text-gray-600"} text-sm 2xl:text-[0.9vw]`}
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
