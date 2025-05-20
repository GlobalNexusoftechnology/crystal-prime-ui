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


export const fetchAllProductsUrl = () => '/getProducts';

export const fetchAllFeatureProductsUrl = () => '/getFeatureProducts';

export const fetchAllHandmadeCarpetProductsUrl = () => '/getHandmadeCarpetProducts';

export const fetchAllVintageCarpetProductsUrl = () => '/getVintageCarpetProducts';

export const fetchAllNewArrivalsProductsUrl = () => '/getNewArrivalsProducts';

export const fetchAllTrendingProductsUrl = () => '/getTrendingProducts';

export const fetchAllLeadsListUrl  = () => '/leads';

export const verifyEmailUrl  = () =>  '/auth/verify-email';

export const sentOtpUrl  = () => '/auth/sentOTP';

export const createLeadUrl   = () => '/leads';

export const getLeadDetailByIdUrl = (id: string) =>
  `/products/${id}`;

export const registerUrl  = () => '/auth/register';

export const resetPasswordUrl  = () => '/auth/resetPassword'

export const changePasswordUrl  = () => '/auth/changePassword'

export const loginUrl = () => "/auth/login";

export const postRegisterUrl = () => "/auth/register";
