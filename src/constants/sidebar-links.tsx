import { HeartIcon, UserIcon } from "@/features";
import { ReactNode } from "react";

export interface SidebarLink {
  path: string;
  name: string;
  blueIcon: ReactNode;
  blackIcon: ReactNode;
}

export interface ISidebarLayoutProps {
  children: React.ReactNode;
  sidebarLinks: SidebarLink[];
}

export const sidebarLinks = [
  {
    path: "/admin/account",
    name: "Account",
    blueIcon: <UserIcon stroke="#0000"/>,
    blackIcon: <UserIcon stroke="#0000"/>,
  },
  {
    path: "/admin/order-history",
    name: "Order History",
    blueIcon: <UserIcon />,
    blackIcon: <UserIcon />,
  },
  {
    path: "/admin/wishlist",
    name: "Wishlist",
    blueIcon: <HeartIcon />,
    blackIcon: <HeartIcon />,
  },
  {
    path: "/admin/address",
    name: "Address",
    blueIcon: <UserIcon />,
    blackIcon: <UserIcon />,
  },
  {
    path: "/admin/saved-card",
    name: "Saved Card",
    blueIcon: <UserIcon />,
    blackIcon: <UserIcon />,
  },
  {
    path: "/admin/logout",
    name: "Log-out",
    blueIcon: <UserIcon />,
    blackIcon: <UserIcon />,
  },
];
