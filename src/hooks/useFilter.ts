import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { useParams } from "react-router-dom";
import { StringParam, useQueryParam } from "use-query-params";

const useFilter = () => {
  const { catPrefix } = useParams();
  const [searchQueryParam] = useQueryParam("q", StringParam);
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery(
    catPrefix
      ? { category: catPrefix }
      : searchQueryParam
      ? { q: searchQueryParam }
      : undefined
  );
  return { products, isLoading, error };
};
export default useFilter;
