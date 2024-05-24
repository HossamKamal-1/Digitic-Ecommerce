// Styles
import "./CartDrawer.scss";
import "./CartDrawerItem.scss";
import { Link } from "react-router-dom";
import Drawer, {
  DrawerPropsWithoutChildren,
} from "@components/common/ui/Drawer/Drawer";
import { Loading, RenderList } from "@components/common/utils";
import emptyCartImg from "@assets/images/empty-cart.jpg";
import { Trash2 } from "lucide-react";
import { formatCurrency, getProductFinalPrice } from "@utils";
import type { TCartProduct } from "@custom-types/product";
import useCart from "@hooks/use-cart";
type CartDrawerProps = DrawerPropsWithoutChildren;
function CartDrawer({ onClose, isOpen, direction = "right" }: CartDrawerProps) {
  const {
    cartProducts,
    isLoading,
    error,
    totalCartItems,
    totalCartPrice,
    removeItemFromCart,
    emptyCart,
  } = useCart();
  const formattedCartPrice = formatCurrency(totalCartPrice);

  // TODO: handle cart logic here
  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      direction={direction}
      className="cart-drawer"
    >
      <Loading
        isFetching={isLoading}
        renderLoader={<div>Loading now</div>}
        error={error}
      >
        {!totalCartItems ? (
          <>
            <p className="cart-drawer__empty-cart-desc">
              Your cart is currently empty,
              <br />
              Continue shopping.
            </p>
            <div className="cart-drawer__empty-cart-img-wrapper">
              <img
                src={emptyCartImg}
                alt="emptycart"
                className="empty-cart-img"
                width={200}
              />
            </div>
          </>
        ) : (
          <RenderList
            items={cartProducts}
            renderItem={(cartProduct) => (
              <CartDrawerItem
                key={cartProduct.id}
                product={cartProduct}
                removeCartProduct={removeItemFromCart}
              />
            )}
          />
        )}
        <div className="cart-drawer__calculation-content">
          <div className="cart-drawer__inner-wrapper">
            <div className="cart-drawer__total-items-wrapper">
              <span className="cart-drawer__total-label">Total Items</span>
              <span className="cart-drawer__total-count">{totalCartItems}</span>
            </div>
            <div className="cart-drawer__subtotal-items-wrapper">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-price">
                {formattedCartPrice}
                SR
              </span>
            </div>
          </div>
          <div className="cart-drawer__links-wrapper">
            <Link
              to="/cart"
              className="cart-drawer__view-cart-link cart-drawer__link"
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              className="cart-drawer__checkout-link cart-drawer__link"
            >
              Check out
            </Link>
          </div>
        </div>
        {totalCartItems > 0 && (
          <button
            onClick={() => emptyCart()}
            className="cart-drawer__clear-cart-btn"
          >
            Clear All
          </button>
        )}
      </Loading>
    </Drawer>
  );
}

type CartDrawerItemProps = {
  removeCartProduct: (productId: number) => void;
  product: TCartProduct;
};

function CartDrawerItem({ product, removeCartProduct }: CartDrawerItemProps) {
  const actualProductPrice = getProductFinalPrice(
    product.price,
    product.discountPercentage
  );
  const formattedProductPrice = formatCurrency(actualProductPrice);
  return (
    <div className="cart-drawer-item">
      <Link to={`/products/${product.id}`} className="cart-drawer-item__link">
        <img
          src={product.thumbnails[0]}
          alt="itemname"
          className="cart-drawer-item__item-img"
        />
      </Link>
      <div className="cart-drawer-item__text-content">
        <div className="cart-drawer-item__desc-wrapper">
          <Link
            to={`/products/${product.id}`}
            className="cart-drawer-item__title"
          >
            {product.title}
          </Link>
          <div className="cart-drawer-item__price-wrapper">
            <span className="cart-drawer-item__quantity">{product.qty}</span>X
            <span className="cart-drawer-item__price">
              {formattedProductPrice}
            </span>
          </div>
          {product.selectedSize && (
            <div className="cart-drawer-item__size">
              Size: {product.selectedSize}
            </div>
          )}
          {product.selectedColor && (
            <div className="cart-drawer-item__color">
              Color: {product.selectedColor}
            </div>
          )}
        </div>
        <button
          onClick={() => removeCartProduct(product.id)}
          className="cart-drawer-item__delete-btn"
        >
          <Trash2 className="icon" />
        </button>
      </div>
    </div>
  );
}

export default CartDrawer;
