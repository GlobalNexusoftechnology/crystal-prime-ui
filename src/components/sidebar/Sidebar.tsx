"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

import { UserIcon } from "@/features";
import { SidebarLink } from "@/constants";

interface SidebarProps {
  sidebarLinks: SidebarLink[];
}

export function Sidebar({ sidebarLinks }: SidebarProps) {
  const pathName = usePathname();
  const route = useRouter();

  const handleRedirect = (link: string) => {
    route.push(link);
  };

  return (
    <aside className="flex flex-col gap-[3vw] w-full">
      <ul className="flex flex-col gap-4 2xl:gap-[2vw] overflow-scroll sidebar-link-container">
        <h1 className="font-semibold text-[1.3rem] 2xl:text-[1.3vw]">Navigation</h1>
        {sidebarLinks?.map((link, index) => {
          const isActive = pathName === link?.path;
          return (
            <li key={index}>
              <button
                onClick={() => handleRedirect(link.path)} 
                className={`w-full flex items-center gap-4 px-4 py-3 2xl:px-[1vw] 2xl:py-[0.8vw] transition ${
                  isActive
                    ? "bg-skyBlue text-black font-semibold"
                    : "text-gray-700"
                }`}
              >
                <div className="w-[1.5rem] 2xl:w-[1.5vw] h-[1.5rem] 2xl:h-[1.5vw]">
                  {isActive ? <UserIcon /> : <UserIcon />}
                </div>
                <span className="text-[1rem] 2xl:text-[1vw]">{link?.name}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
