interface ILoginWithEmailAndPasswordUrlOptions {
  tenantName: string;
  policyName: string;
}
// TODO: replace with our own urls.
/**
 * Endpoint to be consumed by the user to login with their email and password
 * using the Azure B2C service.
 */
export const getLoginWithEmailAndPasswordToAzureB2CUrl = ({
  tenantName,
  policyName,
}: ILoginWithEmailAndPasswordUrlOptions) =>
  `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/oauth2/v2.0/token?p=${policyName}`;

//auth APIs url
export const registerUrl = () => "/auth/register";

export const loginUrl = () => "/auth/login";

export const verifyEmailUrl = () => "/auth/verify-email";

export const sentOtpUrl = () => "/auth/sentOTP";

export const resetPasswordUrl = () => "/auth/resetPassword";

export const changePasswordUrl = () => "/users/change-password";

// leads APIs url
export const createLeadUrl = () => "/leads";

export const createRoleUrl = () => "/roles";

export const fetchAllLeadsListUrl = () => "/leads";

export const getLeadDetailByIdUrl = (id: string) => `/leads/${id}`;

export const deleteLeadUrl = (id: string) => `/leads/${id}`;

export const deleteRoleUrl = (id: string) => `/roles/${id}`;

export const updateLeadUrl = (id: string) => `/leads/${id}`;

export const updateRoleUrl = (id: string) => `/roles/${id}`;

// download excel
export const getLeadDownloadExcelByIdUrl = (id: string) => `/lead-download-excel/${id}`;

export const fetchAllLeadDownloadExcelUrl = () => "/leads/export/excel";

export const fetchLeadDownloadTemplateExcelUrl = () => "/leads/template/download";

export const fetchAllUserDownloadExcelUrl = () => "/users/export";

//lead followup
export const createLeadFollowUpUrl = () => "/lead-followup";

export const fetchAllLeadFollowUpUrl = (leadId?: string) => `/lead-followup?leadId=${leadId}`;

export const getLeadFollowUpDetailByIdUrl = (id: string) =>`/lead-followup/${id}`;

export const updateLeadFollowUpUrl = (id: string) => `/lead-followup/${id}`;

export const deleteLeadFollowUpUrl = (id: string) => `/lead-followup/${id}`;

//client followup
export const createProjectFollowUpUrl = () => "/client-followups";

export const fetchAllProjectFollowUpUrl = () => `/client-followups`;

// Status API hook
export const fetchAllStatusesUrl = () => "/lead-statuses"; //Get

export const createStatusesUrl = () => "/lead-statuses"; //post

export const getStatusesDetailByIdUrl = (id: string) => `/lead-statuses/${id}`;//get by id

export const updateStatusesUrl = (id: string) => `/lead-statuses/${id}`;//put

export const deleteStatusesUrl = (id: string) => `/lead-statuses/${id}`; //delete

// Sources API
export const fetchAllSourcesUrl = () => "/lead-sources"; //Get

export const createSourcesUrl = () => "/lead-sources"; //post

export const getSourcesDetailByIdUrl = (id: string) => `/lead-sources/${id}`;//get by id

export const getRoleDetailByIdUrl = (id: string) => `/roles/${id}`;//get by id

export const updateSourcesUrl = (id: string) => `/lead-sources/${id}`;//put

export const deleteSourcesUrl = (id: string) => `/lead-sources/${id}`; //delete


//  Lead Attachment API's hook
export const fetchLeadAttachmentUrl = (leadId?: string) => `/lead-attachments?leadId=${leadId}`; //Get

export const createLeadAttachmentUrl = () => "/lead-attachments"; //post

export const getLeadAttachmentDetailByIdUrl = (id: string) => `/lead-attachments/${id}`;//get by id

export const updateLeadAttachmentUrl = (id: string) => `/lead-attachments/${id}`;//put

export const deleteLeadAttachmentUrl = (id: string) => `/lead-attachments/${id}`; //delete

export const uploadAttachmentUrl = () => "/lead-attachments/uploadAttachment";

export const uploadLeadFromExcelUrl = () => "/leads/upload-excel";

//role
export const fetchAllRoleListUrl = () => "/roles";

//  Staff API's hook
export const fetchAllUsersUrl = () => "/users"; //Get

export const createUserUrl = () => "/users"; //post

