import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { comparelistItemsSelector } from "@store/features/comparelist/comparelistSlice";
import { useAppSelector } from "@store/hooks";
import { getUniformStringQueryFromList } from "@utils";
import { useMemo } from "react";

const useComparelistProducts = () => {
  const comparelistItems = useAppSelector(comparelistItemsSelector);
  const comparelistProductsIds =
    getUniformStringQueryFromList(comparelistItems);
  console.log({ comparelistProductsIds });
  const { data, error, isLoading } = useGetProductsQuery(
    comparelistProductsIds,
    {
      skip: comparelistItems.length === 0,
    }
  );
  const comparelistProducts = useMemo(
    () => data?.filter(({ id }) => comparelistItems.includes(id)),
    [data, comparelistItems]
  );
  return { comparelistProducts, error, isLoading };
};
export default useComparelistProducts;
