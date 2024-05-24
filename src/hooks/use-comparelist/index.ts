import { useAppSelector } from "@store/hooks";
import useComparelistActions from "./useComparelistActions";
import useComparelistProducts from "./useComparelistProducts";
import { isProductExistsInComparelistSelector } from "@store/features/comparelist/comparelistSlice";

const useComparelist = () => {
  const comparelistActions = useComparelistActions();
  const comparelistProducts = useComparelistProducts();
  return { ...comparelistActions, ...comparelistProducts };
};
const useIsProductInComparelist = (productId: number) => {
  const isProductInComparelist = useAppSelector((state) =>
    isProductExistsInComparelistSelector(state, productId)
  );
  return isProductInComparelist;
};
export {
  useComparelistActions,
  useComparelistProducts,
  useIsProductInComparelist,
};
export default useComparelist;
