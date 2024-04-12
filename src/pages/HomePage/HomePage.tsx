import {
  BannerSection,
  CollectionSection,
  ServicesSection,
  ProductBannerSection,
  BlogsSection,
  FeaturedCollectionSection,
  SpecialProductsSection,
  BrandSection,
} from '../../components';
import PopularProductsSection from '../../components/PopularProductsSection/PopularProductsSection';

function HomePage() {
  return (
    <div>
      <BannerSection />
      <ServicesSection />
      <CollectionSection />
      {/* FIXME: fix test-item class */}

      <FeaturedCollectionSection />
      <ProductBannerSection />

      <BrandSection />
      <PopularProductsSection />
      <BlogsSection />
      <SpecialProductsSection />
    </div>
  );
}

export default HomePage;
