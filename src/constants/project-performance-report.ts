import { ProjectPerformanceReportResponse } from "@/services";

export const defaultBasicProjectInfo = {
  projectType: "",
  projectManager: null,
  estimatedStartDate: null,
  estimatedEndDate: null,
  actualStartDate: null,
  actualEndDate: null,
  assignedTeam: [],
  projectPhase: "",
  currentStatus: "",
};

export const defaultDocumentSummary = { totalFiles: 0, files: [] };

export const defaultFollowUpMatrix = {
  totalFollowUpsLogged: 0,
  followUpsCompleted: 0,
  pendingFollowUps: 0,
  missedOrDelayedFollowUps: 0,
  avgResponseTimeHours: "",
  escalatedItems: 0,
};

export const defaultCostBudgetAnalysis = {
  budget: "",
  estimatedCost: "",
  actualCost: "",
  budgetUtilization: "",
  overrun: "",
};

export const defaultTaskMetrics = {
  totalTasks: 0,
  completedTasks: 0,
  inProgressTasks: 0,
  overdueTasks: 0,
  avgTaskCompletionTime: "",
  taskReassignmentCount: 0,
  topPerformer: undefined,
  chart: [],
};

export const defaultTimelineAnalysis = {
  daysSinceStart: 0,
  plannedDurationDays: 0,
  progressPercent: 0,
  delayRisk: "",
};

export const defaultMilestoneSummary: ProjectPerformanceReportResponse["data"]["milestoneSummary"] =
[];
export const defaultResourceUtilization: ProjectPerformanceReportResponse["data"]["resourceUtilization"] =
[];