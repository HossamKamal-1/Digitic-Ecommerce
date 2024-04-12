import './Product.scss';
import { Link } from 'react-router-dom';
import { Check, Eye, Heart, ShoppingBag, Shuffle } from 'lucide-react';
import { Rating } from '..';
import { formatCurrency, getPriceAfterDiscount } from '../../utils';
import { useViewProduct } from '../../hooks/useViewProduct';
import tab1Img from '../../assets/images/tab.jpg';
import tab2Img from '../../assets/images/tab1.jpg';
import { useListContext } from '../../contexts/listsContext';

export type Discount = `${number}%` | number;
export type Size = 's' | 'm' | 'l' | 'xl' | 'xxl';
export type ProductItem = {
  id: number;
  title: string;
  seller: string;
  type: string;
  thumbnails: string[];
  price: number;
  size?: Size[];
  color?: (`#${string}` | string)[];
  instock: boolean;
  rating: {
    value: number;
    count: number;
  };
  discountPercentage?: Discount | null;
  offerExpirationDate?: Date;
};
export type ProductProps = {
  product: ProductItem;
};

function Product({ product }: ProductProps) {
  const { viewProduct } = useViewProduct();
  const { isProductExistsInList, toggleListProduct } = useListContext();

  return (
    <div
      className={`product-card ${product.discountPercentage ? 'discount' : ''}`}
      data-discount={`-${product.discountPercentage}`}
    >
      <button
        className="btn-favorite product-btn"
        onClick={() => toggleListProduct('favorite', product.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Heart
          className={`icon ${
            isProductExistsInList('favorite', product.id) ? 'on' : ''
          }`}
        />
      </button>
      <div className="action-box">
        <button
          className="btn-compare product-btn"
          onClick={() => toggleListProduct('compare', product.id)}
        >
          {isProductExistsInList('compare', product.id) ? (
            <Check className="icon check" color="green" />
          ) : (
            <Shuffle className="icon" />
          )}
        </button>
        <button
          className="btn-watch product-btn"
          onClick={() => viewProduct(product)}
        >
          <Eye className="icon" />
        </button>
        <Link to={`/products/${product.id}`} className="product-link">
          <ShoppingBag className="icon" color="black" />
        </Link>
      </div>
      <Link to={`/products/${product.id}`} className="img-wrapper">
        <img src={tab1Img} alt="" />
        <img src={tab2Img} alt="" />
      </Link>
      <div className="product-details">
        <span className="seller">{product.seller}</span>
        <Link to={`/products/${product.id}`} className="product-title">
          {product.title}
        </Link>
        <Rating
          readonly={false}
          value={product.rating.value ?? 0}
          size="16px"
          spacing="0.2rem"
        />
        <div className="price-wrapper">
          {product.discountPercentage && (
            <span className="old-price">{formatCurrency(product.price)}</span>
          )}
          <span className={`price ${product.discountPercentage ? 'new' : ''}`}>
            {formatCurrency(
              product.discountPercentage
                ? getPriceAfterDiscount(
                    product.price,
                    product.discountPercentage
                  )
                : product.price
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
