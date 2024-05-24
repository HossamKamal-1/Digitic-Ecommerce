import {
  Banner,
  Blogs,
  Brand,
  Collection,
  FeaturedCollection,
  PopularProducts,
  ProductBanner,
  Services,
  SpecialProducts,
} from "@components/ecommerce/sections";

function Home() {
  return (
    <div>
      <Banner />
      <Services />
      <Collection />
      {/* FIXME: fix test-item class */}

      <FeaturedCollection />
      <ProductBanner />

      <Brand />
      <PopularProducts />
      <Blogs />
      <SpecialProducts />
    </div>
  );
}

export default Home;
