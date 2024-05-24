import { ProductsAvailbility } from "@components/ecommerce/ui/filters/AvailibilityFilter/AvailibilityFilter";
import { useMemo } from "react";
import useFilter from "./useFilter";

const useProductsAvailibility = () => {
  const { products, ...rest } = useFilter();
  const availibilityCount = useMemo(
    () =>
      products &&
      products.reduce(
        (accumlator, { instock }) => {
          const availibilityKey = instock ? "instock" : "outstock";
          return {
            ...accumlator,
            [availibilityKey]: accumlator[availibilityKey] + 1,
          };
        },
        { instock: 0, outstock: 0 } as ProductsAvailbility
      ),
    [products]
  );
  return { availibilityCount, ...rest };
};

export default useProductsAvailibility;
