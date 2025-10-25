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

  // Check if we're in a support ticket view within a milestone
  const isSupportTicketView = pathname.includes('/tickets/') && segments.length >= 5;

  const breadcrumbItems = segments.map((segment, index) => {
    const href = "/admin/" + segments.slice(0, index + 1).join("/");
    const name = idToName[segment] ||
      decodeURIComponent(segment).replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
    
    // For support ticket view, make last 3 links non-clickable
    let shouldBeClickable = index !== segments.length - 1; // Default: all except last
    if (isSupportTicketView) {
      // Make last 3 items non-clickable (support, tickets, ticket title)
      shouldBeClickable = index < segments.length - 3;
    }
    
    return {
      name,
      href: shouldBeClickable ? href : undefined,
    };
  });

  return (
    <nav className="text-[1rem]  text-gray-500" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2 items-center">
        {breadcrumbItems.length > 0 && breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;

          return (
            <li key={index} className="flex items-center">
              <div className="flex items-center gap-1 text-gray-500">
                <TbFolder className="w-5 h-5  " />
                {item.href ? (
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
                <HiChevronRight className="ml-2 w-5 h-5  " />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
