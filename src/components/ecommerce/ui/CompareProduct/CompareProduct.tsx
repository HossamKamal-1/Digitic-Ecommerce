import "./CompareProduct.scss";
import { Link } from "react-router-dom";
import { formatCurrency, getProductFinalPrice } from "@utils";
import { X } from "lucide-react";
import type { TProduct } from "@custom-types/product";
type CompareProductProps = {
  removeCompareProduct: (productId: number) => void;
  product: TProduct;
};
// FIXME: fix out of stock issue here
function CompareProduct({
  product,
  removeCompareProduct,
}: CompareProductProps) {
  const productPriceFormatted = formatCurrency(product.price);
  return (
    <div className="compare-product">
      <button
        className="compare-product__remove-btn"
        onClick={() => removeCompareProduct(product.id)}
      >
        <X />
      </button>
      <div className="compare-product__img-wrapper">
        <img
          src={product.thumbnails[0]}
          alt={product.title}
          className="compare-product__img"
        />
      </div>
      <div className="compare-product__body-wrapper">
        <Link to={`/products/${product.id}`} className="compare-product__title">
          {product.title}
        </Link>
        <div className="compare-product__price-wrapper">
          <span
            className={`compare-product__price${
              product.discountPercentage ? "--old" : ""
            }`}
          >
            {productPriceFormatted}
          </span>
          {product.discountPercentage && (
            <span className="compare-product__price--new">
              {formatCurrency(
                getProductFinalPrice(product.price, product.discountPercentage)
              )}
            </span>
          )}
        </div>
        <ul className="compare-product__product-info-list">
          <li className="compare-product__product-info-item">
            <span className="compare-product__product-info-item-label">
              Brand:
            </span>
            <span className="compare-product__product-info-item-value">
              {product.seller}
            </span>
          </li>
          <li className="compare-product__product-info-item">
            <span className="compare-product__product-info-item-label">
              Type:
            </span>
            <span className="compare-product__product-info-item-value">
              {product.type}
            </span>
          </li>
          <li className="compare-product__product-info-item">
            <span className="compare-product__product-info-item-label">
              SKU:
            </span>
            <span className="compare-product__product-info-item-value">
              SK032
            </span>
          </li>
          <li className="compare-product__product-info-item">
            <span className="compare-product__product-info-item-label">
              Availability:
            </span>
            <span className="compare-product__product-info-item-value">
              {product.instock ? "In Stock" : "Out Of Stock"}
            </span>
          </li>
          {product.color && (
            <li className="compare-product__product-info-item">
              <span className="compare-product__product-info-item-label">
                Color:
              </span>
              <div className="compare-product__product-info-item__color-wrapper">
                {product.color.map((color) => (
                  <span
                    className="compare-product__product-info-item__color"
                    style={{
                      backgroundColor: color,
                    }}
                    key={color}
                  />
                ))}
              </div>
            </li>
          )}
          {product.size && (
            <li className="compare-product__product-info-item">
              <span className="compare-product__product-info-item-label">
                Size:
              </span>
              <div className="compare-product__product-info-item__size-wrapper">
                {product.size.map((size) => (
                  <span
                    className="compare-product__product-info-item__size compare-product__product-info-item-value"
                    key={size}
                  >
                    {size}
                  </span>
                ))}
              </div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default CompareProduct;
