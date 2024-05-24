import "./Compare.scss";
import { Trash } from "lucide-react";
import { CompareProduct } from "@components/ecommerce/ui";
import useComparelist from "@hooks/use-comparelist";
import { Loading, RenderList } from "@components/common/utils";
function Compare() {
  const {
    comparelistProducts,
    isLoading,
    error,
    emptyComparelist,
    removeComparelistProduct,
  } = useComparelist();

  return (
    <main className="compare">
      <div className="container">
        <Loading
          isFetching={isLoading}
          error={error}
          renderLoader={<p>Loading compare list products</p>}
        >
          <div className="compare__content-wrapper">
            <RenderList
              items={comparelistProducts}
              renderItem={(product) => (
                <CompareProduct
                  key={product.id}
                  product={product}
                  removeCompareProduct={removeComparelistProduct}
                />
              )}
            />
          </div>
          {comparelistProducts && comparelistProducts.length > 0 ? (
            <div className="compare__actions-wrapper">
              <button
                className="compare__clear-all-btn"
                onClick={() => emptyComparelist()}
              >
                <Trash />
                Clear all
              </button>
            </div>
          ) : (
            <p className="compare__no-data">
              There is no products to compare between, continue shopping.
            </p>
          )}
        </Loading>
      </div>
    </main>
  );
}

export default Compare;
