import { ProductsFilterParams } from "@components/common/utils/QueryParamsManager/searchParams";
import { useQueryParams } from "use-query-params";

const useProductsQueryParams = () => {
  const [searchParams] = useQueryParams<ProductsFilterParams>();
  return searchParams;
};

export default useProductsQueryParams;
