import {
  addToCart,
  clearCart,
  removeFromCart,
  updateCartItemQty,
} from "@store/features/cart/cartSlice";
import { AddToCartPayload } from "@store/features/cart/types";
import { useAppDispatch } from "@store/hooks";
const useCartActions = () => {
  const dispatch = useAppDispatch();
  function addItemToCart(payload: AddToCartPayload) {
    dispatch(addToCart(payload));
  }
  function emptyCart() {
    dispatch(clearCart());
  }
  function removeItemFromCart(productId: number) {
    dispatch(removeFromCart({ productId }));
  }
  function updateCartProductQty(productId: number, newQty: number) {
    dispatch(updateCartItemQty({ productId, newQty }));
  }
  return {
    emptyCart,
    addItemToCart,
    removeItemFromCart,
    updateCartProductQty,
  };
};
export default useCartActions;
