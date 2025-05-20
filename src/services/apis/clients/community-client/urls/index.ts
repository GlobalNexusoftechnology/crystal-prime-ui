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
export const postRegisterUrl = () => "/auth/register";

export const loginUrl = () => "/auth/login";

export const verifyEmailUrl = () => "/auth/verify-email";

export const sentOtpUrl = () => "/auth/sentOTP";

// leads APIs url
export const createLeadUrl = () => "/leads";

export const fetchAllLeadsListUrl = () => "/leads";

export const getLeadDetailByIdUrl = (id: string) => `/products/${id}`;


