import "./SizeFilter.scss";
import { TSize } from "@custom-types/product";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import {
  useQueryParam,
  withDefault,
} from "use-query-params";
import useProductsSizes from "@hooks/useProductsSizes";
import { Loading } from "@components/common/utils";
import FILTERS_SEARCH_PARAMS from "@components/common/utils/QueryParamsManager/searchParams";
const SizeParam = withDefault(FILTERS_SEARCH_PARAMS.size, Array(0));
function SizeFilter() {
  const { sizes, error, isLoading } = useProductsSizes();
  const [sizesParam, setSizesParam] = useQueryParam("size", SizeParam);
  function handleSizeCheckboxChange(checkedSize: TSize) {
    // REFACTOR: this logic is redundant
    setSizesParam(
      sizesParam.includes(checkedSize)
        ? sizesParam.filter((selectedSize) => selectedSize !== checkedSize)
        : [...sizesParam, checkedSize]
    );
  }
  return (
    <Loading
      isFetching={isLoading}
      error={error}
      renderLoader="Loading Sizes filters"
    >
      {sizes && (
        <ul className="size-filter-list">
          {(Object.entries(sizes) as [TSize, number][]).map(
            ([size, sizeCount]) => (
              <li key={size} className="size-filter-list__item">
                <FilterCheckbox
                  text={size}
                  count={sizeCount}
                  checked={sizesParam.includes(size) && sizeCount !== 0}
                  disabled={sizeCount === 0}
                  onChange={() => handleSizeCheckboxChange(size)}
                />
              </li>
            )
          )}
        </ul>
      )}
    </Loading>
  );
}

export default SizeFilter;