export const getUserDetailByIdUrl = (id: string) => `/users/${id}`;//get by id

export const updateUserUrl = (id: string) => `/users/${id}`;//put

export const deleteUserUrl = (id: string) => `/users/${id}`; //delete

// lead status history
export const fetchLeadStatusHistoryUrl = (leadId?: string) => `/lead-status-history?leadId=${leadId}`; //Get

export const createLeadStatusHistoryUrl = () => "/lead-status-history"; //Post

// Types API
export const fetchAllTypesUrl = () => "/lead-types"; //Get

export const createTypeUrl = () => "/lead-types"; //post

export const getTypeDetailByIdUrl = (id: string) => `/lead-types/${id}`;//get by id

export const updateTypeUrl = (id: string) => `/lead-types/${id}`;//put

export const deleteTypeUrl = (id: string) => `/lead-types/${id}`; //delete

export const getNotificationsUrl = () => "/notifications"; //Get

export const markAsReadNotificationUrl = () => "/notifications/read-all"; //mark as read notification

export const deleteNotificationUrl = (id: string) => `/notifications/${id}`;//delete notification url

// Project APIs url
export const createProjectUrl = () => "/projects";

export const fetchAllProjectsUrl = () => "/projects";

export const getProjectDetailByIdUrl = (id: string) => `/projects/${id}`;

export const updateProjectUrl = (id: string) => `/projects/${id}`;

export const deleteProjectUrl = (id: string) => `/projects/${id}`;

export const uploadMultipleAttachmentUrl = () => "/project-attachments/uploadMultipleAttachments";

//  Client API's hook
export const fetchAllClientUrl = () => "/clients"; //Get

export const createClientUrl = () => "/clients"; //post

export const getClientDetailByIdUrl = (id: string) => `/clients/${id}`;//get by id

export const updateClientUrl = (id: string) => `/clients/${id}`;//put

export const deleteClientUrl = (id: string) => `/clients/${id}`; //delete

export const createProjectTemplateUrl = () => "/project-templates"; //post

//  Project Templates API's hook
export const fetchAllProjectTemplatesUrl = () => "/project-templates";

export const getProjectTemplateDetailByIdUrl = (id: string) => `/project-templates/${id}`;

export const updateProjectTemplateUrl = (id: string) => `/project-templates/${id}`;

export const deleteProjectTemplateUrl = (id: string) => `/project-templates/${id}`;

//  Project Template Milestones API's hook
export const createProjectTemplateMilestoneUrl = () => "/project-template-milestones"; //post

export const fetchAllProjectTemplateMilestonesUrl = (templateId: string) => `/project-template-milestones?template_id=${templateId}`;

export const getProjectTemplateMilestoneDetailByIdUrl = (id: string) => `/project-template-milestones/${id}`;

export const updateProjectTemplateMilestoneUrl = (id: string) => `/project-template-milestones/${id}`;

export const deleteProjectTemplateMilestoneUrl = (id: string) => `/project-template-milestones/${id}`;

//  Project Template Milestone Tasks API's hook
export const createProjectTemplateMilestoneTaskUrl = () => "/project-template-milestone-tasks"; //post

export const fetchAllProjectTemplateMilestoneTasksUrl = (milestoneId: string) => `/project-template-milestone-tasks?milestone_master_id=${milestoneId}`;

export const getProjectTemplateMilestoneTaskDetailByIdUrl = (id: string) => `/project-template-milestone-tasks/${id}`;

export const updateProjectTemplateMilestoneTaskUrl = (id: string) => `/project-template-milestone-tasks/${id}`;

export const deleteProjectTemplateMilestoneTaskUrl = (id: string) => `/project-template-milestone-tasks/${id}`;

//  Client Detail API's hook
export const createClientDetailsUrl = () => `/clients-details`;

export const deleteClientDetailsUrl = (id: string) => `/clients-details/${id}`;

export const updateClientDetailsUrl = (id: string) => `/clients-details/${id}`;

export const getClientDetailsByIdUrl = (id: string) => `/clients-details/${id}`;

export const getAllClientDetailsUrl = () => `/clients-details`;

// Client Excel Export & Template Download
export const fetchAllClientDownloadExcelUrl = () => "/clients/export/excel";
export const fetchClientDownloadTemplateExcelUrl = () => "/clients/template/download";

