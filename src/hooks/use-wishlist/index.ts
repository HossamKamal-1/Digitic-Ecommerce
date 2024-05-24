import { useAppSelector } from "@store/hooks";
import useWishlistActions from "./useWishlistActions";
import useWishlistProducts from "./useWishlistProducts";
import { isProductExistsInWishlistSelector } from "@store/features/wishlist/wishlistSlice";

const useWishlist = () => {
  const wishlistActions = useWishlistActions();
  const wishlistProducts = useWishlistProducts();
  return { ...wishlistActions, ...wishlistProducts };
};
const useIsProductInWishlist = (productId: number) => {
  const isProductInWishlist = useAppSelector((state) =>
    isProductExistsInWishlistSelector(state, productId)
  );
  return isProductInWishlist;
};
export { useWishlistActions, useWishlistProducts, useIsProductInWishlist };
export default useWishlist;
