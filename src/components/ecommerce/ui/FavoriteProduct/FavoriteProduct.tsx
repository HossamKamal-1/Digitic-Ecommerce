import "./FavoriteProduct.scss";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency, getProductFinalPrice } from "@utils";
import type { TProduct } from "@custom-types/product";
import { memo } from "react";
type FavoriteProductProps = {
  removeFavoriteProduct: (productId: number) => void;
  product: TProduct;
};
const FavoriteProduct = memo(
  ({ product, removeFavoriteProduct }: FavoriteProductProps) => {
    return (
      <div className="favorite-product">
        <button
          className="favorite-product__remove-btn"
          onClick={() => removeFavoriteProduct(product.id)}
        >
          <X className="favorite-product__remove-btn-icon" size={20} />
        </button>
        <div className="favorite-product__img-wrapper">
          <img
            src={product.thumbnails[0]}
            className="favorite-product__img"
            alt={product.title}
          />
        </div>
        <div className="favorite-product__body-wrapper">
          <Link
            to={`/products/${product.id}`}
            className="favorite-product__title"
          >
            {product.title}
          </Link>
          <div className="favorite-product__price-wrapper">
            <span
              className={`favorite-product__price  ${
                product.discountPercentage && "favorite-product__price--old"
              } `}
            >
              {formatCurrency(product.price)}
            </span>
            {product.discountPercentage && (
              <span className="favorite-product__price favorite-product__price--new">
                {formatCurrency(
                  getProductFinalPrice(
                    product.price,
                    product.discountPercentage
                  )
                )}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default FavoriteProduct;
