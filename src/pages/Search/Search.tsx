import "./Search.scss";
import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { ProductsViewer } from "@components/ecommerce/ui";
import Searchbar from "@components/layout/Searchbar/Searchbar";
import queryString from "query-string";
import useProductsQueryParams from "@hooks/useProductsQueryParams";
function Search() {
  const searchParams = useProductsQueryParams();
  const stringifiedFilters = queryString.stringify({
    ...searchParams,
    _limit: 12,
  });
  const {
    data: searchedProducts,
    isFetching,
    error,
  } = useGetProductsQuery(stringifiedFilters, { skip: !searchParams.q });

  return (
    <main className="search-page">
      <div className="container">
        <div className="search-page__content">
          <h2 className="search-page__heading">Search Product Here..</h2>
          <div className="search-page__searchbar-wrapper">
            <Searchbar
              buttonStyles={{
                backgroundColor: "green",
                color: "white",
              }}
            />
            {searchedProducts && searchedProducts.length === 0 && (
              <p className="search-page__no-result-text">
                Couldnt found results for {searchParams.q}
              </p>
            )}
          </div>

          {searchedProducts &&
            searchedProducts.length !== 0 &&
            searchParams.q && (
              <ProductsViewer
                searchMode
                showSortBtn
                maxPages={2}
                products={searchedProducts}
                isFetching={isFetching}
                error={error}
                resultText={`results search for "${searchParams.q}"`}
              />
            )}
        </div>
      </div>
    </main>
  );
}
export default Search;
