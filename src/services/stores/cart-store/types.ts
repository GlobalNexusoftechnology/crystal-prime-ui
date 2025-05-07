import { ICreateProductPayload } from "@/services/apis"

/**
 * Represents an individual item in the shopping cart.
 */
export interface ICartItem {
  id: number // Unique identifier for the item
  name: string // Name of the item
  quantity: number // Quantity of the item in the cart
  price: number // Price of a single unit of the item
  imageUrl?: string // Optional image URL for the item
  description?: string // Optional description of the item
  color: string,
  size: string,
  image: string,
  material: string,
  slug: string,
  category: string,
  brand: string
}


/**
 * Represents the structure of the cart's state that can be persisted.
 * - This is a subset of the full cart state focusing on the items themselves.
 */
export type IPersistCartStoreTargetState = Partial<{
  items: ICreateProductPayload[] // Array of cart items to be stored
}>

/**
 * Type definition for the set function used to update the cart state.
 */
export type TSetCartState = (
  partial:
    | ICartState
    | Partial<ICartState>
    | ((state: ICartState) => ICartState | Partial<ICartState>),
  replace?: false | undefined
) => void

/**
 * Represents the overall state of the cart, including methods for state management.
 */
export interface ICartState {
  items: ICreateProductPayload[] // Array of items currently in the cart
  addItem: (item: ICreateProductPayload) => void // Method to add an item to the cart
  removeItem: (itemId: string) => void // Method to remove an item by ID
  updateItemQuantity: (itemId: string, quantity: number) => void // Method to update the quantity of an item
  clearCart: () => void // Method to clear all items in the cart
}
