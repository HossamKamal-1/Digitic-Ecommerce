import "./AvailibilityFilter.scss";
import { useQueryParam, withDefault } from "use-query-params";
import FilterCheckbox from "../../FilterCheckbox/FilterCheckbox";
import useProductsAvailibility from "@hooks/useProductsAvailibility";
import { Loading } from "@components/common/utils";
import FILTERS_SEARCH_PARAMS from "@components/common/utils/QueryParamsManager/searchParams";
export type ProductsAvailbility = { instock: number; outstock: number };

const CHECKBOXES: { type: keyof ProductsAvailbility; text: string }[] = [
  { type: "instock", text: "In Stock" },
  { type: "outstock", text: "Out Stock" },
];
const InstockParam = withDefault(FILTERS_SEARCH_PARAMS.instock, Array(0));
function AvailibilityFilter() {
  const { availibilityCount, error, isLoading } = useProductsAvailibility();
  const [instockParam, setInStockParam] = useQueryParam(
    "instock",
    InstockParam
  );
  function updateAvailibilityParams(
    isChecked: boolean,
    newValue: "true" | "false"
  ) {
    if (isChecked) {
      setInStockParam([...instockParam, newValue], "replaceIn");
    } else {
      setInStockParam(
        instockParam.filter((value) => value !== newValue),
        "replaceIn"
      );
    }
  }
  function handleAvailibilityChange(
    type: keyof ProductsAvailbility,
    isChecked: boolean
  ) {
    if (type === "instock") {
      updateAvailibilityParams(isChecked, "true");
    } else {
      updateAvailibilityParams(isChecked, "false");
    }
  }
  return (
    <Loading
      error={error}
      renderLoader="Loading Availbility filters"
      isFetching={isLoading}
    >
      {availibilityCount && (
        <ul className="availibility-filter-list">
          {CHECKBOXES.map(({ text, type }) => (
            <li className="availilbility-filter-list__item" key={text}>
              <FilterCheckbox
                text={text}
                count={availibilityCount[type]}
                disabled={availibilityCount[type] === 0}
                onChange={(e) =>
                  handleAvailibilityChange(type, e.target.checked)
                }
                checked={
                  Boolean(availibilityCount[type]) &&
                  instockParam.includes(
                    String(type === "instock") as "true" | "false"
                  )
                }
              />
            </li>
          ))}
        </ul>
      )}
    </Loading>
  );
}

export default AvailibilityFilter;
