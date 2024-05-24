import "./Products.scss";
import { useParams } from "react-router-dom";
import { ProductsSidebar, ProductsViewer } from "@components/ecommerce/ui";
import useMediaQuery from "@hooks/useMediaQuery";
import queryString from "query-string";
import { useGetProductsQuery } from "@store/features/products/productsSlice";
import useProductsQueryParams from "@hooks/useProductsQueryParams";

function Products() {
  const { catPrefix } = useParams();
  const searchParams = useProductsQueryParams();
  console.log("from products", searchParams);
  const stringifiedFilters = queryString.stringify({
    ...searchParams,
    // q is undefined to ignore it from the stringification process because no need for it
    q: undefined,
    category: catPrefix,
    _limit: 12,
  });
  console.log("t", stringifiedFilters);
  const {
    data: products,
    isFetching,
    error,
  } = useGetProductsQuery(stringifiedFilters);
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  return (
    <main className="products-page">
      <div className="container">
        <div className="products-page__inner-wrapper">
          {isLargeScreen && (
            <div className="products-page__filters-wrapper">
              <ProductsSidebar />
            </div>
          )}

          <div className="products-page__content-wrapper">
            {/* TODO: change max pages to be from the api */}
            {/* TODO: make result text dynamic*/}
            <ProductsViewer
              showSortBtn={!isLargeScreen}
              resultText="50 Products"
              products={products}
              maxPages={5}
              error={error}
              isFetching={isFetching}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Products;
