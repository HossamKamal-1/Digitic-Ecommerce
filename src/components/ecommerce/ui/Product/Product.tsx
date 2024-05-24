// Styles
import "./Product.scss";
// Icons
import { Check, Eye, Heart, ShoppingBag, Shuffle } from "lucide-react";
// Components
import Rating from "@components/common/ui/Rating/Rating";
import { Link } from "react-router-dom";
// Hooks
import useModal from "@hooks/useModal";
// Utils
import { formatCurrency, getProductFinalPrice } from "@utils";
// Hooks
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

type ProductProps = {
  product: TProduct;
  showDetails?: boolean;
};

function Product({ product, showDetails = false }: ProductProps) {
  const { onOpen: openViewProductModal } = useModal("ViewProductModal");
  const { toggleWishlistProduct } = useWishlistActions();
  const { toggleComparelistProduct } = useComparelistActions();
  const isInWishlist = useIsProductInWishlist(product.id);
  const isInComparelist = useIsProductInComparelist(product.id);
  function viewProduct() {
    openViewProductModal({
      product,
    });
  }
  return (
    <div
      className={`product-card ${product.discountPercentage ? "discount" : ""}`}
      data-discount={`${
        product.discountPercentage
          ? `-${product.discountPercentage}%`
          : product.discountPercentage
      }`}
      style={{
        display: "flex",
        flexDirection: showDetails ? "row" : "column",
        overflow: "hidden",
      }}
    >
      <div className="product-card__head">
        <div className="product-card__head-content">
          <button
            className="btn-favorite product-btn"
            onClick={() => toggleWishlistProduct(product.id)}
            style={{
              cursor: "pointer",
            }}
          >
            <Heart className={`icon ${isInWishlist ? "on" : ""}`} />
          </button>
          <div className="action-box">
            <button
              className="btn-compare product-btn"
              onClick={() => toggleComparelistProduct(product.id)}
            >
              {isInComparelist ? (
                <Check className="icon check" color="green" />
              ) : (
                <Shuffle className="icon" />
              )}
            </button>
            <button
              className="btn-watch product-btn"
              onClick={() => viewProduct()}
            >
              <Eye className="icon" />
            </button>
            <Link to={`/products/${product.slug}`} className="product-link">
              <ShoppingBag className="icon" color="black" />
            </Link>
          </div>
          <Link to={`/products/${product.slug}`} className="img-wrapper">
            <img src={product.thumbnails[0]} alt="" />
            <img src={product.thumbnails[1]} alt="" />
          </Link>
        </div>
      </div>
      <div className="product-details">
        <span className="seller">{product.seller}</span>
        <Link to={`/products/${product.slug}`} className="product-title">
          {product.title}
        </Link>
        <Rating value={product.rating.value} size="16px" spacing="0.2rem" />
        {showDetails && <p className="product-desc">{product.description}</p>}
        <div className="price-wrapper">
          {product.discountPercentage && (
            <span className="old-price">{formatCurrency(product.price)}</span>
          )}
          <span className={`price ${product.discountPercentage ? "new" : ""}`}>
            {formatCurrency(
              getProductFinalPrice(product.price, product.discountPercentage)
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
