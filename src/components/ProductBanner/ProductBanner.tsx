import { Link } from 'react-router-dom';
import './ProductBanner.scss';
type ProductBannerProps = {
  label: string;
  title: string;
  desc: string;
  img: string;
};
function ProductBanner({ label, title, desc, img }: ProductBannerProps) {
  return (
    <div className="product-banner">
      <img src={img} alt={title} className="product-banner__img" />
      <div className="product-banner__content">
        <span className="product-banner__label">{label}</span>
        <Link className="product-banner__title" to="/">
          {title}
        </Link>
        <p className="product-banner__desc">{desc}</p>
      </div>
    </div>
  );
}

export default ProductBanner;
