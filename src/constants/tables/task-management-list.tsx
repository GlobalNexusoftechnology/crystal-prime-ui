export interface DetailedTask {
  id: string;
  type: "detailed";
  taskName: string;
  priority: "High" | "Medium" | "Low";
  endDate: string;
  assigneeInitials: string;
  assigneeName: string;
  color: string;
}

export interface SummaryTask {
  id: string;
  type: "summary";
  taskName: string;
  leadName: string;
  renewalDate: string;
  color: string;
  priority: "High" | "Medium" | "Low";
}

export type Task = DetailedTask | SummaryTask;

export interface TaskSection {
  id: string;
  title: string;
  tasks: Task[];
}

export const TaskManagementList: TaskSection[] = [
  {
    id: "open",
    title: "Open Tasks",
    tasks: [
      {
        id: "open-1",
        type: "detailed",
        taskName: "E-Commerce App Development",
        priority: "High",
        endDate: "20/02/2022",
        assigneeInitials: "AJ",
        assigneeName: "Me",
        color: "#BAD8FD",
      },
      {
        id: "open-2",
        type: "summary",
        taskName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
        priority: "Medium",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress Tasks",
    tasks: [
      {
        id: "progress-1",
        type: "detailed",
        taskName: "E-Commerce App Development",
        priority: "High",
        endDate: "20/02/2022",
        assigneeInitials: "RM",
        assigneeName: "Raj",
        color: "#FFB866",
      },
      {
        id: "progress-2",
        type: "summary",
        taskName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
        priority: "Low",
      },
    ],
  },
  {
    id: "final",
    title: "Final Tasks",
    tasks: [
      {
        id: "final-1",
        type: "detailed",
        taskName: "E-Commerce App Development",
        priority: "Low",
        endDate: "20/02/2022",
        assigneeInitials: "AJ",
        assigneeName: "Me",
        color: "#7BE5A1",
      },
      {
        id: "final-2",
        type: "summary",
        taskName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
        priority: "High",
      },
    ],
  },
];
