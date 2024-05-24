// Styles
import "./Wishlist.scss";
// Icons
import { Trash } from "lucide-react";
// Hooks
import useWishlist from "@hooks/use-wishlist";
// Components
import { Loading, RenderList } from "@components/common/utils";
import { FavoriteProduct } from "@components/ecommerce/ui";

function Wishlist() {
  const {
    wishlistProducts,
    isLoading,
    error,
    emptyWishlist,
    removeWishlistProduct,
  } = useWishlist();
  return (
    <div className="wishlist">
      <div className="container">
        <Loading
          isFetching={isLoading}
          renderLoader={<div>Loading favorite products</div>}
          error={error}
        >
          {wishlistProducts && wishlistProducts.length > 0 ? (
            <>
              <div className="wishlist__products-wrapper">
                <RenderList
                  items={wishlistProducts}
                  renderItem={(product) => (
                    <FavoriteProduct
                      key={product.id}
                      product={product}
                      removeFavoriteProduct={removeWishlistProduct}
                    />
                  )}
                />
              </div>
              <button
                className="wishlist__clear-favorite-btn"
                onClick={() => emptyWishlist()}
              >
                <Trash />
                Clear All
              </button>
            </>
          ) : (
            <p className="wishlist__empty">
              There is no favorite products, continue shopping.
            </p>
          )}
        </Loading>
      </div>
    </div>
  );
}

export default Wishlist;
