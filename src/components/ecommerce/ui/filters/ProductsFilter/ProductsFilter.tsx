import "./ProductsFilter.scss";
import AvailibilityFilter from "../AvailibilityFilter/AvailibilityFilter";
import ColorFilter from "../ColorFilter/ColorFilter";
import SizeFilter from "../SizeFilter/SizeFilter";
import { CardLayout } from "@components/common/ui";
import { FC } from "react";

const FILTERS: { title: string; Component: FC }[] = [
  { title: "Availibility", Component: AvailibilityFilter },
  {
    title: "Colors",
    Component: ColorFilter,
  },
  { title: "Size", Component: SizeFilter },
];
function ProductsFilter() {
  return (
    <CardLayout className="products-filter-box" title="Filter By">
      <div className="products-filter-box__content">
        {FILTERS.map(({ title, Component }) => (
          <div key={title}>
            <h5
              style={{
                marginBottom: "10px",
                fontSize: "15px",
              }}
            >
              {title}
            </h5>
            <Component />
          </div>
        ))}
      </div>
    </CardLayout>
  );
}
export default ProductsFilter;
