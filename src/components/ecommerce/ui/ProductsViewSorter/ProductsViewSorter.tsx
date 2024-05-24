// Styles
import "./ProductsViewSorter.scss";
// Icons
import { LucideIcon, Menu, Tally2, Tally3, Tally4 } from "lucide-react";
// Types
// Components
import { RenderList } from "@components/common/utils";
import useDrawer from "@hooks/useDrawer";
import { SortBySelectFilter } from "../filters";

export type ProductsViewMode =
  | "4-columns"
  | "3-columns"
  | "2-columns"
  | "1-column";

const PRODUCTS_VISUALS_LIST: { Icon: LucideIcon; view: ProductsViewMode }[] = [
  {
    Icon: Tally4,
    view: "4-columns",
  },
  {
    Icon: Tally3,
    view: "3-columns",
  },
  {
    Icon: Tally2,
    view: "2-columns",
  },
  {
    Icon: Menu,
    view: "1-column",
  },
];

type ProductsViewSorterProps = {
  searchMode?: boolean;
  resultText: string;
  showSortBtn?: boolean;
  currentView: ProductsViewMode;
  onViewChange: (view: ProductsViewMode) => void;
};
function ProductsViewSorter({
  searchMode = false,
  showSortBtn = false,
  resultText,
  currentView,
  onViewChange,
}: ProductsViewSorterProps) {
  const { onOpen: openProductsSortDrawer } = useDrawer("ProductsSortDrawer");

  return (
    <div className="products-sorter">
      {showSortBtn ? (
        <button
          className="products-sorter__sort-btn"
          onClick={() =>
            openProductsSortDrawer({
              resultText,
              searchMode,
            })
          }
        >
          Filter And Sort
        </button>
      ) : (
        <div className="products-sorter__sort-by-wrapper">
          <span className="products-sorter__sort-by-label">Sort By:</span>
          <SortBySelectFilter searchMode={searchMode} />
        </div>
      )}

      <div className="products-sorter__change-view-controller">
        <span className="products-sorter__sorted-products-count">
          {resultText}
        </span>
        <div className="products-sorter__change-view-buttons-wrapper">
          <RenderList
            items={PRODUCTS_VISUALS_LIST}
            renderItem={({ view, Icon }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`products-sorter__change-view-btn  ${
                  currentView === view
                    ? "products-sorter__change-view-btn--active"
                    : ""
                } `}
              >
                <Icon className="products-sorter__visual-sort-icon" />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductsViewSorter;
