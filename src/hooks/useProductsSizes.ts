import { TSize } from "@custom-types/product";
import { getFlatProductItemsByKey } from "@utils";
import { useMemo } from "react";
import useFilter from "./useFilter";
type SizesWithCount = Record<TSize, number>;
const useProductsSizes = () => {
  const { products, ...rest } = useFilter();
  const sizes = useMemo(
    () =>
      products &&
      (getFlatProductItemsByKey("size", products) as TSize[]).reduce(
        (accumulator, size) => ({
          ...accumulator,
          [size]: accumulator[size] + 1,
        }),
        { s: 0, m: 0, l: 0, xl: 0, xxl: 0 } as SizesWithCount
      ),
    [products]
  );

  return { sizes, ...rest };
};

export default useProductsSizes;
