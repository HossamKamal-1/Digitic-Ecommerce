import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { AddToCartPayload } from "./types";

type CartState = {
  items: {
    [key: number]: {
      qty: number;
      selectedColor?: string;
      selectedSize?: string;
    };
  };
};

const initialState: CartState = {
  items: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (cartState, action: PayloadAction<AddToCartPayload>) => {
      const { id, amount = 1, selectedColor, selectedSize } = action.payload;
      cartState.items[id] = {
        qty: amount,
        selectedColor: selectedColor,
        selectedSize: selectedSize,
      };
    },
    updateCartItemQty: (
      cartState,
      action: PayloadAction<{ productId: number; newQty: number }>
    ) => {
      const { productId, newQty } = action.payload;
      cartState.items[productId].qty = newQty;
    },
    removeFromCart: (
      cartState,
      action: PayloadAction<{ productId: number }>
    ) => {
      const { productId } = action.payload;
      delete cartState.items[productId];
    },
    clearCart: (cartState) => {
      cartState.items = {};
    },
  },
});
// Actions
export const { addToCart, updateCartItemQty, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
