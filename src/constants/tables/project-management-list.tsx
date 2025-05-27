import { ITableAction } from "../table";

export interface DetailedProject {
  id: string;
  type: "detailed" | "summary";
  color: string;
  projectName: string;
  leadName?: string;
  renewalDate?: string;
}

export interface SummaryProject {
  id: string;
  type: "summary";
  projectName: string;
  leadName: string;
  renewalDate: string;
  color: string;
}

export type Project = DetailedProject | SummaryProject;

export interface ProjectSection {
  id: string;
  title: string;
  projects: Project[];
}

export const ProjectManagementList: ProjectSection[] = [
  {
    id: "open",
    title: "Open Projects",
    projects: [
      {
        id: "open-1",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#BAD8FD",
      },
      {
        id: "open-2",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
      },
    ],
  },
  {
    id: "in-progress Project",
    title: "In Progress Projects",
    projects: [
      {
        id: "progress-1",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#FFB866",
      },
      {
        id: "progress-2",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
      },
    ],
  },
  {
    id: "final",
    title: "Final Projects",
    projects: [
      {
        id: "final-1",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#7BE5A1",
      },
      {
        id: "final-2",
        type: "summary",
        projectName: "E-Commerce App Development",
        leadName: "Nisha Sharma",
        renewalDate: "20/02/2022",
        color: "#F8F8F8",
      },
    ],
  },
];

export const action: ITableAction<DetailedProject>[] = [
  {
    label: "Edit",
    onClick: (row) => {
      console.log("Edit clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "View",
    onClick: (row) => {
      console.log("View clicked", row.id);
    },
    className: "text-blue-500",
  },
  {
    label: "Delete",
    onClick: (row) => {
      console.log("Delete clicked", row.id);
    },
    className: "text-red-500",
  },
  {
    label: "Explore As xlsx ",
    onClick: (row) => {
      console.log("Explore As xlsx clicked", row.id);
    },
    className: "text-blue-500 whitespace-nowrap",
  },
];

/**
 * Column definitions for the Follow Up Management table.
 */


