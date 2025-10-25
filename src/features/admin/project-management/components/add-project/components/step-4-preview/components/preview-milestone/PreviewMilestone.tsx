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
        <td className="px-2  py-2  font-medium flex items-center gap-2 pt-4 ">
          <button
            onClick={() => setExpanded(!expanded)}
            className="focus:outline-none"
            title={expanded ? "Collapse" : "Expand"}
            type="button"
          >
            {expanded ? (
              <HiChevronUp className="w-4  h-4 " />
            ) : (
              <HiChevronDown className="w-4  h-4 " />
            )}
          </button>
          <span className="text-[0.9rem] ">{milestone.name}</span>
          <span className="flex items-center gap-1 ">
            <TreeStructureIcon className="w-4  h-4 " />
            <span className="border-2 border-dotted border-primary rounded-full text-xs  px-1  text-primary">
              {milestone?.tasks?.length}
            </span>
          </span>
        </td>
        <td className="px-2  py-2  text-[0.9rem] ">
          <span className="text-gray-600">
            {milestone.description || "No description"}
          </span>
        </td>
        <td className="px-2  py-2  text-[0.9rem] ">
          <div className="flex items-center gap-2 ">
            <p
              className="flex items-center justify-center p-2  w-10  h-10  text-white text-[0.9rem] rounded-full"
              style={{
                backgroundColor: getRandomColor(
                  getUserNameById(milestone.assigned_to, users)
                ),
              }}
            >
              {getInitials(getUserNameById(milestone.assigned_to, users))}
            </p>
            <p className="px-3  py-1  text-[0.9rem] ">
              {getUserNameById(milestone.assigned_to, users)}
            </p>
          </div>
        </td>
        <td className="px-2  py-2 ">
          <span className="bg-blue-100 text-blue-600 px-3  py-1  rounded-full text-xs font-semibold ">
            {milestone.status}
          </span>
        </td>
        <td className="px-2  py-2 ">
          <span className="flex items-center gap-2 ">
            <span className="text-[0.9rem] ">
              {formatDateToDDMMYYYY(milestone.start_date)}
            </span>
          </span>
        </td>
        <td className="px-2  py-2 ">
          <span className="flex items-center gap-2 ">
            {formatDateToDDMMYYYY(milestone.end_date)}
          </span>
        </td>
        <td className="px-2  py-2 "></td>
      </tr>
      {expanded && milestone.tasks && milestone.tasks.length > 0 && (
        <tr className="bg-gray-50 ">
          <td colSpan={7} className="p-0 pl-20 ">
            <table>
              <thead>
                <tr className="text-gray-500 text-[0.9rem] ">
                  <th className="px-8  py-2  text-left min-w-[10rem] ">
                    Task Name
                  </th>
                  <th className="px-2 py-2   text-left  min-w-[12rem] ">
                    Description
                  </th>
                  <th className="px-2 py-2   text-left  min-w-[14rem] ">
                    Assigned To
                  </th>
                  <th className="px-2 py-2   text-left  min-w-[10rem] ">
                    Status
                  </th>
                  <th className="px-2 py-2   text-left  min-w-[10rem] ">
                    Due Date
                  </th>
                  <th className="px-2 py-2  "></th>
                </tr>
              </thead>
              <tbody>
                {milestone?.tasks?.map((task) => (
                  <tr key={task.id} className="border-t border-gray-200">
                    <td className="pl-8  py-2  text-[0.9rem]  font-medium">
                      {task?.title}
                    </td>
                    <td className="py-2  text-[0.9rem] ">{task?.description}</td>
                    <td className="py-2  text-[0.9rem] ">
                      <div className="flex items-center gap-2 ">
                        <p
                          className="flex items-center justify-center p-2  w-10  h-10  text-white text-[0.9rem]  rounded-full"
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
                        <p className="px-3  py-1  text-[0.9rem] ">
                          {getUserNameById(task?.assigned_to, users)}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 ">
                      <span className="bg-blue-100 text-blue-600 px-3  py-1  rounded-full text-xs font-semibold ">
                        {task?.status}
                      </span>
                    </td>
                    <td className="py-2 ">
                      <span className="flex items-center gap-2">
                        <span className="text-[0.9rem]">{task?.due_date}</span>
                      </span>
                    </td>
                    <td className="py-2 "></td>
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
          <tr className="bg-gray-50 ">
            <td colSpan={7} className="p-0 pl-20 ">
              <table>
                <thead>
                  <tr className="text-gray-500 text-[0.9rem] ">
                    <th className="px-8  py-2  text-left min-w-[10rem] ">
                      Ticket Title
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[12rem] ">
                      Description
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[14rem] ">
                      Assigned To
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[10rem] ">
                      Status
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[10rem] ">
                      Priority
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[12rem] ">
                      Remark
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[8rem] ">
                      Image
                    </th>
                    <th className="px-2 py-2   text-left  min-w-[10rem] ">
                      Created Date
                    </th>
                    <th className="px-2 py-2  "></th>
                  </tr>
                </thead>
                <tbody>
                  {milestone.tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-t border-gray-200">
                      <td className="pl-8  py-2  text-[0.9rem]  font-medium">
                        {ticket.title}
                      </td>
                      <td className="py-2  text-[0.9rem] ">
                        {ticket.description}
                      </td>
                      <td className="py-2  text-[0.9rem] ">
                        <div className="flex items-center gap-2 ">
                          {ticket.assigned_to ? (
                            <>
                              <p
                                className="flex items-center justify-center p-2  w-10  h-10  text-white text-[0.9rem]  rounded-full"
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
                              <p className="px-3  py-1  text-[0.9rem] ">
                                {getUserNameById(ticket.assigned_to, users)}
                              </p>
                            </>
                          ) : (
                            <span className="text-gray-500 ">None</span>
                          )}
                        </div>
                      </td>
                      <td className="py-2 ">
                        <span className="bg-blue-100 text-blue-600 px-3  py-1  rounded-full text-xs font-semibold ">
                          {ticket.status}
                        </span>
                      </td>
                      <td className="py-2 ">
                        <span className="bg-green-100 text-green-600 px-3  py-1  rounded-full text-xs font-semibold ">
                          {ticket.priority}
                        </span>
                      </td>
                      <td className="py-2  text-[0.9rem]">{ticket.remark}</td>
                      <td className="py-2 ">
                        {ticket.image_url ? (
                          <div className="flex justify-center">
                            <Image
                              src={ticket.image_url}
                              alt="Ticket attachment"
                              width={60}
                              height={60}
                              className="w-15  h-15  object-cover rounded border cursor-pointer hover:opacity-80 transition-opacity"
                            />
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm ">
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
