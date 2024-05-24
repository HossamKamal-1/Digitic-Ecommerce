import { BRANDS_LIST } from "@data/constants";
import "./Brand.scss";
import { RenderList } from "@components/common/utils";
function Brand() {
  return (
    <section className="brands-section">
      <div className="container">
        <div className="brands-section__content">
          <RenderList
            items={BRANDS_LIST}
            renderItem={(brand) => (
              <div className="brands-section__brand-wrapper" key={brand.title}>
                <img
                  src={brand.img}
                  alt={brand.title}
                  className="brands-section__brand-img"
                />
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default Brand;
