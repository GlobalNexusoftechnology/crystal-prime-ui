import { ReactNode } from "react";

import {
  DashboardIcon,
  // FollowUpManagementIcon,
  // DocumentManagementIcon,
  LeadManagementIcon,
  ProjectManagementIcon,
  // ProjectManagementIcon,
  
  SettingsIcon,
  StaffManagementIcon,
  // TaskManagementIcon,
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
    icon: <DashboardIcon />,
    activeIcon: <DashboardIcon color="#034A9F" />,
  },
  {
    path: "/admin/lead-management",
    name: "Lead Management",
    icon: <LeadManagementIcon />,
    activeIcon: <LeadManagementIcon color="#034A9F" />,
  },
  {
    path: "/admin/project-management",
    name: "Project Management",
    icon: <ProjectManagementIcon />,
    activeIcon: <ProjectManagementIcon color="#034A9F" />,
  },
  // {
  //   path: "/admin/task-management",
  //   name: "Task Management",
  //   icon: <TaskManagementIcon />,
  //   activeIcon: <TaskManagementIcon color="#034A9F" />,
  // },

  //   {
  //   path: "/admin/follow-up-management",
  //   name: "Follow Up Management",
  //   icon: <FollowUpManagementIcon/>,
  //   activeIcon: <FollowUpManagementIcon color="#034A9F" />,
  // },
  {
    path: "/admin/staff-management",
    name: "Staff Management",
    icon: <StaffManagementIcon />,
    activeIcon: <StaffManagementIcon color="#034A9F" />,
  },
  //  {
  //   path: "/admin/document-management",
  //   name: "Document Management",
  //   icon: <DocumentManagementIcon />,
  //   activeIcon: <DocumentManagementIcon color="#034A9F" />,
  // },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon color="#034A9F" />,
  },
];
