import React from "react";

interface Task {
  name: string;
  description: string;
  status: string;
  priority: string;
  due: string;
}

interface DailyTaskListProps {
  tasks: Task[];
  statusColors: Record<string, string>;
  priorityColors: Record<string, string>;
}

export const DailyTaskList: React.FC<DailyTaskListProps> = ({
  tasks,
  statusColors,
  priorityColors,
}) => (
  <div className="bg-white rounded-xl p-4 shadow border border-gray-100 mt-6">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium text-gray-700">Daily Task List</span>
      <button className="flex items-center gap-2 text-gray-500 text-sm border px-2 py-1 rounded">
        <span>Filter</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 14.414V19a1 1 0 01-1.447.894l-2-1A1 1 0 019 18v-3.586a1 1 0 00-.293-.707L2.293 6.707A1 1 0 012 6V5a1 1 0 011-1z"
          />
        </svg>
      </button>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-gray-500 border-b">
            <th className="py-2 px-2 text-left">Task Name</th>
            <th className="py-2 px-2 text-left">Description</th>
            <th className="py-2 px-2 text-left">Status</th>
            <th className="py-2 px-2 text-left">Priority</th>
            <th className="py-2 px-2 text-left">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, idx) => (
            <tr key={idx} className="border-b last:border-0">
              <td className="py-2 px-2 font-medium text-gray-900">
                {task.name}
              </td>
              <td className="py-2 px-2 text-primary underline underline-offset-2">
                {task.description}
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    statusColors[task.status]
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="py-2 px-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-2 px-2 text-gray-700 font-medium flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                {task.due}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
