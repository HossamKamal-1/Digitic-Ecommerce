import './FavoriteProduct.scss';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProductItem } from '../Product/Product';
import { formatCurrency, getPriceAfterDiscount } from '../../utils';
type FavoriteProductProps = {
  removeFavoriteProduct: (productId: number) => void; 
  product: ProductItem;
};
function FavoriteProduct({ product,removeFavoriteProduct }: FavoriteProductProps) {
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
              product.discountPercentage && 'favorite-product__price--old'
            } `}
          >
            {formatCurrency(product.price)}
          </span>
          {product.discountPercentage && (
            <span className="favorite-product__price favorite-product__price--new">
              {formatCurrency(
                getPriceAfterDiscount(product.price, product.discountPercentage)
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default FavoriteProduct;
