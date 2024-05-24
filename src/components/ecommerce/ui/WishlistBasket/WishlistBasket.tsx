import { useAppSelector } from "@store/hooks";
import "./WishlistBasket.scss";
import { Heart } from "lucide-react";

function WishlistBasket() {
  const totalWishlistItemsCount = useAppSelector(
    (state) => state.wishlist.items.length
  );
  return (
    <div className="wishlist-basket">
      <div className="wishlist-basket__icon-wrapper">
        {totalWishlistItemsCount > 0 && (
          <span className="wishlist-basket__count">
            {totalWishlistItemsCount}
          </span>
        )}
        <Heart className="wishlist-basket__icon" />
      </div>
      <div className="wishlist-basket__text-wrapper">
        Favourite
        <br />
        Wishlist
      </div>
    </div>
  );
}

export default WishlistBasket;
