// Styles
import "./SpecialProduct.scss";
// Icons
import { Check, Eye, Heart, Shuffle } from "lucide-react";
// Utils
import { formatCurrency, getProductFinalPrice } from "@utils";
// Components
import { CustomSlider, Rating } from "@components/common/ui";
import ProductCountDown from "../ProductCountDown/ProductCountDown";
import { Link } from "react-router-dom";
// Hooks
import { memo, useState } from "react";
import useModal from "@hooks/useModal";
import {
  useIsProductInWishlist,
  useWishlistActions,
} from "@hooks/use-wishlist";
// Types
import type { TProduct } from "@custom-types/product";
import {
  useComparelistActions,
  useIsProductInComparelist,
} from "@hooks/use-comparelist";

type SpecialProductProps = {
  product: TProduct;
};

const SpecialProduct = memo(({ product }: SpecialProductProps) => {
  const [isOfferExpired, setIsOfferExpired] = useState(false);
  const [selectedPreviewImgIndex, setSelectedPreviewImgIndex] = useState(0);
  const { onOpen: openViewProductModal } = useModal("ViewProductModal");
  const { toggleWishlistProduct } = useWishlistActions();
  const isInWishlist = useIsProductInWishlist(product.id);
  const { toggleComparelistProduct } = useComparelistActions();
  const isInComparelist = useIsProductInComparelist(product.id);
  function handleOfferExpiration() {
    setIsOfferExpired(true);
  }
  function viewProduct() {
    console.log({ product, isOfferExpired });
    openViewProductModal({
      isOfferExpired,
      product,
    });
  }
  return (
    <div className="special-product">
      {!isOfferExpired && (
        <span className="special-product__discount">
          -{product?.discountPercentage}%
        </span>
      )}
      <div className="special-product__content-wrapper">
        <div className="special-product__thumbnails-wrapper">
          <div className="special-product__preview-wrapper">
            <div className="special-product__actions-wrapper">
              <button
                className="special-product__favourite-btn special-product__action-btn"
                onClick={() => toggleWishlistProduct(product.id)}
              >
                <Heart
                  color={`${isInWishlist ? "red" : "black"}`}
                  size={20}
                  className={`special-product__favourite-icon${
                    isInWishlist ? "--favourited" : ""
                  } special-product__action-btn__icon`}
                />
              </button>
              <div className="special-product__actions-inner-wrapper">
                <button
                  className="special-product__compare-btn special-product__action-btn"
                  onClick={() => toggleComparelistProduct(product.id)}
                >
                  {isInComparelist ? (
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
                  onClick={() => viewProduct()}
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
                    index === selectedPreviewImgIndex ? "--active" : ""
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
          <Link
            to={`/products/${product.slug}`}
            className="special-product__title"
          >
            {product.title}
          </Link>
          <Rating value={product.rating.value} size="1rem" spacing="0px" />
          <div className="special-product__price-wrapper">
            <span
              className={`special-product__price special-product__price${
                isOfferExpired ? "" : "--old"
              }`}
            >
              {formatCurrency(product.price)}
            </span>
            {!isOfferExpired && product.discountPercentage && (
              <span className="special-product__price--new">
                {formatCurrency(
                  getProductFinalPrice(
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
            to={`/products/${product.slug}`}
            className="special-product__product-link"
          >
            Option
          </Link>
        </div>
      </div>
    </div>
  );
});

export default SpecialProduct;
