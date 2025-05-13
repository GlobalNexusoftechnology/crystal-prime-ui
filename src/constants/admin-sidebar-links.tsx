import { UserIcon } from "@/features";
import { ReactNode } from "react";

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
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
  {
    path: "/admin/payment-history",
    name: "Payment History",
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
  {
    path: "/admin/subscription-history",
    name: "Subscription",
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
  {
    path: "/admin/user-management",
    name: "User",
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
  {
    path: "/admin/logout",
    name: "Logout",
    icon: <UserIcon color="#7F7F7F" />,
    activeIcon: <UserIcon />,
  },
];
