import './CategoryBanner.scss';
import { Link } from 'react-router-dom';
type CategoryBannerProps = {
  heading: string;
  title: string;
  desc: string;
  img: string;
  offerUrl?: string;
};
function CategoryBanner({ heading, title, desc, img, offerUrl }: CategoryBannerProps) {
  return (
    <div className="category-banner">
      <div className="category-banner-content">
        <h4 className="heading">{heading}</h4>
        <h3 className="title">{title}</h3>
        <p className="desc"> {desc}</p>
        {offerUrl && (
          <Link to={offerUrl} className="offer-link">
            BUY NOW
          </Link>
        )}
      </div>
      <img src={img} alt={title} />
    </div>
  );
}

export default CategoryBanner;