export const uploadClientFromExcelUrl = () => "/clients/upload-excel";

// Project Milestones API's
export const createMilestoneUrl = () => "/project-milestones";
export const updateMilestoneUrl = (milestoneId: string) => `/project-milestones/${milestoneId}`;
export const deleteMilestoneUrl = (milestoneId: string) => `/project-milestones/${milestoneId}`;
export const getMilestoneDetailUrl = (milestoneId: string) => `/project-milestones/${milestoneId}`;
export const getAllMilestonesUrl = (projectId: string) => `/project-milestones/${projectId}`;

// Project Milestone Tasks API's
export const createMilestoneTaskUrl = () => "/project-task";
export const updateMilestoneTaskUrl = (taskId: string) => `/project-task/${taskId}`;
export const deleteMilestoneTaskUrl = (taskId: string) => `/project-task/${taskId}`;
export const getMilestoneTaskDetailUrl = (taskId: string) => `/project-task/${taskId}`;
export const getAllMilestoneTasksUrl = (milestoneId: string) => `/project-task/${milestoneId}`;

// Task Comments API's
export const createTaskCommentUrl = () => "/task-comments";
export const updateTaskCommentUrl = (commentId: string) => `/task-comments/${commentId}`;
export const deleteTaskCommentUrl = (commentId: string) => `/task-comments/${commentId}`;
export const getTaskCommentDetailUrl = (commentId: string) => `/task-comments/${commentId}`;
export const getAllTaskCommentsUrl = (taskId: string) => `/task-comments/task/${taskId}`;

export const updateTaskStatusUrl = (taskId: string) => `/task-status/tasks/${taskId}/status`;

// Daily Task Entries API's
export const createDailyTaskEntryUrl = () => "/daily-task";
export const updateDailyTaskEntryUrl = (id: string) => `/daily-task/${id}`;
export const deleteDailyTaskEntryUrl = (id: string) => `/daily-task/${id}`;
export const getDailyTaskEntryDetailUrl = (id: string) => `/daily-task/${id}`;
export const getAllDailyTaskEntriesUrl = (projectId?: string) => projectId ? `/daily-task?projectId=${projectId}` : "/daily-task";

export const dashboardSummaryUrl = () => "/dashboard/summary";

// EI Log Type Master API
export const fetchAllEILogTypesUrl = () => "/ei-log-types"; //Get
export const createEILogTypeUrl = () => "/ei-log-types"; //post
export const getEILogTypeDetailByIdUrl = (id: string) => `/ei-log-types/${id}`;//get by id
export const updateEILogTypeUrl = (id: string) => `/ei-log-types/${id}`;//put
export const deleteEILogTypeUrl = (id: string) => `/ei-log-types/${id}`; //delete

// EI Log Head Master API
export const fetchAllEILogHeadsUrl = () => "/ei-log-heads"; //Get
export const createEILogHeadUrl = () => "/ei-log-heads"; //post
export const getEILogHeadDetailByIdUrl = (id: string) => `/ei-log-heads/${id}`;//get by id
export const updateEILogHeadUrl = (id: string) => `/ei-log-heads/${id}`;//put
export const deleteEILogHeadUrl = (id: string) => `/ei-log-heads/${id}`; //delete

// EI Log Management URLs
export const fetchAllEILogsUrl = () => "/ei-logs";
export const createEILogUrl = () => "/ei-logs";
export const getEILogDetailByIdUrl = (id: string) => `/ei-logs/${id}`;
export const updateEILogUrl = (id: string) => `/ei-logs/${id}`;
export const deleteEILogUrl = (id: string) => `/ei-logs/${id}`;
export const fetchAllEILogsDownloadExcelUrl = () => "/ei-logs/export/excel";
export const fetchEILogDownloadTemplateExcelUrl = () => "/ei-logs/template/download";
export const uploadEILogFromExcelUrl = () => "/ei-logs/upload-excel";
export const uploadEILogAttachmentUrl = () => "/ei-logs/uploadAttachment";

// Reports URLs
export const staffPerformanceReportUrl = () => "/reports/staff-performance";
export const projectPerformanceReportUrl = () => "/reports/project-performance";
export const leadReportUrl = () => "/reports/leads";
export const businessAnalysisReportUrl = () => "/reports/business-analysis";
export const publicDashboardReportUrl = () => "/reports/public-dashboard";

