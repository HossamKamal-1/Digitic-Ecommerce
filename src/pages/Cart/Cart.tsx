// Styles
import "./Cart.scss";
// Icons
import { Trash, TrashIcon } from "lucide-react";
// Assets
import emptyCartImg from "@assets/images/empty-cart.jpg";
// Utils
import { formatCurrency, getProductFinalPrice } from "@utils";
// Components
import { Link } from "react-router-dom";
import { Loading, RenderList } from "@components/common/utils";
// Hooks
import { useState } from "react";
import useCart from "@hooks/use-cart";
// Types
import type { TCartProduct } from "@custom-types/product";
function Cart() {
  const {
    cartProducts,
    totalCartItems,
    isLoading,
    error,
    emptyCart,
    totalCartPrice,
    removeItemFromCart,
    updateCartProductQty,
  } = useCart();
  function handleCheckoutClick() {
    // TODO: handle checkout functionality
    // TODO: create loading spinner
    console.log("checkout clicked");
  }
  const formattedTotalPrice = formatCurrency(totalCartPrice);
  return (
    <main className="cart">
      <div className="container">
        <Loading
          isFetching={isLoading}
          error={error}
          renderLoader={<div>Loading cart items</div>}
        >
          {totalCartItems > 0 ? (
            <div className="cart__content">
              <div className="cart__table-wrapper">
                <table className="cart__table">
                  <thead className="cart__table-head">
                    <tr>
                      <th className="cart__table-head-cell">Product</th>
                      <th className="cart__table-head-cell">Price</th>
                      <th className="cart__table-head-cell">Quantity</th>
                      <th className="cart__table-head-cell">Total</th>
                    </tr>
                  </thead>
                  <tbody className="cart__table-body">
                    <RenderList
                      items={cartProducts}
                      renderItem={(cartProduct) => (
                        <CartRow
                          key={cartProduct.id}
                          cartProduct={cartProduct}
                          removeCartProduct={removeItemFromCart}
                          updateCartProductQty={updateCartProductQty}
                        />
                      )}
                    />
                  </tbody>
                </table>
              </div>
              <div className="cart__clear-all-wrapper">
                <button
                  className="cart__clear-all-btn"
                  onClick={() => emptyCart()}
                >
                  <TrashIcon className="cart__clear-all-btn-icon" /> Clear All
                </button>
              </div>
              <Link to="/store" className="cart__continue-link">
                Continue Shopping
              </Link>
              <div className="cart__checkout-outer-wrapper">
                <div className="cart__special-instructions-wrapper">
                  <span className="cart__special-instructions-label">
                    Order special instruction
                  </span>
                  <textarea className="cart__special-instruction-textarea"></textarea>
                </div>
                <div className="cart__checkout-wrapper">
                  <div className="cart__subtotal-wrapper">
                    <span className="cart__subtotal-label">Subtotal</span>
                    <span className="cart__subtotal-price">
                      {formattedTotalPrice}
                    </span>
                  </div>
                  <p className="cart__checkout-note">
                    Taxes and shipping calculated at checkout
                  </p>
                  <button
                    className="cart__checkout-btn"
                    onClick={() => handleCheckoutClick()}
                  >
                    Check Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="cart__empty-cart-wrapper">
              <div className="cart__empty-img-wrapper">
                <img src={emptyCartImg} alt="" className="cart__empty-img" />
              </div>
              <p className="cart__empty-desc">
                Your cart is empty, continue shopping..
              </p>
            </div>
          )}
        </Loading>
      </div>
    </main>
  );
}
type CartRowProps = {
  cartProduct: TCartProduct;
  removeCartProduct: (productId: number) => void;
  updateCartProductQty: (productId: number, qty: number) => void;
};
function CartRow({
  cartProduct,
  removeCartProduct,
  updateCartProductQty,
}: CartRowProps) {
  const [quantityInputValue, setQuantityInputValue] = useState(cartProduct.qty);
  function handleQuantityInputChange(quantityValue: number) {
    console.log("changed");
    if (quantityValue <= cartProduct.max && quantityValue !== 0) {
      setQuantityInputValue(quantityValue);
      updateCartProductQty(cartProduct.id, quantityValue);
    }
  }
  function handleIncreaseQtyClick() {
    if (quantityInputValue === cartProduct.max) return;
    setQuantityInputValue((prevQty) => prevQty + 1);
    updateCartProductQty(cartProduct.id, quantityInputValue + 1);
  }
  function handleDecreaseQtyClick() {
    if (quantityInputValue === 1) return;
    setQuantityInputValue((prevQty) => prevQty - 1);
    updateCartProductQty(cartProduct.id, quantityInputValue - 1);
  }

  const productFinalPrice = getProductFinalPrice(
    cartProduct.price,
    cartProduct.discountPercentage
  );
  const totalProductPriceWithQty = formatCurrency(
    productFinalPrice * cartProduct.qty
  );
  return (
    <tr key={cartProduct.id}>
      <td className="cart__table-product-cell cart__table-cell">
        <div className="cart__cart-product">
          <div className="cart__cart-product-img-wrapper">
            <img src={cartProduct.thumbnails[0]} alt={cartProduct.title} />
          </div>
          <div className="cart__cart-product-body-wrapper">
            <Link
              to={`/products/${cartProduct.id}`}
              className="cart__cart-product-title"
            >
              {cartProduct.title}
            </Link>
            {cartProduct.selectedSize && (
              <span className="cart__cart-product__size">
                Size: {cartProduct.selectedSize}
              </span>
            )}
            {cartProduct.selectedColor && (
              <span className="cart__cart-product__color">
                color: {cartProduct.selectedColor}
              </span>
            )}
          </div>
        </div>
      </td>
      <td className="cart__table-price-cell cart__table-cell">
        <span className="cart__cart-product__price">{productFinalPrice}</span>
      </td>
      <td className="cart__table-quantity-cell cart__table-cell">
        <div className="cart__table-quantity-cell-inner-wrapper">
          <div className="cart__cart-product__quantity-wrapper">
            <div className="cart__cart-product__quantity-actions-wrapper">
              <button
                className="cart__cart-product__quantity-change-btn"
                onClick={() => handleIncreaseQtyClick()}
              >
                +
              </button>
              <button
                className="cart__cart-product__quantity-change-btn"
                onClick={() => handleDecreaseQtyClick()}
              >
                -
              </button>
            </div>
            <input
              value={quantityInputValue}
              onChange={(e) =>
                handleQuantityInputChange(e.target.valueAsNumber)
              }
              type="number"
              className="cart__cart-product__quantity-input"
            />
          </div>
          <button
            className="cart__cart-product__remove-btn"
            onClick={() => removeCartProduct(cartProduct.id)}
          >
            <Trash className="cart__cart-product__remove-btn-icon" />
          </button>
        </div>
      </td>
      <td className="cart__table-total-price-cell cart__table-cell">
        <span className="cart__cart-product__total-price">
          {totalProductPriceWithQty}
        </span>
      </td>
    </tr>
  );
}

export default Cart;
