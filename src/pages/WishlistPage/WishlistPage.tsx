import { Trash } from 'lucide-react';
import FavoriteProduct from '../../components/FavoriteProduct/FavoriteProduct';
import useFavorite from '../../hooks/useFavorite';
import './WishlistPage.scss';

function WishlistPage() {
  const { favoriteProductsList, clearFavoriteProducts, removeFavoriteProduct } = useFavorite();
  return (
    <div className="wishlist">
      <div className="container">
        {favoriteProductsList && favoriteProductsList.length > 0 ? (
          <>
            <div className="wishlist__products-wrapper">
              {favoriteProductsList.map((product) => (
                <FavoriteProduct product={product} key={product.id} removeFavoriteProduct={removeFavoriteProduct} />
              ))}
            </div>
            <button
              className="wishlist__clear-favorite-btn"
              onClick={() => clearFavoriteProducts()}
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
      </div>
    </div>
  );
}

export default WishlistPage;
