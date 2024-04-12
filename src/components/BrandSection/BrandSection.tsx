import { BRANDS_LIST } from '../../data/constants';
import './BrandSection.scss';
function BrandSection() {
  return (
    <section className="brands-section">
      <div className="container">
        <div className="brands-section__content">
          {BRANDS_LIST.map((brand) => (
            <div className="brands-section__brand-wrapper" key={brand.title}>
              <img
                src={brand.img}
                alt={brand.title}
                className="brands-section__brand-img"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BrandSection;
