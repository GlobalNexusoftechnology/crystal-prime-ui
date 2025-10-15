export enum EModule {
  DASHBOARD = "DASHBOARD",
  LEAD_MANAGEMENT = "LEAD_MANAGEMENT",
  STAFF_MANAGEMENT = "STAFF_MANAGEMENT",
  PROJECT_MANAGEMENT = "PROJECT_MANAGEMENT",
  LEAD_TYPES = "LEAD_TYPES",
  LEAD_SOURCES = "LEAD_SOURCES",
  LEAD_STATUSES = "LEAD_STATUSES",
  ROLES = "ROLES",
  SETTINGS = "SETTINGS",
  CLIENT_MANAGEMENT = "CLIENT_MANAGEMENT",
  PROJECT_TEMPLATE = "PROJECT_TEMPLATE",
  MILESTONE = "MILESTONE",
  TASK = "TASK",
  EI_LOG_TYPES = "EI_LOG_TYPES",
  EI_LOG_HEADS = "EI_LOG_HEADS",
  EI_LOG_MANAGEMENT = "EI_LOG_MANAGEMENT",
  REPORTS = "REPORTS",
  STAFF_PERFORMANCE_REPORT = "STAFF_PERFORMANCE_REPORT",
  PROJECT_PERFORMANCE_REPORT = "PROJECT_PERFORMANCE_REPORT",
  LEAD_ANALYTICS_REPORT = "LEAD_ANALYTICS_REPORT",
  BUSINESS_ANALYSIS_REPORT = "BUSINESS_ANALYSIS_REPORT",
  PUBLIC_BUSINESS_DASHBOARD = "PUBLIC_BUSINESS_DASHBOARD",
  MY_PROJECTS = "MY_PROJECTS",
  TICKET_MANAGEMENT= "TICKET_MANAGEMENT",
  SUPPORT_TICKETS = "SUPPORT_TICKETS",
  HR_MANAGEMENET = "HR_MANAGEMENET",
  HOLIDAY_LIST = "HOLIDAY_LIST",
  ATTENDANCE = "ATTENDANCE",
  LEAVES = "LEAVES",
  LEAVE = "LEAVE",
  APPLY_LEAVE = "APPLY_LEAVE",
  HOLIDAYS = "HOLIDAYS",
}

export enum EAction {
  VIEW = "VIEW",
  ADD = "ADD",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

export type TOptionItem = {
  key: string;
  label: string;
  value: string;
};

export const MODULES: TOptionItem[] = [
  { key: EModule.DASHBOARD, label: "Dashboard", value: "10" },
  { key: EModule.LEAD_MANAGEMENT, label: "Lead Management Module", value: "11"},
  { key: EModule.PROJECT_MANAGEMENT, label: "Project Management Module", value: "12"},
  { key: EModule.STAFF_MANAGEMENT, label: "Staff Management Module", value: "13"},
  { key: EModule.LEAD_SOURCES, label: "Lead Sources Module", value: "14" },
  { key: EModule.LEAD_STATUSES, label: "Lead Statuses Module", value: "15" },
  { key: EModule.ROLES, label: "Roles Module", value: "16" },
  { key: EModule.SETTINGS, label: "Settings Module", value: "17" },
  { key: EModule.LEAD_TYPES, label: "Lead Types Module", value: "18" },
  { key: EModule.CLIENT_MANAGEMENT, label: "Client Management Module", value: "19" },
  { key: EModule.PROJECT_TEMPLATE, label: "Project Template Module", value: "20" },
  { key: EModule.MILESTONE, label: "Milestone Module", value: "21" },
  { key: EModule.TASK, label: "Task Module", value: "22" },
  { key: EModule.EI_LOG_TYPES, label: "EI Log Types Module", value: "23" },
  { key: EModule.EI_LOG_HEADS, label: "EI Log Heads Module", value: "24" },
  { key: EModule.EI_LOG_MANAGEMENT, label: "EI Log Management Module", value: "25" },
  { key: EModule.REPORTS, label: "Reports", value: "26" },
  { key: EModule.STAFF_PERFORMANCE_REPORT, label: "Staff Performance Report", value: "27" },
  { key: EModule.PROJECT_PERFORMANCE_REPORT, label: "Project Performance Report", value: "28" },
  { key: EModule.LEAD_ANALYTICS_REPORT, label: "Lead Analytics Report", value: "29" },
  { key: EModule.BUSINESS_ANALYSIS_REPORT, label: "Business Analysis Report", value: "30" },
  { key: EModule.PUBLIC_BUSINESS_DASHBOARD, label: "Public Business Dashboard", value: "31" },
  { key: EModule.MY_PROJECTS, label: "My Projects Module", value: "32" },
  { key: EModule.TICKET_MANAGEMENT, label: "Ticket Management Module", value: "33" },
  { key: EModule.SUPPORT_TICKETS, label: "Support Tickets Module", value: "34" },
  { key: EModule.HR_MANAGEMENET, label: "HR Management Module", value: "35" },
  { key: EModule.HOLIDAY_LIST, label: "Holiday List Module", value: "36" },
  { key: EModule.ATTENDANCE, label: "Attendance Module", value: "37" },
  { key: EModule.LEAVES, label: "Leaves Module", value: "38" },
  { key: EModule.LEAVE, label: "Leave Module", value: "39" },
  { key: EModule.APPLY_LEAVE, label: "Apply Leave Module", value: "40" },
  { key: EModule.HOLIDAYS, label: "Holidays Module", value: "41" },
];

export const ACTIONS: TOptionItem[] = [
  { key: EAction.VIEW, label: "Read", value: "1" },
  { key: EAction.ADD, label: "Add", value: "2" },
  { key: EAction.EDIT, label: "Edit", value: "3" },
  { key: EAction.DELETE, label: "Delete", value: "4" },
];

// Add documentation for report permissions
// Permission keys for reports:
// - VIEW_STAFF_PERFORMANCE_REPORT
// - VIEW_PROJECT_PERFORMANCE_REPORT
// - VIEW_LEAD_ANALYTICS_REPORT
// - VIEW_BUSINESS_ANALYSIS_REPORT
// - VIEW_PUBLIC_BUSINESS_DASHBOARD

// ACTIONS array remains the same, as VIEW is already present
// If you want to add custom actions for reports, you can do so here
// For now, the VIEW action is used for all report modules
