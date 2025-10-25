"use client";

import StatusDropdown from "@/components/status-dropdown/StatusDropdown";
import { usePathname } from "next/navigation";

type HeaderDetailsProps = {
  title: string;
  status: string;
  progress: string; // e.g., "6 / 10"
  statusBgColor?: string;
  progressBgColor?: string;
  onStatusChange?: (status: string) => void;
};

/**
 * Reusable header details component for project info.
 */
export function HeaderDetails({
  title,
  status,
  progress,
  statusBgColor = "bg-skyBlue",
  progressBgColor = "bg-darkGreen",
  onStatusChange,
}: HeaderDetailsProps) {
  const pathname = usePathname();
  const isTaskView = /^\/admin\/project-management\/[^/]+\/[^/]+\/[^/]+$/.test(
    pathname
  );
  const isTicketView = /^\/admin\/project-management\/[^/]+\/[^/]+\/tickets\/[^/]+$/.test(
    pathname
  );

  return (
    <div className="flex flex-wrap items-center gap-4 ">
      <div>
        <h2 className="text-[1.5rem]  font-medium">{title}</h2>
      </div>
      <div className="flex flex-wrap items-center gap-4 ">
        {isTaskView || isTicketView ? (
          <StatusDropdown
            options={
              isTicketView
                ? [
                    { label: "Open", value: "open" },
                    { label: "In Progress", value: "in_progress" },
                    { label: "Completed", value: "completed" },
                    { label: "Closed", value: "closed" },
                  ]
                : [
                    { label: "Open", value: "Open" },
                    { label: "In Progress", value: "In Progress" },
                    { label: "Completed", value: "Completed" },
                    { label: "Approval", value: "Approval" },
                  ]
            }
            value={status}
            onChange={onStatusChange || (() => {})}
          />
        ) : (
          <span
            className={`px-4 py-2   ${statusBgColor} rounded-xl  `}
          >
            {status}
          </span>
        )}
        <span
          className={`px-4 py-2   ${progressBgColor} rounded-xl  `}
        >
          {progress}
        </span>
      </div>
    </div>
  );
}
