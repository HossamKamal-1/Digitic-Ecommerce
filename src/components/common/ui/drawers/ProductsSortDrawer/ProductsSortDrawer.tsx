import "./ProductsSortDrawer.scss";
import Drawer, { DrawerPropsWithoutChildren } from "../../Drawer/Drawer";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import {
  AvailibilityFilter,
  ColorFilter,
  SizeFilter,
  SortBySelectFilter,
} from "@components/ecommerce/ui/filters";
import { FC, useState } from "react";
import { useQueryParam, useQueryParams } from "use-query-params";
import { ProductsFilterParams } from "@components/common/utils/QueryParamsManager/searchParams";

type ProductsSortDrawerProps = DrawerPropsWithoutChildren & {
  resultText: string;
  searchMode?: boolean;
};
type FilterType = "availibility" | "color" | "size";
const filtersList: (FilterType | "sort by")[] = [
  "availibility",
  "color",
  "size",
  "sort by",
];
function ProductsSortDrawer({
  direction = "left",
  isOpen,
  onClose,
  resultText,
  searchMode,
}: ProductsSortDrawerProps) {
  const [selectedFilterType, setSelectedFilterType] = useState<FilterType | "">(
    ""
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setQueryParams] = useQueryParams<ProductsFilterParams>();
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const onFilterDrawerClose = () => {
    setIsFilterDrawerOpen(false);
    setTimeout(() => {
      setSelectedFilterType("");
    }, 300);
  };
  const openFilterDrawer = (filterType: FilterType) => {
    setTimeout(() => {
      setIsFilterDrawerOpen(true);
    }, 0);
    setSelectedFilterType(filterType);
  };
  const clearSearchParams = () => {
    setQueryParams({
      size: undefined,
      color: undefined,
      _sort: undefined,
      _order: undefined,
      instock: undefined,
    });
  };
  return (
    <Drawer
      direction={direction}
      isOpen={isOpen}
      onClose={onClose}
      className="products-sort-drawer"
    >
      <div className="products-sort-drawer__header">
        <button
          className="products-sort-drawer__close-btn"
          onClick={() => onClose()}
        >
          <X size={35} />
        </button>
        <p className="products-sort-drawer__header-text">
          Filter And Sort
          <br /> {resultText}
        </p>
      </div>
      <div className="products-sort-drawer__content">
        <ul className="products-sort-drawer__filters-list">
          {filtersList.map((filterType) => (
            <li
              className="products-sort-drawer__filters-list-item"
              key={filterType}
            >
              {filterType === "sort by" ? (
                <div className="products-sort-drawer__sort-by-wrapper">
                  <span className="products-sort-drawer__filters-list-item-label">
                    Sort By
                  </span>
                  <SortBySelectFilter searchMode={searchMode} />
                </div>
              ) : (
                <button
                  className="products-sort-drawer__sort-btn"
                  onClick={() => openFilterDrawer(filterType)}
                >
                  <span className="products-sort-drawer__filters-list-item-label">
                    {filterType}
                  </span>
                  <ArrowRight />
                </button>
              )}
            </li>
          ))}
        </ul>
        {selectedFilterType && (
          <ProductSingleFilterDrawer
            open={isFilterDrawerOpen}
            onClose={onFilterDrawerClose}
            type={selectedFilterType}
          />
        )}
        <ProductsSortDrawerFooter
          onClear={clearSearchParams}
          onApply={onClose}
        />
      </div>
    </Drawer>
  );
}
type ProductsSortDrawerFooterProps = {
  onApply: () => void;
  onClear: () => void;
};
function ProductsSortDrawerFooter({
  onApply,
  onClear,
}: ProductsSortDrawerFooterProps) {
  return (
    <div className="products-sort-drawer__footer">
      <button
        className="products-sort-drawer__action-btn  products-sort-drawer__action-btn--clear"
        onClick={() => onClear()}
      >
        Clear
      </button>
      <button
        className="products-sort-drawer__action-btn products-sort-drawer__action-btn--apply"
        onClick={() => onApply()}
      >
        Apply
      </button>
    </div>
  );
}
type ProductSingleFilterDrawerProps = {
  type: FilterType;
  open: boolean;
  onClose: () => void;
};
const FILTERS: Record<
  FilterType,
  {
    searchParamName: Exclude<
      keyof ProductsFilterParams,
      "_sort" | "_order" | "_page" | "q"
    >;
    Component: FC;
  }
> = {
  availibility: {
    searchParamName: "instock",
    Component: AvailibilityFilter,
  },
  color: {
    searchParamName: "color",
    Component: ColorFilter,
  },
  size: {
    searchParamName: "size",
    Component: SizeFilter,
  },
};
function ProductSingleFilterDrawer({
  type,
  open,
  onClose,
}: ProductSingleFilterDrawerProps) {
  const SelectedFilter = FILTERS[type].Component;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setFilterQueryParam] = useQueryParam(FILTERS[type].searchParamName);
  const clearFilterParam = () => {
    setFilterQueryParam(undefined);
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        right: open ? "0" : "-100%",
        width: "100%",
        transition: "0.3s",
        background: "white",
        padding: "25px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={() => onClose()}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          backgroundColor: "transparent",
          border: "none",
          padding: "0",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        <ArrowLeft />
        <span
          style={{
            textTransform: "capitalize",
          }}
        >
          {type}
        </span>
      </button>
      <div
        style={{
          flex: "1",
        }}
      >
        <SelectedFilter />
      </div>
      <ProductsSortDrawerFooter onApply={onClose} onClear={clearFilterParam} />
    </div>
  );
}
export default ProductsSortDrawer;
