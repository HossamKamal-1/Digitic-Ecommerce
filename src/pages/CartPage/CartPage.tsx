import './CartPage.scss';
import { Trash, TrashIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import emptyCart from '../../assets/images/empty-cart.jpg';
import useCart, { CartProduct } from '../../hooks/useCart';
import { formatCurrency, getPriceAfterDiscount } from '../../utils';
import { useState } from 'react';
import { useListContext } from '../../contexts/listsContext';
function CartPage() {
  const { cart, removeCartProduct, totalCartProductsPrice, clearCartProducts } =
    useCart();
  function handleCheckoutClick() {
    // TODO: handle checkout functionality
    console.log('checkout clicked');
  }
  return (
    <main className="cart">
      <div className="container">
        {cart && cart.length > 0 ? (
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
                  {cart.map((cartProduct) => {
                    return (
                      <CartRow
                        key={cartProduct.id}
                        cartProduct={cartProduct}
                        removeCartProduct={removeCartProduct}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="cart__clear-all-wrapper">
              <button
                className="cart__clear-all-btn"
                onClick={() => clearCartProducts()}
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
                    {formatCurrency(totalCartProductsPrice)}
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
              <img src={emptyCart} alt="" className="cart__empty-img" />
            </div>
            <p className="cart__empty-desc">
              Your cart is empty, continue shopping..
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
type CartRowProps = {
  cartProduct: CartProduct;
  removeCartProduct: (productId: number) => void;
};
function CartRow({ cartProduct, removeCartProduct }: CartRowProps) {
  const {
    increaseCartProductByOne,
    decreaseCartProductByOne,
    updateCartProductQty,
  } = useListContext();
  const [quantityInputValue, setQuantityInputValue] = useState(
    cartProduct.quantity
  );
  function handleQuantityInputChange(value: number) {
    console.log('changed');
    if (value <= 100 && value !== 0) {
      setQuantityInputValue(value);
      updateCartProductQty(cartProduct.id, value);
    }
  }
  function handleInputBtnClick(type: 'increase' | 'decrease') {
    if (type === 'increase') {
      if (quantityInputValue !== 100) {
        setQuantityInputValue((prevQty) => prevQty + 1);
        increaseCartProductByOne(cartProduct.id);
      }
    } else {
      if (quantityInputValue > 1) {
        setQuantityInputValue((prevQty) => prevQty - 1);
        decreaseCartProductByOne(cartProduct.id);
      }
    }
  }
  const actualProductPrice = cartProduct.discountPercentage
    ? getPriceAfterDiscount(cartProduct.price, cartProduct.discountPercentage)
    : cartProduct.price;
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
        <span className="cart__cart-product__price">
          {formatCurrency(actualProductPrice)}
        </span>
      </td>
      <td className="cart__table-quantity-cell cart__table-cell">
        <div className="cart__table-quantity-cell-inner-wrapper">
          <div className="cart__cart-product__quantity-wrapper">
            <div className="cart__cart-product__quantity-actions-wrapper">
              <button
                className="cart__cart-product__quantity-change-btn"
                onClick={() => handleInputBtnClick('increase')}
              >
                +
              </button>
              <button
                className="cart__cart-product__quantity-change-btn"
                onClick={() => handleInputBtnClick('decrease')}
              >
                -
              </button>
            </div>
            <input
              value={quantityInputValue}
              onChange={(e) =>
                handleQuantityInputChange(e.target.valueAsNumber)
              }
              min="1"
              max="100"
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
          {formatCurrency(actualProductPrice * cartProduct.quantity)}
        </span>
      </td>
    </tr>
  );
}

export default CartPage;
