import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@store";

const cartTotalItemsSelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) =>
    Object.values(items).reduce(
      (accumlator, currentValue) => accumlator + currentValue.qty,
      0
    )
);
const cartItemsSelector = (state: RootState) => state.cart.items;
const cartItemsIdsListSelector = createSelector(
  (state: RootState) => state.cart.items,
  (items) => Object.keys(items)
);

const isProductExistsInCartSelector =
  (productId: number) => (state: RootState) =>
    Boolean(state.cart.items[productId]);

export {
  cartTotalItemsSelector,
  isProductExistsInCartSelector,
  cartItemsIdsListSelector,
  cartItemsSelector,
};
