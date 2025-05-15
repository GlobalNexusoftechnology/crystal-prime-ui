import { ReactNode } from "react";

import {
  DashboardIcon,
  LeadManagementIcon,
  ProjectManagementIcon,
  SettingsIcon,
  StaffManagementIcon,
  TaskManagementIcon,
  UserIcon,
} from "@/features";

/**
 * Interface representing a sidebar link in the admin panel.
 */
export interface IAdminSidebarLink {
  /** The navigation path for the sidebar link. */
  path: string;
  /** The display name of the sidebar link. */
  name: string;
  /** The icon displayed when the link is inactive. */
  icon: ReactNode;
  /** The icon displayed when the link is active. */
  activeIcon: ReactNode;
}

/**
 * Props for the Admin Sidebar Layout component.
 */
export interface IAdminSidebarLayoutProps {
  /** The child components rendered within the layout. */
  children: React.ReactNode;
  /** The list of sidebar links for the admin panel. */
  adminSidebarLinks: IAdminSidebarLink[];
}

/**
 * Array containing the sidebar navigation links for the admin panel.
 */
export const adminSidebarLinks: IAdminSidebarLink[] = [
  {
    path: "/admin/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon color="#7F7F7F" />,
    activeIcon: <DashboardIcon />,
  },
  {
    path: "/admin/lead-management",
    name: "Lead Management",
    icon: <LeadManagementIcon color="#7F7F7F" />,
    activeIcon: <LeadManagementIcon />,
  },
  {
    path: "/admin/project-management",
    name: "Project Management",
    icon: <ProjectManagementIcon color="#7F7F7F" />,
    activeIcon: <ProjectManagementIcon />,
  },
  {
    path: "/admin/task-management",
    name: "Task Management",
    icon: <TaskManagementIcon color="#7F7F7F" />,
    activeIcon: <TaskManagementIcon />,
  },
  {
    path: "/admin/staff-management",
    name: "Staff Management",
    icon: <StaffManagementIcon color="#7F7F7F" />,
    activeIcon: <StaffManagementIcon />,
  },
    {
    path: "/admin/profile",
    name: "User Profile",
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon color="#7F7F7F" />,
    activeIcon: <SettingsIcon />,
  },
];
