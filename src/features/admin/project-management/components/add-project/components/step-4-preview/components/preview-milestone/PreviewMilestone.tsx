import React from "react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import { TreeStructureIcon } from "@/features";
import { formatDateToDDMMYYYY, getInitials, getRandomColor } from "@/utils";
import Image from "next/image";

// Add local types for editing
export interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  status: string;
  due_date: string;
}

export interface Milestone {
  id: string;
  name: string;
  description: string;
  assigned_to: string;
  status: string;
  start_date: string;
  end_date: string;
  tasks: Task[];
  tickets?: {
    id: string;
    title: string;
    description: string;
    assigned_to: string | null;
    status: string;
    priority: string;
    remark: string;
    image_url?: string;
    created_at?: string;
  }[];
}

interface PreviewMilestoneProps {
  milestone: Milestone;
  users: { id: string; name: string }[];
}

function getUserNameById(
  id: string,
  users: { id: string; name: string }[] = []
): string {
  return users.find((user) => user.id === id)?.name || "Unknown";
}

export function PreviewMilestone({ milestone, users }: PreviewMilestoneProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <React.Fragment>
      <tr className="bg-white rounded-lg shadow">
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw] font-medium flex items-center gap-2 pt-4 2xl:pt-[1vw]">
          <button
            onClick={() => setExpanded(!expanded)}
            className="focus:outline-none"
            title={expanded ? "Collapse" : "Expand"}
            type="button"
          >
            {expanded ? (
              <HiChevronUp className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
            ) : (
              <HiChevronDown className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
            )}
          </button>
          <span className="text-[0.9rem] 2xl:text-[0.9vw]">{milestone.name}</span>
          <span className="flex items-center gap-1 2xl:gap-[0.25vw]">
            <TreeStructureIcon className="w-4 2xl:w-[1vw] h-4 2xl:h-[1vw]" />
            <span className="border-2 border-dotted border-primary rounded-full text-xs 2xl:text-[0.9vw] px-1 2xl:px-[0.25vw] text-primary">
              {milestone?.tasks?.length}
            </span>
          </span>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
          <span className="text-gray-600">
            {milestone.description || "No description"}
          </span>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
          <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
            <p
              className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] rounded-full"
              style={{
                backgroundColor: getRandomColor(
                  getUserNameById(milestone.assigned_to, users)
                ),
              }}
            >
              {getInitials(getUserNameById(milestone.assigned_to, users))}
            </p>
            <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
              {getUserNameById(milestone.assigned_to, users)}
            </p>
          </div>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw]">
          <span className="bg-blue-100 text-blue-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-xs font-semibold 2xl:text-[0.9vw]">
            {milestone.status}
          </span>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw]">
          <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
            <span className="text-[0.9rem] 2xl:text-[0.9vw]">
              {formatDateToDDMMYYYY(milestone.start_date)}
            </span>
          </span>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw]">
          <span className="flex items-center gap-2 2xl:gap-[0.5vw]">
            {formatDateToDDMMYYYY(milestone.end_date)}
          </span>
        </td>
        <td className="px-2 2xl:px-[0.5vw] py-2 2xl:py-[0.5vw]"></td>
      </tr>
      {expanded && milestone.tasks && milestone.tasks.length > 0 && (
        <tr className="bg-gray-50 2xl:bg-gray-100">
          <td colSpan={7} className="p-0 pl-20 2xl:pl-[5vw]">
            <table>
              <thead>
                <tr className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">
                  <th className="px-8 2xl:px-[2vw] py-2 2xl:py-[0.5vw] text-left min-w-[10rem] 2xl:min-w-[10vw]">
                    Task Name
                  </th>
                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[12rem] 2xl:min-w-[12vw]">
                    Description
                  </th>
                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[14rem] 2xl:min-w-[14vw]">
                    Assigned To
                  </th>
                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                    Status
                  </th>
                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                    Due Date
                  </th>
                  <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                </tr>
              </thead>
              <tbody>
                {milestone?.tasks?.map((task) => (
                  <tr key={task.id} className="border-t 2xl:border-t-[0.05vw] border-gray-200">
                    <td className="pl-8 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
                      {task?.title}
                    </td>
                    <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">{task?.description}</td>
                    <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
                      <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                        <p
                          className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                          style={{
                            backgroundColor: getRandomColor(
                              getUserNameById(task?.assigned_to, users)
                            ),
                          }}
                        >
                          {getInitials(
                            getUserNameById(task?.assigned_to, users)
                          )}
                        </p>
                        <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                          {getUserNameById(task?.assigned_to, users)}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 2xl:py-[0.5vw]">
                      <span className="bg-blue-100 text-blue-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-xs font-semibold 2xl:text-[0.9vw]">
                        {task?.status}
                      </span>
                    </td>
                    <td className="py-2 2xl:py-[0.5vw]">
                      <span className="flex items-center gap-2">
                        <span className="text-[0.9rem]">{task?.due_date}</span>
                      </span>
                    </td>
                    <td className="py-2 2xl:py-[0.5vw]"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}

      {/* Tickets Section for Support Milestone */}
      {expanded &&
        milestone.name === "Support" &&
        milestone.tickets &&
        milestone.tickets.length > 0 && (
          <tr className="bg-gray-50 2xl:bg-gray-100">
            <td colSpan={7} className="p-0 pl-20 2xl:pl-[5vw]">
              <table>
                <thead>
                  <tr className="text-gray-500 text-[0.9rem] 2xl:text-[0.9vw]">
                    <th className="px-8 2xl:px-[2vw] py-2 2xl:py-[0.5vw] text-left min-w-[10rem] 2xl:min-w-[10vw]">
                      Ticket Title
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[12rem] 2xl:min-w-[12vw]">
                      Description
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[14rem] 2xl:min-w-[14vw]">
                      Assigned To
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                      Status
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                      Priority
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[12rem] 2xl:min-w-[12vw]">
                      Remark
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[8rem] 2xl:min-w-[8vw]">
                      Image
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw] text-left 2xl:text-[1vw] min-w-[10rem] 2xl:min-w-[10vw]">
                      Created Date
                    </th>
                    <th className="px-2 py-2 2xl:px-[0.5vw] 2xl:py-[0.5vw]"></th>
                  </tr>
                </thead>
                <tbody>
                  {milestone.tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-t border-gray-200">
                      <td className="pl-8 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw] font-medium">
                        {ticket.title}
                      </td>
                      <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
                        {ticket.description}
                      </td>
                      <td className="py-2 2xl:py-[0.5vw] text-[0.9rem] 2xl:text-[0.9vw]">
                        <div className="flex items-center gap-2 2xl:gap-[0.5vw]">
                          {ticket.assigned_to ? (
                            <>
                              <p
                                className="flex items-center justify-center p-2 2xl:p-[0.5vw] w-10 2xl:w-[2.5vw] h-10 2xl:h-[2.5vw] text-white text-[0.9rem] 2xl:text-[0.9vw] rounded-full"
                                style={{
                                  backgroundColor: getRandomColor(
                                    getUserNameById(ticket.assigned_to, users)
                                  ),
                                }}
                              >
                                {getInitials(
                                  getUserNameById(ticket.assigned_to, users)
                                )}
                              </p>
                              <p className="px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] text-[0.9rem] 2xl:text-[0.9vw]">
                                {getUserNameById(ticket.assigned_to, users)}
                              </p>
                            </>
                          ) : (
                            <span className="text-gray-500 2xl:text-[0.9vw]">None</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 2xl:py-[0.5vw]">
                        <span className="bg-blue-100 text-blue-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-xs font-semibold 2xl:text-[0.9vw]">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-2 2xl:py-[0.5vw]">
                        <span className="bg-green-100 text-green-600 px-3 2xl:px-[0.75vw] py-1 2xl:py-[0.25vw] rounded-full text-xs font-semibold 2xl:text-[0.9vw]">
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-2 2xl:py-[0.5vw] text-[0.9rem]">{ticket.remark}</td>
                      <td className="py-2 2xl:py-[0.5vw]">
                        {ticket.image_url ? (
                          <div className="flex justify-center">
                            <Image
                              src={ticket.image_url}
                              alt="Ticket attachment"
                              width={60}
                              height={60}
                              className="w-15 2xl:w-[3vw] h-15 2xl:h-[3vw] object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm 2xl:text-[0.9vw]">
                            No image
                          </span>
                        )}
                      </td>
                      <td className="py-2">
                        <span className="text-[0.9rem]">
                          {ticket.created_at
                            ? formatDateToDDMMYYYY(ticket.created_at)
                            : "N/A"}
                        </span>
                      </td>
                      <td className="py-2"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </td>
          </tr>
        )}
    </React.Fragment>
  );
}
