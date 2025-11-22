import { ReactNode } from "react";

import {
  DashboardIcon,
  LeadManagementIcon,
  ProjectManagementIcon,
  ReportIcon,
  SettingsIcon,
  StaffManagementIcon,
} from "@/features";
import { MaterialIcon } from "@/features/icons/MaterialIcon";
import { LuTicket } from "react-icons/lu";
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
  permission?: TSidebarPermission;
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
    activeIcon: <DashboardIcon color="#221F21" />,
    permission: { module: "DASHBOARD", actions: "VIEW" },
  },
  {
    path: "/admin/lead-management",
    name: "Leads",
    icon: <LeadManagementIcon />,
    activeIcon: <LeadManagementIcon color="#221F21" />,
    permission: { module: "LEAD_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/project-management",
    name: "Projects",
    icon: <ProjectManagementIcon />,
    activeIcon: <ProjectManagementIcon color="#221F21" />,
    permission: { module: "PROJECT_MANAGEMENT", actions: "VIEW" },
  },
  {
    path: "/admin/material-management",
    name: "Inventory",
    icon: <MaterialIcon />,
    activeIcon: <MaterialIcon color="#221F21" />,
    // permission: { module: "MATERIAL_MANAGEMENT", actions: "VIEW" },
    permission: { module: "PROJECT_MANAGEMENT", actions: "VIEW" },

    links: [
      {
        path: "/admin/material-management/proposal",
        name: "Proposal",
        // permission: { module: "PROPOSAL", actions: "VIEW" },
        permission: { module: "PROJECT_MANAGEMENT", actions: "VIEW" },
        icon: <ProjectManagementIcon />,
        activeIcon: <ProjectManagementIcon color="#221F21" />,
      },
    ],
  },
  // {
  //   path: "/admin/my-projects",
  //   name: "My Projects",
  //   icon: <ProjectManagementIcon />,
  //   activeIcon: <ProjectManagementIcon color="#221F21" />,
  //   permission: { module: "MY_PROJECTS", actions: "VIEW" },
  // },
  {
    path: "/admin/staff-management",
    name: "Staffs",
    icon: <StaffManagementIcon />,
    activeIcon: <StaffManagementIcon color="#221F21" />,
    permission: { module: "STAFF_MANAGEMENT", actions: "VIEW" },
  },
  {
    //That will show to Staff
    path: "/admin/leave/apply-leave",
    name: "Leave",
    icon: <StaffManagementIcon />,
    activeIcon: <StaffManagementIcon color="#221F21" />,
    permission: { module: "LEAVE", actions: "VIEW" },
    links: [
      {
        path: "/admin/leave/apply-leave",
        name: "Apply Leave",
        icon: <TbReportAnalytics className="w-full h-full" />,
        activeIcon: (
          <TbReportAnalytics className="w-full h-full" color="#221F21" />
        ),
        permission: { module: "APPLY_LEAVE", actions: "VIEW" },
      },
      {
        path: "/admin/leave/holidays",
        name: "Holidays",
        icon: <TbReportAnalytics className="w-full h-full" />,
        activeIcon: (
          <TbReportAnalytics className="w-full h-full" color="#221F21" />
        ),
        permission: { module: "HOLIDAYS", actions: "VIEW" },
      },
    ],
  },
  // {
  //   path: "/admin/client-management",
  //   name: "Clients",
  //   icon: <UserListRoundedIcon />,
  //   activeIcon: <UserListRoundedIcon color="#221F21" />,
  //   permission: { module: "CLIENT_MANAGEMENT", actions: "VIEW" },
  // },
  // {
  //   path: "/admin/ei-log-management",
  //   name: "EI Logs",
  //   icon: <EILogIcon />,
  //   activeIcon: <EILogIcon color="#221F21" />,
  //   permission: { module: "EI_LOG_MANAGEMENT", actions: "VIEW" },
  // },
  {
    name: "Reports",
    path: "/admin/reports",
    icon: <ReportIcon />,
    activeIcon: <ReportIcon color="#221F21" />,
    permission: { module: "REPORTS", actions: "VIEW" },
    links: [
      {
        path: "/admin/reports/public-business-report",
        name: "Public Business",
        icon: <TbReportAnalytics className="w-full h-full" />,
        activeIcon: (
          <TbReportAnalytics className="w-full h-full" color="#221F21" />
        ),
        permission: { module: "PUBLIC_BUSINESS_DASHBOARD", actions: "VIEW" },
      },
    ],
  },
  {
    path: "/admin/support-tickets",
    name: "Support Tickets",
    icon: <LuTicket className="w-full h-full" />,
    activeIcon: <LuTicket className="w-full h-full" color="#221F21" />,
    permission: { module: "SUPPORT_TICKETS", actions: "VIEW" },
  },
  // {
  //   path: "/admin/hr-management/holidays-list",
  //   name: "HR",
  //   icon: <FaUsersGear className="w-full h-full" />,
  //   activeIcon: <FaUsersGear className="w-full h-full" color="#221F21" />,
  //   permission: { module: "HR_MANAGEMENET", actions: "VIEW" },
  //   links: [
  //     {
  //       path: "/admin/hr-management/holidays-list",
  //       name: "Holiday List",
  //       icon: <TbReportAnalytics className="w-full h-full" />,
  //       activeIcon: (
  //         <TbReportAnalytics className="w-full h-full" color="#221F21" />
  //       ),
  //       permission: { module: "HOLIDAY_LIST", actions: "VIEW" },
  //     },
  //     {
  //       path: "/admin/hr-management/attendance",
  //       name: "Attendance",
  //       icon: <TbReportAnalytics className="w-full h-full" />,
  //       activeIcon: (
  //         <TbReportAnalytics className="w-full h-full" color="#221F21" />
  //       ),
  //       permission: { module: "ATTENDANCE", actions: "VIEW" },
  //     },
  //       {
  //       path: "/admin/hr-management/leaves",
  //       name: "Leaves",
  //       icon: <TbReportAnalytics className="w-full h-full" />,
  //       activeIcon: (
  //         <TbReportAnalytics className="w-full h-full" color="#221F21" />
  //       ),
  //       permission: { module: "LEAVES", actions: "VIEW" },
  //     },
  //   ],
  // },
  {
    path: "/admin/settings",
    name: "Settings",
    icon: <SettingsIcon />,
    activeIcon: <SettingsIcon color="#221F21" />,
    permission: { module: "SETTINGS", actions: "VIEW" },
  },
];
