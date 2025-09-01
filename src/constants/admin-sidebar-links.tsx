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
import { TbReportAnalytics } from "react-icons/tb";

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
  /**
   * Optional nested links for sub-navigation.
   */
  links?: IAdminSidebarLink[];
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
    name: "Lead",
    icon: <LeadManagementIcon />,
    activeIcon: <LeadManagementIcon color="#034A9F" />,
    permission: { module: "LEAD_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/project-management",
    name: "Project",
    icon: <ProjectManagementIcon />,
    activeIcon: <ProjectManagementIcon color="#034A9F" />,
    permission: { module: "PROJECT_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/my-projects",
    name: "My Projects",
    icon: <ProjectManagementIcon />,
    activeIcon: <ProjectManagementIcon color="#034A9F" />,
    permission: { module: "MY_PROJECTS", actions: "VIEW" },
  },
  {
    path: "/admin/staff-management",
    name: "Staff",
    icon: <StaffManagementIcon />,
    activeIcon: <StaffManagementIcon color="#034A9F" />,
    permission: { module: "STAFF_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/client-management",
    name: "Client",
    icon: <UserListRoundedIcon />,
    activeIcon: <UserListRoundedIcon color="#034A9F" />,
    permission: { module: "CLIENT_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/ei-log-management",
    name: "EI Log",
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
    links: [
      {
        path: "/admin/reports/public-business-report",
        name: "Public Business",
        icon: <TbReportAnalytics className="w-full h-full" />,
        activeIcon: <TbReportAnalytics className="w-full h-full" color="#034A9F" />,
        permission: { module: "PUBLIC_BUSINESS_DASHBOARD", actions: "VIEW" },
      },
    ],
  },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon color="#034A9F" />,
    permission: { module: "SETTINGS", actions: "VIEW" },
  },
];
