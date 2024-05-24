import { TSize } from "@custom-types/product";
import {
  ArrayParam,
  NumberParam,
  StringParam,
  createEnumArrayParam,
  createEnumParam,
  withDefault,
} from "use-query-params";

export type ProductsFilterParams = typeof FILTERS_SEARCH_PARAMS;
const FILTERS_SEARCH_PARAMS = {
  _sort: createEnumParam(["title", "price", "isBestSelling", "created"]),
  _order: createEnumParam(["asc", "desc"]),
  _page: withDefault(NumberParam, 1),
  instock: createEnumArrayParam<"true" | "false">(["false", "true"]),
  color: ArrayParam,
  size: createEnumArrayParam<TSize>(["s", "m", "l", "xl", "xxl"]),
  q: StringParam,
} as const;
export default FILTERS_SEARCH_PARAMS;
