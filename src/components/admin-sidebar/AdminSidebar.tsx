"use client";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { IAdminSidebarLink, ImageRegistry } from "@/constants";

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

  // Function to handle navigation
  const handleRedirect = (link: string) => {
    router.push(link);
  };

  return (
    <aside
      className={`relative flex flex-col items-center w-full h-full bg-white py-2  overflow-hidden`}
    >
      <div className="flex justify-center pb-4 ">
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
      <ul className="w-full h-full flex flex-col justify-between gap-4  overflow-scroll">
        <div className="flex flex-col">
          {adminSidebarLinks.length > 0 &&  adminSidebarLinks.map((link, index) => {
            const isActive = pathName === link.path;
            return (
              <React.Fragment key={index}>
                <li className="flex items-center relative group border-b px-4  py-2 ">
                  {isActive ? (
                    <div className="absolute left-0 w-[4px]  rounded-full h-[80%] bg-primary"></div>
                  ) : null}
                  <button
                    onClick={() => handleRedirect(link.path)}
                    className={`flex items-center gap-3  px-4  py-3  transition w-full text-left ${
                      isActive ? "text-primary" : null
                    }`}
                  >
                    <span className="w-8  h-8 ">
                      {isActive ? link.activeIcon : link.icon}
                    </span>
                    <span
                      className={`${isVisibleSidebar ? "hidden" : "flex"} ${
                        isActive ? "text-primary font-medium" : " text-gray-600"
                      } text-base `}
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
                        <li key={childIdx} className="flex items-center pl-10  py-2  border-b relative group">
                          {isChildActive ? (
                            <div className="absolute left-0 w-[4px]  rounded-full h-[80%] bg-primary"></div>
                          ) : null}
                          <button
                            onClick={() => handleRedirect(child.path)}
                            className={`flex items-center gap-3  px-4  py-2  rounded-lg  transition w-full text-left ${
                              isChildActive ? "text-primary" : null
                            }`}
                          >
                            <span className="w-6  h-6 ">
                              {isChildActive ? child.activeIcon : child.icon}
                            </span>
                            <span
                              className={`${isChildActive ? "text-primary font-medium" : " text-gray-600"} text-sm `}
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
