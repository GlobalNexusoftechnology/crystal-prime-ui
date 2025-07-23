import { ReactNode } from "react";

import {
  DashboardIcon,
  EILogIcon,
  LeadManagementIcon,
  ProjectManagementIcon,
  ReportIcon,
  SettingsIcon,
  StaffManagementIcon,
  UserListRoundedIcon,
} from "@/features";

type TSidebarPermission = {
  module: string;
  actions: string;
};

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
  /**
   * Permission mapping for the sidebar link.
   */
  permission: TSidebarPermission;
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
    permission: { module: "DASHBOARD", actions: "VIEW" },
  },
  {
    path: "/admin/lead-management",
    name: "Lead Management",
    icon: <LeadManagementIcon />,
    activeIcon: <LeadManagementIcon color="#034A9F" />,
    permission: { module: "LEAD_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/project-management",
    name: "Project Management",
    icon: <ProjectManagementIcon />,
    activeIcon: <ProjectManagementIcon color="#034A9F" />,
    permission: { module: "PROJECT_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/staff-management",
    name: "Staff Management",
    icon: <StaffManagementIcon />,
    activeIcon: <StaffManagementIcon color="#034A9F" />,
    permission: { module: "STAFF_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/client-management",
    name: "Client Management",
    icon: <UserListRoundedIcon />,
    activeIcon: <UserListRoundedIcon color="#034A9F" />,
    permission: { module: "CLIENT_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/ei-log-management",
    name: "EI Log Management",
    icon: <EILogIcon />,
    activeIcon: <EILogIcon color="#034A9F" />,
    permission: { module: "EI_LOG_MANAGEMENT", actions: "VIEW" },
  },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: <ReportIcon />,
    activeIcon: <ReportIcon color="#034A9F" />,
    permission: { module: "REPORTS", actions: "VIEW" },
  },
  {
    path: "/admin/public-business-report",
    name: "Public Business Report",
    icon: <EILogIcon />,
    activeIcon: <EILogIcon color="#034A9F" />,
    permission: { module: "PUBLIC_BUSINESS_DASHBOARD", actions: "VIEW" },
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon color="#034A9F" />,
    permission: { module: "SETTINGS", actions: "VIEW" },
  },
];
