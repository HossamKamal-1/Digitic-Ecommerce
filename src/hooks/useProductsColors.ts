import { getFlatProductItemsByKey } from "@utils";
import { useMemo } from "react";
import useFilter from "./useFilter";

const useProductsColors = () => {
  const { products, ...rest } = useFilter();
  const colors = useMemo(
    () => products && [...new Set(getFlatProductItemsByKey("color", products))],
    [products]
  );
  return { colors, ...rest };
};

export default useProductsColors;
