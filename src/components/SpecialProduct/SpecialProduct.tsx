import './SpecialProduct.scss';
import { ProductItem } from '../Product/Product';
import { Check, Eye, Heart, Shuffle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useViewProduct } from '../../hooks/useViewProduct';
import { RequiredBy } from '../../utils/types';
import { useState } from 'react';
import { formatCurrency, getPriceAfterDiscount } from '../../utils';
import { ProductCountDown, CustomSlider, Rating } from '..';
import { useListContext } from '../../contexts/listsContext';

export type SpecialProductItem = RequiredBy<ProductItem, 'discountPercentage'>;
type SpecialProductProps = {
  product: SpecialProductItem;
};

function SpecialProduct({ product }: SpecialProductProps) {
  const { viewProduct } = useViewProduct();
  const [isOfferExpired, setIsOfferExpired] = useState(false);
  const [selectedPreviewImgIndex, setSelectedPreviewImgIndex] = useState(0);
  const { isProductExistsInList, toggleListProduct } = useListContext();
  function handleOfferExpiration() {
    setIsOfferExpired(true);
  }
  return (
    <div className="special-product">
      {!isOfferExpired && (
        <span className="special-product__discount">
          {typeof product.discountPercentage === 'number'
            ? `-${product.discountPercentage}%`
            : `-${product.discountPercentage}`}
        </span>
      )}
      <div className="special-product__content-wrapper">
        <div className="special-product__thumbnails-wrapper">
          <div className="special-product__preview-wrapper">
            <div className="special-product__actions-wrapper">
              <button
                className="special-product__favourite-btn special-product__action-btn"
                onClick={() => toggleListProduct('favorite', product.id)}
              >
                <Heart
                  color={`${
                    isProductExistsInList('favorite', product.id)
                      ? 'red'
                      : 'black'
                  }`}
                  size={20}
                  className={`special-product__favourite-icon${
                    isProductExistsInList('favorite', product.id)
                      ? '--favourited'
                      : ''
                  } special-product__action-btn__icon`}
                />
              </button>
              <div className="special-product__actions-inner-wrapper">
                <button
                  className="special-product__compare-btn special-product__action-btn"
                  onClick={() => toggleListProduct('compare', product.id)}
                >
                  {isProductExistsInList('compare', product.id) ? (
                    <Check className="icon check" color="green" />
                  ) : (
                    <Shuffle
                      size={20}
                      className="special-product__compare-btn__icon special-product__action-btn__icon"
                    />
                  )}
                </button>
                <button
                  className="special-product__view-btn special-product__action-btn"
                  onClick={() => viewProduct(product, isOfferExpired)}
                >
                  <Eye
                    size={20}
                    className="special-product__view-btn__icon special-product__action-btn__icon"
                  />
                </button>
              </div>
            </div>
            <img
              src={product.thumbnails[selectedPreviewImgIndex]}
              alt="product"
              className="special-product__preview"
            />
          </div>
          <div className="special-product__slider-wrapper">
            <CustomSlider displayCount={2}>
              {product.thumbnails.map((thumbnail, index) => (
                <img
                  key={`thumbnail-${index}`}
                  src={thumbnail}
                  alt="product"
                  className={`special-product__thumbnail${
                    index === selectedPreviewImgIndex ? '--active' : ''
                  }`}
                  onClick={() => {
                    setSelectedPreviewImgIndex(index);
                  }}
                />
              ))}
            </CustomSlider>
          </div>
        </div>
        <div className="special-product__textual-info-wrapper">
          <span className="special-product__company-name">
            {product.seller}
          </span>
          <Link to="/" className="special-product__title">
            {product.title}
          </Link>
          <Rating value={1} size="1rem" spacing="0px" />
          <div className="special-product__price-wrapper">
            <span
              className={`special-product__price special-product__price${
                isOfferExpired ? '' : '--old'
              }`}
            >
              {formatCurrency(product.price)}
            </span>
            {!isOfferExpired && product.discountPercentage && (
              <span className="special-product__price--new">
                {formatCurrency(
                  getPriceAfterDiscount(
                    product.price,
                    product.discountPercentage
                  )
                )}
              </span>
            )}
          </div>
          <ProductCountDown
            productExpirationDate={product.offerExpirationDate}
            onOfferExpire={handleOfferExpiration}
          />
          <Link
            to={`/products/${product.id}`}
            className="special-product__product-link"
          >
            Option
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SpecialProduct;
