import { ReactNode } from "react";

import {AnalyticalCardIcon} from "@/features";

/**
 * Interface representing the structure of data used in analytical summary cards.
 */
export interface AnalyticalCardData {
  count: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  customContent?: ReactNode;
}

/**
 * Array of analytical card data used to display summary statistics on the dashboard.
 */
export const analyticalCards: AnalyticalCardData[] = [
  {
    count: "234 Leads",
    title: "Total Leads",
    subtitle: "Overall Reach",
    icon: <AnalyticalCardIcon />,
  },
  {
    count: "12 Projects",
    title: "Active Projects",
    subtitle: "Weekly Active Projects",
    icon: <AnalyticalCardIcon />,
  },
  {
    count: "234 Tasks",
    title: "Completed Tasks",
    subtitle: "Last 7 Days",
    icon: <AnalyticalCardIcon />,
  },
  {
    count: "20 Tasks",
    title: "Tasks Due Today",
    subtitle: "Today’s pending work",
    icon: <AnalyticalCardIcon />,
  },
  {
    count: "20 Leads",
    title: "Follow-Ups Today",
    subtitle: "Today’s pending work",
    icon: <AnalyticalCardIcon />,
  },
];
