import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { useAppSelector } from "@store/hooks";
import { useEffect, useRef } from "react";
import {
  cartTotalItemsSelector,
  cartItemsIdsListSelector,
  cartItemsSelector,
} from "@store/features/cart/selectors";
import { getProductFinalPrice, getUniformStringQueryFromList } from "@utils";
import type { TCartProduct } from "@custom-types/product";

const useCartProducts = () => {
  const items = useAppSelector(cartItemsSelector);
  const totalCartItems = useAppSelector(cartTotalItemsSelector);
  const cartItemsIdsList = useAppSelector(cartItemsIdsListSelector);
  const cartProductsIds = getUniformStringQueryFromList(cartItemsIdsList);
  const isDataLoadedForFirstTimeRef = useRef(false);
  const { data, error, isLoading } = useGetProductsQuery(cartProductsIds, {
    skip: totalCartItems === 0 || isDataLoadedForFirstTimeRef.current,
  });
  const cartProducts = data
    ?.filter(({ id }) => cartItemsIdsList.includes(id.toString()))
    .map((product) => {
      const cartProduct: TCartProduct = {
        ...product,
        qty: items[product.id].qty,
        selectedColor: items[product.id].selectedColor,
        selectedSize: items[product.id].selectedSize,
      };
      return cartProduct;
    });
  useEffect(() => {
    if (data) {
      isDataLoadedForFirstTimeRef.current = true;
    }
  }, [data]);
  // console.log("from cartproducts hook");
  // console.log({ cartProducts });
  const totalCartPrice = getCartTotalPrice(cartProducts ?? []);

  return { cartProducts, error, isLoading, totalCartItems, totalCartPrice };
};
// Helpers
function getCartTotalPrice(products: TCartProduct[]) {
  return products.reduce((accumulator, currentProduct) => {
    const productActualPrice = getProductFinalPrice(
      currentProduct.price,
      currentProduct.discountPercentage
    );
    return accumulator + currentProduct.qty * productActualPrice;
  }, 0);
}

export default useCartProducts;
