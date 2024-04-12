import { Trash } from 'lucide-react';
import { CompareProduct } from '../../components';
import useCompare from '../../hooks/useCompare';
import './ComparePage.scss';
function ComparePage() {
  const { compareProductsList, clearCompareProducts,removeCompareProduct, error, isFetching } =
    useCompare();
  return (
    <main className="compare">
      <div className="container">
        <div className="compare__content-wrapper">
          {compareProductsList?.map((product) => (
            <CompareProduct product={product} key={product.id} removeCompareProduct={removeCompareProduct} />
          ))}
        </div>
        {compareProductsList && compareProductsList.length === 0 && (
          <p className="compare__no-data">
            There is no products to compare between, continue shopping.
          </p>
        )}
        {compareProductsList && compareProductsList.length > 0 && (
          <div className="compare__actions-wrapper">
            <button
              className="compare__clear-all-btn"
              onClick={() => clearCompareProducts()}
            >
              <Trash />
              Clear all
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default ComparePage;
