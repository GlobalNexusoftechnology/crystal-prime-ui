import { localStorageUtil } from "@/utils"

import {
  IPersistCartStoreTargetState,
  TSetCartState,
} from "./types"
import { ICreateProductPayload } from "@/services/apis/clients"

/**
 * This tracks persisted cart state in local storage.
 * Covers (cartItems)
 */
export const STORAGE_KEY_CART_STATE = "cart-state"

/**
 * This retrieves and decrypts the cart information from secure local storage.
 */
export const loadPersistedCartStore =
  (): IPersistCartStoreTargetState | null => {
    // Call get method to retrieve the stored data
    const storedData = localStorageUtil.get<IPersistCartStoreTargetState>(
      STORAGE_KEY_CART_STATE
    )

    // If the stored data is not null and is an object, return it
    if (storedData && typeof storedData === "object") {
      return storedData as IPersistCartStoreTargetState // Cast to the expected type
    }

    return null // Return null if storedData is null or not an object
  }

/**
 * This persists the cart information to secure local storage.
 */
export const persistCartStore = (targetState: IPersistCartStoreTargetState) => {
  const prevState = loadPersistedCartStore()

  // Ensure prevState is an object or default to an empty object
  const newState = {
    ...(prevState ?? {}), // If prevState is null, default to an empty object
    ...targetState,
  }

  localStorageUtil.set(STORAGE_KEY_CART_STATE, newState)
}

/**
 * Adds a new item to the cart and persists it.
 */
export function addItemCallback(set: TSetCartState) {
  return function addItem(newItem: ICreateProductPayload) {
    set((state) => {
      const updatedState = {
        items: [...state.items, newItem],
      }

      persistCartStore(updatedState)

      return updatedState
    })
  }
}

/**
 * This removes an item from the cart and persists it.
 */
export function removeItemCallback(set: TSetCartState) {
  return function removeItem(itemId: string) {
    set((state) => {
      const updatedState = {
        items: state.items.filter((item) => item?.id !== itemId),
      }

      persistCartStore(updatedState)

      return updatedState
    })
  }
}

/**
 * Updates the quantity of an item in the cart and persists it.
 */
export function updateItemQuantityCallback(set: TSetCartState) {
  return function updateItemQuantity(itemId: string, quantity: number) {
    set((state) => {
      const updatedState = {
        items: state?.items?.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        ),
      }

      persistCartStore(updatedState)

      return updatedState
    })
  }
}

/**
 * Clears all items from the cart and persists it.
 */
export function clearCartCallback(set: TSetCartState) {
  return function clearCart() {
    const updatedState = {
      items: [],
    }

    set(() => updatedState)

    persistCartStore(updatedState)
  }
}
