import "./ProductsViewer.scss";
import { TProduct } from "@custom-types/product";
import ProductsViewSorter, {
  ProductsViewMode,
} from "../ProductsViewSorter/ProductsViewSorter";
import { CustomPagination } from "@components/common/ui";
import { useState } from "react";
import { Loading, RenderList } from "@components/common/utils";
import Product from "../Product/Product";
import { RequestError } from "@custom-types/shared";
import { NumberParam, useQueryParam, withDefault } from "use-query-params";

type ProductsViewerProps = {
  products: TProduct[] | undefined;
  isFetching: boolean;
  error: RequestError;
  maxPages: number | undefined;
  resultText: string;
  noResultText?: string;
  showSortBtn?: boolean;
  searchMode?: boolean;
};
const PageParam = withDefault(NumberParam, 1);
function ProductsViewer({
  showSortBtn = false,
  searchMode = false,
  products,
  resultText,
  noResultText = "No products found",
  maxPages,
  error,
  isFetching,
}: ProductsViewerProps) {
  const [productViewMode, setProductViewMode] =
    useState<ProductsViewMode>("4-columns");
  const [pageParam, setPageParam] = useQueryParam("_page", PageParam);
  function handlePageChange(page: number) {
    setPageParam(page);
  }
  // TODO
  return (
    <div className="products-viewer">
      <ProductsViewSorter
        searchMode={searchMode}
        showSortBtn={showSortBtn}
        resultText={resultText}
        currentView={productViewMode}
        onViewChange={setProductViewMode}
      />
      <ProductsGridView
        noResultText={noResultText}
        viewMode={productViewMode}
        error={error}
        isFetching={isFetching}
        products={products}
      />
      {/* REFACTOR: can move custompagincation inside productsGridView  */}
      {products && products.length > 0 && (
        <CustomPagination
          setPageHandler={handlePageChange}
          currentPage={pageParam}
          totalPages={maxPages || 1}
        />
      )}
    </div>
  );
}

type ProductsGridViewProps = {
  noResultText?: string;
  viewMode: ProductsViewMode;
  products: TProduct[] | undefined;
  isFetching: boolean;
  error: RequestError;
};

const GRIDWIDTHRECORD: Record<ProductsViewMode, string> = {
  "1-column": "1fr",
  "2-columns": "450px, 1fr",
  "3-columns": "350px, 1fr",
  "4-columns": "250px, 1fr",
};

function ProductsGridView({
  noResultText = "No products found",
  viewMode,
  error,
  isFetching,
  products,
}: ProductsGridViewProps) {
  return (
    <div
      className="products-result"
      style={{
        display: "grid",
        gap: "1rem",
        gridAutoRows: "max-content",
        gridTemplateColumns: `${
          viewMode !== "1-column"
            ? `repeat(auto-fill,  minmax(${GRIDWIDTHRECORD[viewMode]})`
            : "1fr"
        }`,
      }}
    >
      <Loading
        isFetching={isFetching}
        error={error}
        renderLoader={<p>Loading data</p>}
      >
        {products && products.length > 0 ? (
          <RenderList
            items={products}
            renderItem={(product) => (
              <div key={product.id}>
                <Product
                  product={product}
                  showDetails={viewMode === "1-column"}
                />
              </div>
            )}
          />
        ) : (
          <p>{noResultText}</p>
        )}
      </Loading>
    </div>
  );
}
export default ProductsViewer;
