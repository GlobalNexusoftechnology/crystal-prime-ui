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


//  Staff API's hook
export const fetchAllClientUrl = () => "/clients"; //Get

export const createClientUrl = () => "/clients/create-client"; //post

export const getClientDetailByIdUrl = (id: string) => `/clients/${id}`;//get by id

export const updateClientUrl = (id: string) => `/clients/${id}`;//put

export const deleteClientUrl = (id: string) => `/clients/${id}`; //delete