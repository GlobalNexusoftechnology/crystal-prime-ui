import React from "react";

// Define a type for a single Task
type Task = {
  id: number;
  taskName: string;
  priority: "High" | "Avg" | "Low";
  endDate: string;
  project: string;
  lastUser: string;
};

// Define the shape of the tasks data
type TasksData = {
  openTasks: Task[];
  inProgressTasks: Task[];
  finalTasks: Task[];
};

// Sample data for tasks
const tasksData: TasksData = {
  openTasks: [
    {
      id: 1,
      taskName: "UI/UX App Development",
      priority: "High",
      endDate: "22/01/2022",
      project: "E-Commerce App Development",
      lastUser: "Nikesh Thakre",
    },
  ],
  inProgressTasks: [
    {
      id: 2,
      taskName: "UI/UX App Development",
      priority: "Avg",
      endDate: "20/01/2022",
      project: "E-Commerce App Development",
      lastUser: "Nikesh Thakre",
    },
  ],
  finalTasks: [
    {
      id: 3,
      taskName: "UI/UX App Development",
      priority: "Low",
      endDate: "22/01/2022",
      project: "E-Commerce App Development",
      lastUser: "Nikesh Thakre",
    },
  ],
};

const statusColors: Record<"open" | "inProgress" | "final", string> = {
  open: "bg-blue-400",
  inProgress: "bg-orange-400",
  final: "bg-green-400",
};

const priorityColors: Record<Task["priority"], string> = {
  High: "bg-blue-600",
  Avg: "bg-orange-600",
  Low: "bg-green-600",
};

export  function ProjectManagement() {
  return (
    <div className="flex space-x-6 p-6 bg-gray-100 min-h-screen">
      {/* Open Tasks */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Open Tasks</h2>
          <button className="p-1 rounded hover:bg-gray-200">⋮</button>
        </div>
        {tasksData.openTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-md shadow-sm ${statusColors.open} p-4 mb-4 text-white`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{task.taskName}</h3>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <p>End Date</p>
                <p>{task.endDate}</p>
              </div>
              <div>
                <p>Project Name</p>
                <p>{task.project}</p>
              </div>
              <div>
                <p>Last User</p>
                <p>{task.lastUser}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* In Progress Tasks */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">In Progress Tasks</h2>
          <button className="p-1 rounded hover:bg-gray-200">⋮</button>
        </div>
        {tasksData.inProgressTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-md shadow-sm ${statusColors.inProgress} p-4 mb-4 text-white`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{task.taskName}</h3>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <p>End Date</p>
                <p>{task.endDate}</p>
              </div>
              <div>
                <p>Project Name</p>
                <p>{task.project}</p>
              </div>
              <div>
                <p>Last User</p>
                <p>{task.lastUser}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Final Tasks */}
      <div className="flex-1 bg-white rounded-lg shadow-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700">Final Tasks</h2>
          <button className="p-1 rounded hover:bg-gray-200">⋮</button>
        </div>
        {tasksData.finalTasks.map((task) => (
          <div
            key={task.id}
            className={`rounded-md shadow-sm ${statusColors.final} p-4 mb-4 text-white`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-bold text-lg">{task.taskName}</h3>
              <span
                className={`text-sm font-semibold px-2 py-1 rounded ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <div>
                <p>End Date</p>
                <p>{task.endDate}</p>
              </div>
              <div>
                <p>Project Name</p>
                <p>{task.project}</p>
              </div>
              <div>
                <p>Last User</p>
                <p>{task.lastUser}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
