import { Menu, Tally2, Tally3, Tally4 } from 'lucide-react';
import {
  CustomPagination,
  NavigationBox,
  AvailibilityFilter,
  ColorFilter,
  SizeFilter,
} from '../../components';
import './ProductsPage.scss';
import useProducts from '../../hooks/useProducts';
import { useMemo, useState } from 'react';
import { ProductItem, Size } from '../../components/Product/Product';
import { SizesWithCount } from '../../components/SizeFilter/SizeFilter';

const getFlatProductItemsByKey = (
  itemKey: 'size' | 'color',
  products: ProductItem[]
) => products.flatMap((product) => product[itemKey] ?? []);
function ProductsPage() {
  const [selectedColors, setSelectedColors] = useState(['red', 'blue']);
  const [selectSizes, setSelectedSizes] = useState<Size[]>(['l', 'xl']);
  const { products, error, isFetching } = useProducts();
  const sizeCount = useMemo(
    () =>
      products &&
      (getFlatProductItemsByKey('size', products) as Size[]).reduce(
        (accumulator, size) => ({
          ...accumulator,
          [size]: (accumulator[size] || 0) + 1,
        }),
        { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } as SizesWithCount
      ),
    [products]
  );
  const colors = useMemo(
    () => products && [...new Set(getFlatProductItemsByKey('color', products))],
    [products]
  );
  console.log({ colors, sizeCount });

  function onColorSelect(selectedColors: string[]) {
    setSelectedColors(selectedColors);
  }
  function onSizeChange(selectedSizes: Size[]) {
    setSelectedSizes(selectedSizes);
  }
  
  return (
    <main className="products-page">
      <div className="container">
        <div className="products-page__inner-wrapper">
          <div className="products-page__filters-wrapper">
            <div className="products-page__navigation-box-wrapper">
              <NavigationBox />
            </div>
            <div className="products-page__filter-by-wrapper">
              <h4 className="products-page__filter-heading">Filter By</h4>
              <div className="products-page__filter-by-content">
                <div className="products-page__availibility-filter-wrapper">
                  {/* Availibility Filter */}
                  <AvailibilityFilter />
                </div>
                {/* Color Filter */}
                <div className="products-page__color-filter-content">
                  {colors && (
                    <ColorFilter
                      colors={colors}
                      selectedColors={selectedColors}
                      onColorSelect={onColorSelect}
                    />
                  )}
                </div>
                {/* Size Filter */}
                <div className="products-page__size-filter-content">
                  {sizeCount && (
                    <SizeFilter
                      sizes={sizeCount}
                      onSizeChange={onSizeChange}
                      selectedSizes={selectSizes}
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Product Tags */}
            <div className="products-page__product-tag-wrapper">
              <h4 className="products-page__filter-heading">Product Tag</h4>
              <div className="products-page__tag-btns-wrapper">
                <button className="products-page__tag-btn">Headphones</button>
                <button className="products-page__tag-btn">Headphones</button>
              </div>
            </div>
            {/* Random Products */}
            <div className="products-page__random-products-wrapper">
              <h4 className="products-page__filter-heading">Random Products</h4>
              <div className="products-page__random-products-content">
                <div>random product 1 </div>
                <div>random product 2 </div>
              </div>
            </div>
          </div>
          <div className="products-page__content-wrapper">
            {/* Sort Wrapper */}
            <div className="products-page__sort-wrapper">
              <div className="products-page__sort-controller-wrapper">
                <span className="products-page__sort-heading">Sort By:</span>
                <select className="products-page__sort-filters-select">
                  <option
                    value="manual"
                    className="products-page__sort-filters-option"
                  >
                    Featured
                  </option>
                  <option
                    value="best-selling"
                    className="products-page__sort-filters-option"
                  >
                    Best selling
                  </option>
                  <option
                    value="title-ascending"
                    className="products-page__sort-filters-option"
                  >
                    Alphabetically, A-Z
                  </option>
                  <option
                    value="title-descending"
                    className="products-page__sort-filters-option"
                  >
                    Alphabetically, Z-A
                  </option>
                  <option
                    value="price-ascending"
                    className="products-page__sort-filters-option"
                  >
                    Price, low to high
                  </option>
                  <option
                    value="price-descending"
                    className="products-page__sort-filters-option"
                  >
                    Price, high to low
                  </option>
                  <option
                    value="created-ascending"
                    className="products-page__sort-filters-option"
                  >
                    Date, old to new
                  </option>
                  <option
                    value="created-descending"
                    className="products-page__sort-filters-option"
                  >
                    Date, new to old
                  </option>
                </select>
              </div>
              <div className="products-page__sort-visual-wrapper">
                <span className="products-page__sorted-products-count">
                  21 products
                </span>
                <div className="products-page__sort-buttons-wrapper">
                  <button className="products-page__visual-sort-btn products-page__visual-sort-btn--active">
                    <Tally4 className="products-page__visual-sort-icon" />
                  </button>
                  <button className="products-page__visual-sort-btn">
                    <Tally3 className="products-page__visual-sort-icon" />
                  </button>
                  <button className="products-page__visual-sort-btn">
                    <Tally2 className="products-page__visual-sort-icon" />
                  </button>
                  <button className="products-page__visual-sort-btn">
                    <Menu className="products-page__visual-sort-icon" />
                  </button>
                </div>
              </div>
            </div>
            <div className="products-page__products-wrapper">products here</div>
            <CustomPagination />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ProductsPage;
