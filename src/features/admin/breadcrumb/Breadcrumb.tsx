// components/shared/Breadcrumb.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { HiChevronRight } from "react-icons/hi";
import { TbFolder } from "react-icons/tb";
import Link from "next/link";

export function Breadcrumb({ idToName = {} }: { idToName?: Record<string, string> }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean).slice(1); // Remove the first segment

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const name = idToName[segment] ||
      decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    return {
      name,
      href: index === segments.length - 1 ? undefined : href,
    };
  });

  return (
    <nav className="text-[1rem] 2xl:text-[1vw] text-gray-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 2xl:gap-[0.1vw] items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              <div className="flex items-center gap-1 text-gray-500">
                <TbFolder className="w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:underline capitalize"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="capitalize">
                    {item.name}
                  </span>
                )}
              </div>
              {!isLast && (
                <HiChevronRight className="ml-2 2xl:mx-[0.5vw] w-5 h-5 2xl:w-[1.25vw] 2xl:h-[1.25vw]" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
