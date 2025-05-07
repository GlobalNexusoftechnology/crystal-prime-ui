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

