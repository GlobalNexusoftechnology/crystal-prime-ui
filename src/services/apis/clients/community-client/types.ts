/**
 * Sample format to be passed to the login form
 */
export interface ILoginPayload {
  email: string;
  password: string;
}

export type TProduct = {
  id: number
  name: string
  price: number
  category: string
  brand: string
  color: string
  quantity: number
  sizes: string[]
  material: string
  image: string
  slug: string
}

/**
 * This API response of all the products on the platform
 */
export interface IProductsResponse {
  status: boolean;
  message: string;
  success: true;
  data: TProduct[];
}

export interface IProductProps {
  productData: TProduct
  relatedProducts?: TProduct[]
}

export interface IAllProductProps {
  allProductData: TProduct[]
}

export interface ICreateProductPayload {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  width: number;
  height: number;
  material: string;
  color: string;
  fabric: string;
  weight: number;
  shape: string;
  quantity: number;
  category: string;
  gallery: string[];
  isApproved: boolean;
  vendorId: string;
  subCategory: string;
}