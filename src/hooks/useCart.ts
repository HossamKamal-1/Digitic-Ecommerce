import { useContext } from 'react';
import { ProductsListContext } from '../contexts/listsContext';
import useProducts from './useProducts';
import { getPriceAfterDiscount, isOfferTimeElapsed } from '../utils';
import { ProductItem } from '../components/Product/Product';
export type CartProduct = ProductItem & {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}
const useCart = () => {
  const { products, ...rest } = useProducts();
  const {
    userProductsCollection: { cart },
    getTotalCartProductsCount,
    clearListProducts,
    removeProductFromList,
  } = useContext(ProductsListContext);

  const cartProducts: CartProduct[] | undefined = products
    ?.filter(({ id }) => cart.some((cartItem) => cartItem.id === id))
    .map((cartProduct) => {
      const cartItem = cart.find((cartItem) => cartItem.id === cartProduct.id);
      return {
        ...cartProduct,
        quantity: cartItem?.quantity || 1,
        selectedColor: cartItem?.color,
        selectedSize: cartItem?.size,
        discountPercentage:
          cartProduct.offerExpirationDate &&
          isOfferTimeElapsed(cartProduct.offerExpirationDate)
            ? null
            : cartProduct.discountPercentage,
      };
    });
  function getTotalCartProductsPrice() {
    if (!cartProducts) return 0;
    return cartProducts.reduce(
      (prevPrice, { price, discountPercentage, id }) => {
        const productQuantity =
          cart.find((cartProduct) => cartProduct.id === id)?.quantity || 1;
        return (
          prevPrice +
          (discountPercentage
            ? getPriceAfterDiscount(price, discountPercentage)
            : price) *
            productQuantity
        );
      },
      0
    );
  }
  const clearCartProducts = () => clearListProducts('cart');
  const removeCartProduct = (productId: number) =>
    removeProductFromList('cart', productId);
  return {
    totalCartProductsCount: getTotalCartProductsCount(),
    totalCartProductsPrice: getTotalCartProductsPrice(),
    removeCartProduct,
    clearCartProducts,
    cart: cartProducts,
    ...rest,
  };
};
export default useCart;
