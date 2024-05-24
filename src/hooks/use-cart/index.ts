import { useAppSelector } from "@store/hooks";
import useCartActions from "./useCartActions";
import useCartProducts from "./useCartProducts";
import { isProductExistsInCartSelector } from "@store/features/cart/selectors";

const useCart = () => {
  const cartActions = useCartActions();
  const cartProducts = useCartProducts();
  return { ...cartActions, ...cartProducts };
};

const useIsProductInCart = (productId: number) =>
  useAppSelector(isProductExistsInCartSelector(productId));
export { useCartActions, useCartProducts, useIsProductInCart };
export default useCart;
