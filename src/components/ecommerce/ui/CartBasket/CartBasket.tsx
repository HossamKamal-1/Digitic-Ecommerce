import "./CartBasket.scss";
import { Loading } from "@components/common/utils";
import { useCartProducts } from "@hooks/use-cart";
import useDrawer from "@hooks/useDrawer";
import { formatCurrency } from "@utils";
import { ShoppingCart } from "lucide-react";
import { memo, useEffect, useState } from "react";

function CartBasket() {
  const { isLoading, error, totalCartItems, totalCartPrice } =
    useCartProducts();
  const { onOpen: openCartDrawer } = useDrawer("CartDrawer");
  const formattedTotalCartPrice = formatCurrency(totalCartPrice);
  const [isAnimate, setIsAnimate] = useState(false);
  const cartQtyClsx = `cart-basket__quantity ${isAnimate ? "pump" : ""}`;
  useEffect(() => {
    if (!totalCartItems) return;
    setIsAnimate(true);
  }, [totalCartItems]);
  return (
    <button className="cart-basket" onClick={() => openCartDrawer({})}>
      <ShoppingCart className="cart-basket__icon" />
      <div className="cart-basket__text-wrapper">
        <span
          className={cartQtyClsx}
          onAnimationEnd={() => {
            setIsAnimate(false);
          }}
        >
          {totalCartItems}
        </span>
        <div className="cart-basket__price">
          <Loading
            isFetching={isLoading}
            error={error}
            renderLoader={<span>Loading</span>}
          >
            {formattedTotalCartPrice}
          </Loading>
        </div>
      </div>
    </button>
  );
}

const CartBasketMemo = memo(CartBasket);
export default CartBasketMemo;
