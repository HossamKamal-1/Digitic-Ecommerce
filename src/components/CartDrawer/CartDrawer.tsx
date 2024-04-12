import './CartDrawer.scss';
import './CartDrawerItem.scss';
import { Drawer } from '..';
import { Link } from 'react-router-dom';
import { ProductItem } from '../Product/Product';
import emptyCartImg from '../../assets/images/empty-cart.jpg';
import { Trash2 } from 'lucide-react';
import { Loading, formatCurrency, getPriceAfterDiscount } from '../../utils';
import useCart from '../../hooks/useCart';
type CartDrawerProps = {
  closeCartMenu: () => void;
  isCartMenuOpen: boolean;
};
function CartDrawer({ closeCartMenu, isCartMenuOpen }: CartDrawerProps) {
  const {
    cart,
    clearCartProducts,
    isFetching,
    error,
    totalCartProductsCount,
    totalCartProductsPrice,
    removeCartProduct,
  } = useCart();
  return (
    <Drawer
      onClose={closeCartMenu}
      open={isCartMenuOpen}
      direction="right"
      className="cart-drawer"
    >
      <Loading
        isFetching={isFetching}
        renderLoader={<div>Loading now</div>}
        error={error}
      >
        {cart?.length === 0 ? (
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
          cart?.map((cartProduct) => (
            <CartDrawerItem
              key={cartProduct.id}
              product={cartProduct}
              removeCartProduct={removeCartProduct}
            />
          ))
        )}
        <div className="cart-drawer__calculation-content">
          <div className="cart-drawer__inner-wrapper">
            <div className="cart-drawer__total-items-wrapper">
              <span className="cart-drawer__total-label">Total Items</span>
              <span className="cart-drawer__total-count">
                {totalCartProductsCount}
              </span>
            </div>
            <div className="cart-drawer__subtotal-items-wrapper">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-price">
                {formatCurrency(totalCartProductsPrice)}
                SR
              </span>
            </div>
          </div>
          <div className="cart-drawer__links-wrapper">
            <Link
              to="/cart"
              className="cart-drawer__view-cart-link cart-drawer__link"
              onClick={() => closeCartMenu()}
            >
              View Cart
            </Link>
            <Link
              to="/checkout"
              className="cart-drawer__checkout-link cart-drawer__link"
              onClick={() => closeCartMenu()}
            >
              Check out
            </Link>
          </div>
        </div>
        {cart && cart.length > 0 && (
          <button
            onClick={() => clearCartProducts()}
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
  product: ProductItem & {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  };
};

function CartDrawerItem({ product, removeCartProduct }: CartDrawerItemProps) {
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
            <span className="cart-drawer-item__quantity">
              {product.quantity}
            </span>
            X
            <span className="cart-drawer-item__price">
              {formatCurrency(
                product.discountPercentage
                  ? getPriceAfterDiscount(
                      product.price,
                      product.discountPercentage
                    )
                  : product.price
              )}
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
