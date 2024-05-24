import {
  clearWishlist,
  removeWishlistItem,
  toggleWishlistItem,
} from "@store/features/wishlist/wishlistSlice";
import { useAppDispatch } from "@store/hooks";
import { useCallback } from "react";

const useWishlistActions = () => {
  const dispatch = useAppDispatch();
  function toggleWishlistProduct(productId: number) {
    dispatch(toggleWishlistItem(productId));
  }
  const removeWishlistProduct = useCallback(
    (productId: number) => {
      dispatch(removeWishlistItem(productId));
    },
    [dispatch]
  );
  function emptyWishlist() {
    dispatch(clearWishlist());
  }
  return { toggleWishlistProduct, removeWishlistProduct, emptyWishlist };
};

export default useWishlistActions;
