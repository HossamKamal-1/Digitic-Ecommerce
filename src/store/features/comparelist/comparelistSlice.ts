import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@store";
type ComparelistState = {
  items: number[];
};
const initialState: ComparelistState = {
  items: [],
};
const comparelistSlice = createSlice({
  name: "comparelist",
  initialState,
  reducers: {
    toggleComparelistItem(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        removeItemFromComparelist(state, productId);
      } else {
        state.items.push(productId);
      }
    },
    removeComparelistItem(state, action: PayloadAction<number>) {
      const productId = action.payload;
      removeItemFromComparelist(state, productId);
    },
    clearComparelist(state) {
      state.items = [];
    },
  },
});

// Helpers
function removeItemFromComparelist(state: ComparelistState, productId: number) {
  state.items = state.items.filter((itemId) => itemId !== productId);
}
// Selectors
const comparelistItemsSelector = (state: RootState) => state.comparelist.items;
const isProductExistsInComparelistSelector = createSelector(
  (state: RootState) => state.comparelist.items,
  (_, productId: number) => productId,
  (items: number[], productId: number) => items.includes(productId)
);
export { comparelistItemsSelector, isProductExistsInComparelistSelector };
// Actions
export const {
  clearComparelist,
  removeComparelistItem,
  toggleComparelistItem,
} = comparelistSlice.actions;

export default comparelistSlice.reducer;
