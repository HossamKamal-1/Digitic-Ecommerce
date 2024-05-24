import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";

type WishlistState = {
  items: number[];
};
const initialState: WishlistState = {
  items: [],
};
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlistItem(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        removeItemFromWishlist(state, productId);
      } else {
        state.items.push(productId);
      }
    },
    removeWishlistItem(state, action: PayloadAction<number>) {
      const productId = action.payload;
      removeItemFromWishlist(state, productId);
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});
// Helpers
function removeItemFromWishlist(state: WishlistState, productId: number) {
  state.items = state.items.filter((itemId) => itemId !== productId);
}

// Selectors
const wishlistItemsSelector = (state: RootState) => state.wishlist.items;
const isProductExistsInWishlistSelector = createSelector(
  (state: RootState) => state.wishlist.items,
  (_, productId: number) => productId,
  (items: number[], productId: number) => items.includes(productId)
);
export { wishlistItemsSelector, isProductExistsInWishlistSelector };
// Actions
export const { toggleWishlistItem, removeWishlistItem, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
