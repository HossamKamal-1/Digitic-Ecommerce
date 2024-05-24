// Styles
import "./ViewProductModal.scss";
// Utils
import { getProductFinalPrice, formatCurrency } from "@utils";
import { ElementRef, useId, useRef, useState } from "react";
// Components
import { Link } from "react-router-dom";
import { CustomSlider, BaseModal } from "@components/common/ui";
// Hooks
import { useCartActions, useIsProductInCart } from "@hooks/use-cart";
import useModal from "@hooks/useModal";
// Types
import type { TProduct } from "@custom-types/product";
import type { BaseModalPropsWithoutChildren } from "../../BaseModal/BaseModal";
import { RenderList } from "@components/common/utils";
type ViewProductModalProps = {
  product: TProduct;
  isOfferExpired?: boolean;
} & BaseModalPropsWithoutChildren;

function ViewProductModal({
  product,
  isOfferExpired = false,
  isOpen,
  onClose,
}: ViewProductModalProps) {
  // TODO: remove Test Modal Later
  const { addItemToCart } = useCartActions();
  const isInCart = useIsProductInCart(product.id);
  const { onOpen: openTestModal } = useModal("TestModal");
  const sizeElementRef = useRef<ElementRef<"select">>(null);
  const colorElementRef = useRef<ElementRef<"select">>(null);
  const selectId = useId();
  const [productQty, setProductQty] = useState(1);
  console.log("from ViewProductModal", { product: product, isOfferExpired });
  // TODO: refactor css using BEM
  console.log({ isInCart });
  function handleAddProductClick() {
    if (!sizeElementRef.current || !colorElementRef.current) return;

    addItemToCart({
      id: product.id,
      amount: productQty,
      selectedColor: colorElementRef.current.value,
      selectedSize: sizeElementRef.current.value,
    });
    // addProductToCart({
    //   id,
    //   quantity: quantityElementRef.current.valueAsNumber || 1,
    //   color: colorElementRef.current.value,
    //   size: sizeElementRef.current.value,
    // });
  }

  function handleQuantityChange(qty: number) {
    if (qty > product.max || qty < 1 || Number.isNaN(qty)) return;
    setProductQty(qty);
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className="view-product">
        <div className="view-product-carousel">
          <CustomSlider gap={1}>
            <RenderList
              items={product.thumbnails}
              renderItem={(imgUrl, index) => (
                <img
                  src={imgUrl}
                  alt="product"
                  key={`thumbnail-view-${index}`}
                />
              )}
            />
          </CustomSlider>
        </div>
        <div className="view-product-details-wrapper">
          <div className="view-product-details-content">
            <h3 className="view-product-title">{product.title}</h3>
            <div className="view-product-price-wrapper">
              {product.discountPercentage && !isOfferExpired && (
                <span
                  className={`price ${
                    product.discountPercentage && !isOfferExpired ? "new" : ""
                  }`}
                >
                  {formatCurrency(
                    getProductFinalPrice(
                      product.price,
                      product.discountPercentage
                    )
                  )}
                </span>
              )}
              <span
                className={`${
                  !product.discountPercentage || isOfferExpired
                    ? "price"
                    : "old-price"
                }`}
              >
                {product.price} SR
              </span>
            </div>
            {isOfferExpired && (
              <div
                style={{
                  color: "red",
                  fontWeight: "bold",
                }}
              >
                Offer Expired
              </div>
            )}
            {product.size && (
              <div className="option-wrapper">
                <label htmlFor={`size-select-${selectId}`}>Size</label>
                <select id={`size-select-${selectId}`} ref={sizeElementRef}>
                  {product.size.map((size) => (
                    <option key={size}>{size}</option>
                  ))}
                </select>
              </div>
            )}
            {product.color && (
              <div className="option-wrapper">
                <label htmlFor={`color-select-${selectId}`}>Color</label>
                <select id={`color-select-${selectId}`} ref={colorElementRef}>
                  {product.color.map((color) => (
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
                value={productQty}
                onChange={(e) => handleQuantityChange(e.target.valueAsNumber)}
              />
            </div>
            <button
              className="add-product-btn"
              onClick={() => handleAddProductClick()}
              disabled={!product.instock || isInCart}
            >
              {isInCart && product.instock && "Product is added to cart"}
              {!isInCart && product.instock && "Add To Cart"}
              {!product.instock && "Product is out of stock"}
            </button>
          </div>
          {/* FIXME: this link is not working because Link must be used inside react router provider  */}
          <button onClick={() => openTestModal({})}>openTestModal</button>
          <Link to={`/products/${product.id}`} className="full-details-link">
            View Full Product Details
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}
export default ViewProductModal;
