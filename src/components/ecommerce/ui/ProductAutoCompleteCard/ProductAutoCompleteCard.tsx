import "./ProductAutoCompleteCard.scss";
import { formatCurrency, getProductFinalPrice } from "@utils";
import type { TProduct } from "@custom-types/product";

type ProductAutoCompleteCardProps = {
  product: TProduct;
};

function ProductAutoCompleteCard({ product }: ProductAutoCompleteCardProps) {
  return (
    <div className="product-autocomplete-card">
      <div className="product-autocomplete-card__image-wrapper">
        <img
          src={product.thumbnails[0]}
          alt={product.title}
          className="product-autocomplete-card__img"
        />
      </div>
      <div className="product-autocomplete-card__desc-wrapper">
        <p>{product.title}</p>
        <div className="product-autocomplete-card__price-wrapper">
          <span
            className={`product-autocomplete-card__price${
              product.discountPercentage ? "--old" : ""
            }`}
          >
            {formatCurrency(product.price)}
          </span>
          {product.discountPercentage && (
            <span className="product-autocomplete-card__price--new">
              {formatCurrency(
                getProductFinalPrice(product.price, product.discountPercentage)
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductAutoCompleteCard;
