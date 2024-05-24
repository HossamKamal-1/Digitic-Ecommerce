import "./ColorFilter.scss";
import { useQueryParam, withDefault } from "use-query-params";
import useProductsColors from "@hooks/useProductsColors";
import { Loading } from "@components/common/utils";
import FILTERS_SEARCH_PARAMS from "@components/common/utils/QueryParamsManager/searchParams";
const ColorParam = withDefault(FILTERS_SEARCH_PARAMS.color, Array(0));
function ColorFilter() {
  const { colors, error, isLoading } = useProductsColors();
  const [colorsParam, setColorsParam] = useQueryParam("color", ColorParam);
  function handleColorCheckBoxChange(checkboxColor: string) {
    // TODO: this logic is redundant
    setColorsParam(
      colorsParam.includes(checkboxColor)
        ? colorsParam.filter((color) => color !== checkboxColor)
        : [...colorsParam, checkboxColor],
      "replaceIn"
    );
  }
  return (
    <Loading
      renderLoader="Loading Colors filters"
      isFetching={isLoading}
      error={error}
    >
      {colors && (
        <ul
          className="color-filter-list"
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.4rem",
          }}
        >
          {colors.map((color) => (
            <li key={color} className="colors-filter-list__item">
              <label
                className="colors-filter-list__item-label"
                style={{
                  cursor: "pointer",
                }}
              >
                <input
                  checked={colorsParam.includes(color)}
                  onChange={() => handleColorCheckBoxChange(color)}
                  type="checkbox"
                  className="colors-filter-list__item-checkbox-input"
                  hidden
                />
                <span
                  className="colors-filter-list__item-color-holder"
                  style={{
                    backgroundColor: color,
                  }}
                ></span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </Loading>
  );
}

export default ColorFilter;
