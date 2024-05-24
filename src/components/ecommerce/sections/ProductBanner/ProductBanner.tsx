import "./ProductBanner.scss";
import productBanner1 from "@assets/images/subbanner-1.webp";
import productBanner2 from "@assets/images/subbanner-2.webp";
import productBanner3 from "@assets/images/subbanner-3.webp";
import productBanner4 from "@assets/images/subbanner-4.webp";
import ProductBannerCard from "@components/ecommerce/ui/ProductBannerCard/ProductBannerCard";
const PRODUCT_BANNERS = [
  {
    label: "big screen",
    title: "Smart Watch Series 7",
    desc: "From $399 or $16.62/mo. for 24 mo.*",
    img: productBanner3,
  },
  {
    label: "big screen",
    title: "Smart Watch Series 5",
    desc: "From $399 or $16.62/mo. for 24 mo.*",
    img: productBanner2,
  },
  {
    label: "big screen",
    title: "Smart Watch Series 3",
    desc: "From $399 or $16.62/mo. for 24 mo.*",
    img: productBanner1,
  },
  {
    label: "big screen",
    title: "Smart Watch Series 2",
    desc: "From $399 or $16.62/mo. for 24 mo.*",
    img: productBanner4,
  },
];
function ProductBanner() {
  // TODO: fetch product banner data here
  return (
    <section className="product-banner-section">
      <div className="container">
        <div className="content">
          {PRODUCT_BANNERS.map((productBanner) => (
            <ProductBannerCard key={productBanner.title} {...productBanner} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductBanner;
