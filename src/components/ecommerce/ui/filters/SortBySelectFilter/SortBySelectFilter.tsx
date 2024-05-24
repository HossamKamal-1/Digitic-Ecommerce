import "./SortBySelectFilter.scss";
import { RenderList } from "@components/common/utils";
import { createEnumParam, useQueryParams } from "use-query-params";

type SortOptionValue =
  | `${SortPropTypeRequireOrder}-${SortOrder}`
  | SortPropTypeWithoutOrder;
type SortPropTypeRequireOrder = "title" | "price" | "created";
type SortPropTypeWithoutOrder = "featured" | "isBestSelling" | "relevance";
type SortPropType = SortPropTypeRequireOrder | SortPropTypeWithoutOrder;
type SortOrder = "asc" | "desc";
const SortFilterParam = {
  _sort: createEnumParam<SortPropType>([
    "title",
    "price",
    "isBestSelling",
    "created",
    "featured",
    "relevance",
  ]),
  _order: createEnumParam<SortOrder>(["asc", "desc"]),
};

type SortBySelectFilterProps = {
  searchMode?: boolean;
};

const NORMAL_SORT_BY_OPTIONS: { value: SortOptionValue; text: string }[] = [
  {
    value: "featured",
    text: "featured",
  },
  { value: "isBestSelling", text: "Best Selling" },
  { value: "title-asc", text: " Alphabetically, A-Z" },
  {
    value: "title-desc",
    text: "Alphabetically, Z-A",
  },
  {
    value: "price-asc",
    text: "Price, low to high",
  },
  {
    value: "price-desc",
    text: "Price, high to low",
  },
  {
    value: "created-asc",
    text: "Date, old to new",
  },
  {
    value: "created-desc",
    text: "Date, new to old",
  },
];
const SEARCH_SORT_BY_OPTIONS: { value: SortOptionValue; text: string }[] = [
  {
    value: "relevance",
    text: "relevance",
  },
  {
    value: "price-asc",
    text: "Price, low to high",
  },
  {
    value: "price-desc",
    text: "Price, high to low",
  },
];

function SortBySelectFilter({ searchMode }: SortBySelectFilterProps) {
  const [sortParams, setSortParams] = useQueryParams(SortFilterParam);
  function handleSortChange(sortValue: string) {
    const [_sort, _order] = sortValue.split("-");
    setSortParams(
      {
        _sort: _sort as SortPropType,
        _order: _order as SortOrder,
      },
      "replaceIn"
    );
  }
  const getSelectValue = () => {
    const { _sort, _order } = sortParams;
    if (_sort) {
      const isSpecialSort = ["featured", "relevance", "isBestSelling"].includes(
        _sort
      );
      return isSpecialSort ? _sort : `${_sort}-${_order}`;
    }
    return searchMode ? "relevance" : "featured";
  };
  return (
    <select
      className="sort-by-select"
      value={getSelectValue()}
      onChange={(e) => handleSortChange(e.target.value)}
    >
      <RenderList
        items={searchMode ? SEARCH_SORT_BY_OPTIONS : NORMAL_SORT_BY_OPTIONS}
        renderItem={({ text, value }) => (
          <option key={text} value={value} className="sort-by-select__option">
            {text}
          </option>
        )}
      />
    </select>
  );
}
export default SortBySelectFilter;
