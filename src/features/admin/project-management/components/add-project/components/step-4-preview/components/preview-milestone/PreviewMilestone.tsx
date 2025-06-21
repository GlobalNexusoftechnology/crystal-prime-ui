import React from "react";
import { HiChevronDown, HiChevronUp, HiOutlineCalendar } from "react-icons/hi2";
import { TreeStructureIcon } from "@/features";
import { getInitials, getRandomColor } from "@/utils";

interface Task {
  id: number;
  name: string;
  description: string;
  assignedTo: string;
  status: string;
  dueDate: string;
}

interface Milestone {
  id: number;
  name: string;
  assignedTo: string;
  status: string;
  estimatedStart: string;
  estimatedEnd: string;
  tasks: Task[];
}

interface PreviewMilestoneProps {
  milestone: Milestone;
}

export function PreviewMilestone({ milestone }: PreviewMilestoneProps) {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <React.Fragment>
      <tr className="bg-white rounded-lg shadow">
        <td className="px-2 py-2 font-medium flex items-center gap-2">
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="focus:outline-none" 
            title={expanded ? "Collapse" : "Expand"} 
            type="button"
          >
            {expanded ? <HiChevronUp className="w-4 h-4" /> : <HiChevronDown className="w-4 h-4" />}
          </button>
          <span className="text-sm">{milestone.name}</span>
          <span className="flex items-center gap-1">
            <TreeStructureIcon className="w-4 h-4" />
            <span className="border-2 border-dotted border-primary rounded-full text-xs px-1 text-primary">
              {milestone.tasks.length}
            </span>
          </span>
        </td>
        <td className="px-2 py-2 text-sm">
          <div className="flex items-center gap-2">
            <p 
              className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full" 
              style={{ backgroundColor: getRandomColor(milestone.assignedTo) }}
            >
              {getInitials(milestone.assignedTo)}
            </p>
            <p className="px-3 py-1 text-[0.9rem]">{milestone.assignedTo}</p>
          </div>
        </td>
        <td className="px-2 py-2">
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
            {milestone.status}
          </span>
        </td>
        <td className="px-2 py-2">
          <span className="flex items-center gap-2">
            <HiOutlineCalendar className="w-6 h-6 text-gray-400" />
            <span className="text-sm">{milestone.estimatedStart}</span>
          </span>
        </td>
        <td className="px-2 py-2">
          <span className="flex items-center gap-2">
            <HiOutlineCalendar className="w-6 h-6 text-gray-400" />
            {milestone.estimatedEnd}
          </span>
        </td>
        <td className="px-2 py-2"></td>
      </tr>
      {expanded && (
        <tr className="bg-gray-50 2xl:bg-gray-100">
          <td colSpan={6} className="p-0">
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 text-sm 2xl:text-[0.9vw]">
                  <th className="pl-8 2xl:pl-[2vw] py-2 2xl:py-[0.5vw] text-left">Task Name</th>
                  <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Description</th>
                  <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Assigned To</th>
                  <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Status</th>
                  <th className="py-2 2xl:py-[0.5vw] text-left 2xl:text-[1vw]">Due Date</th>
                  <th className="py-2 2xl:py-[0.5vw]"></th>
                </tr>
              </thead>
              <tbody>
                {milestone.tasks.map((task) => (
                  <tr key={task.id} className="border-t border-gray-200">
                    <td className="pl-8 py-2 text-sm font-medium">{task.name}</td>
                    <td className="py-2 text-sm">{task.description}</td>
                    <td className="py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <p 
                          className="flex items-center justify-center p-2 w-10 h-10 text-white text-[0.9rem] rounded-full" 
                          style={{ backgroundColor: getRandomColor(task.assignedTo) }}
                        >
                          {getInitials(task.assignedTo)}
                        </p>
                        <p className="px-3 py-1 text-[0.9rem]">{task.assignedTo}</p>
                      </div>
                    </td>
                    <td className="py-2">
                      <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                        {task.status}
                      </span>
                    </td>
                    <td className="py-2">
                      <span className="flex items-center gap-2">
                        <HiOutlineCalendar className="w-6 h-6 text-gray-400" />
                        <span className="text-sm">{task.dueDate}</span>
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