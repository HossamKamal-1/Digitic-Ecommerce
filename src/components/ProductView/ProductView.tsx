import './ProductView.scss';
import { Link } from 'react-router-dom';
import { getPriceAfterDiscount, formatCurrency } from '../../utils';
import { CustomSlider } from '..';
import { ProductProps, Size } from '../Product/Product';
import { ElementRef, useId, useRef } from 'react';
import { useListContext } from '../../contexts/listsContext';
function ProductView({
  product: {
    id,
    discountPercentage,
    price,
    title,
    size,
    color,
    thumbnails,
    instock,
  },
  isOfferExpired = false,
}: ProductProps & {
  isOfferExpired?: boolean;
}) {
  // TODO: refactor css using BEM
  const sizeElementRef = useRef<ElementRef<'select'> | null>(null);
  const colorElementRef = useRef<ElementRef<'select'> | null>(null);
  const quantityElementRef = useRef<ElementRef<'input'> | null>(null);
  const selectId = useId();
  const { addProductToCart, isProductExistsInList } = useListContext();
  const isProductAlreadyInCart = isProductExistsInList('cart', id);
  function handleAddProductClick() {
    if (
      !sizeElementRef.current ||
      !colorElementRef.current ||
      !quantityElementRef.current
    )
      return;

    addProductToCart({
      id,
      quantity: quantityElementRef.current.valueAsNumber || 1,
      color: colorElementRef.current.value,
      size: sizeElementRef.current.value as Size,
    });
  }
  return (
    <div className="view-product">
      <div className="view-product-carousel">
        <CustomSlider gap={1}>
          {thumbnails.map((img, index) => (
            <img src={img} alt="product" key={`thumbnail-view-${index}`} />
          ))}
        </CustomSlider>
      </div>
      <div className="view-product-details-wrapper">
        <div className="view-product-details-content">
          <h3 className="view-product-title">{title}</h3>
          <div className="view-product-price-wrapper">
            {discountPercentage && !isOfferExpired && (
              <span
                className={`price ${
                  discountPercentage && !isOfferExpired ? 'new' : ''
                }`}
              >
                {formatCurrency(
                  discountPercentage
                    ? getPriceAfterDiscount(price, discountPercentage)
                    : price
                )}
              </span>
            )}
            <span
              className={`${
                !discountPercentage || isOfferExpired ? 'price' : 'old-price'
              }`}
            >
              {price} SR
            </span>
          </div>
          {isOfferExpired && (
            <div
              style={{
                color: 'red',
                fontWeight: 'bold',
              }}
            >
              Offer Expired
            </div>
          )}
          {size && (
            <div className="option-wrapper">
              <label htmlFor={`size-select-${selectId}`}>Size</label>
              <select id={`size-select-${selectId}`} ref={sizeElementRef}>
                {size.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </div>
          )}
          {color && (
            <div className="option-wrapper">
              <label htmlFor={`color-select-${selectId}`}>Color</label>
              <select id={`color-select-${selectId}`} ref={colorElementRef}>
                {color.map((color) => (
                  <option key={color}>{color}</option>
                ))}
              </select>
            </div>
          )}
          <div className="option-wrapper">
            <label htmlFor={`quantity-input-${selectId}`}>Quantity</label>
            <input
              type="number"
              id={`quantity-input-${selectId}`}
              min={1}
              max={100}
              defaultValue={1}
              ref={quantityElementRef}
            />
          </div>
          <button
            className="add-product-btn"
            onClick={() => handleAddProductClick()}
            disabled={isProductAlreadyInCart || !instock}
          >
            {isProductAlreadyInCart && instock && 'Product is added to cart'}
            {!isProductAlreadyInCart && instock && 'Add To Cart'}
            {!instock && 'Product is out of stock'}
          </button>
        </div>
        <Link to={`/product/${id}`} className="full-details-link">
          View Full Product Details
        </Link>
      </div>
    </div>
  );
}
export default ProductView;
