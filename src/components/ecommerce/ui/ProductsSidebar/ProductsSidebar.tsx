import "./ProductsSidebar.scss";
import { ProductTagFilter, ProductsFilter } from "../filters";
import RandomProductsCard from "../RandomProductsCard/RandomProductsCard";
import { NavigationBox } from "@components/layout";

function ProductsSidebar() {
  return (
    <div className="products-sidebar">
      <NavigationBox />
      <ProductsFilter  />
      <ProductTagFilter />
      <RandomProductsCard />
    </div>
  );
}

export default ProductsSidebar;
