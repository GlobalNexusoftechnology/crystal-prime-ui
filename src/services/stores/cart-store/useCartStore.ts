import { createZustandStore } from "../../zustand"

import { ICartState } from "./types"

import {
  addItemCallback,
  loadPersistedCartStore,
  removeItemCallback,
  updateItemQuantityCallback,
  clearCartCallback,
} from "./callbacks"

/**
 * This tracks changes to the cart items and persists updates to local storage.
 */
export const useCartStore = createZustandStore<ICartState>((set) => {
  const localCartData = loadPersistedCartStore()

  return {
    items: localCartData?.items ?? [],
    addItem: addItemCallback(set),
    removeItem: removeItemCallback(set),
    updateItemQuantity: updateItemQuantityCallback(set),
    clearCart: clearCartCallback(set),
  }
})
