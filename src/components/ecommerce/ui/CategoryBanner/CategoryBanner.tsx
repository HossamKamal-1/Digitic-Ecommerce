import "./CategoryBanner.scss";
import { Link } from "react-router-dom";
import type { TCatBanner } from "@custom-types/category-banner";
type CategoryBannerProps = {
  banner: TCatBanner;
};
function CategoryBanner({ banner }: CategoryBannerProps) {
  return (
    <div className="category-banner">
      <div className="category-banner-content">
        <h4 className="heading">{banner.heading}</h4>
        <h3 className="title">{banner.title}</h3>
        <p className="desc"> {banner.description}</p>
        {banner.offerSlug && (
          <Link to={`/products/${banner.offerSlug}`} className="offer-link">
            BUY NOW
          </Link>
        )}
      </div>
      <img src={banner.img} alt={banner.title} />
    </div>
  );
}

export default CategoryBanner;
