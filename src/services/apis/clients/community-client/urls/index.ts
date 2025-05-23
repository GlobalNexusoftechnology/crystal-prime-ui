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

export const changePasswordUrl = () => "/auth/changePassword";

// leads APIs url
export const createLeadUrl = () => "/leads";

export const fetchAllLeadsListUrl = () => "/leads";

export const getLeadDetailByIdUrl = (id: string) => `/leads/${id}`;

export const deleteLeadUrl = (id: string) => `/leads/${id}`;

export const updateLeadUrl = (id: string) => `/leads/${id}`;

// download excel

export const getLeadDownloadExcelByIdUrl = (id: string) =>
  `/lead-download-excel/${id}`;

export const fetchAllLeadDownloadExcelUrl = () => "/leads";

//lead followup

export const createLeadFollowUpUrl = () => "/lead-followup";

export const fetchAllLeadFollowUpUrl = () => "/lead-followup";

export const getLeadFollowUpDetailByIdUrl = (id: string) =>
  `/lead-followup/${id}`;

export const updateLeadFollowUpUrl = (id: string) => `/lead-followup/${id}`;

export const deleteLeadFollowUpUrl = (id: string) => `/lead-followup/${id}`;

// Status API hook

export const fetchAllStatusesUrl = () => "/lead-statuses"; //Get

export const createStatusesUrl = () => "/lead-statuses"; //post

export const getStatusesDetailByIdUrl = (
  id: string //get by id
) => `/lead-statuses/${id}`;

export const updateStatusesUrl = (
  id: string //put
) => `/lead-statuses/${id}`;

export const deleteStatusesUrl = (id: string) => `/lead-statuses/${id}`; //delete

// Sources API

export const fetchAllSourcesUrl = () => "/lead-sources"; //Get

export const createSourcesUrl = () => "/lead-sources"; //post

export const getSourcesDetailByIdUrl = (
  id: string //get by id
) => `/lead-sources/${id}`;

export const updateSourcesUrl = (
  id: string //put
) => `/lead-sources/${id}`;


export const deleteSourcesUrl = (id: string) => `/lead-sources/${id}`; //delete


//  Lead Attachment API's hook

export const fetchLeadAttachmentUrl = () => "/lead-attachment"; //Get

export const createLeadAttachmentUrl = () => "/lead-attachment"; //post

export const getLeadAttachmentDetailByIdUrl = (
  id: string //get by id
) => `/lead-attachment/${id}`;

export const updateLeadAttachmentUrl = (
  id: string //put
) => `/lead-attachment/${id}`;


export const deleteLeadAttachmentUrl = (id: string) => `/lead-attachment/${id}`; //delete

//role

export const fetchAllRoleListUrl = () => "/roles";



//  Staff API's hook

export const fetchAllUsersUrl = () => "/users"; //Get

export const createUserUrl = () => "/users"; //post

export const getUserDetailByIdUrl = (
  id: string //get by id
) => `/users/${id}`;

export const updateUserUrl = (
  id: string //put
) => `/users/${id}`;


export const deleteUserUrl = (id: string) => `/users/${id}`; //delete