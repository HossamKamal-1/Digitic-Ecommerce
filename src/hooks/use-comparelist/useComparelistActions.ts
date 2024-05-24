import {
  clearComparelist,
  removeComparelistItem,
  toggleComparelistItem,
} from "@store/features/comparelist/comparelistSlice";
import { useAppDispatch } from "@store/hooks";

const useComparelistActions = () => {
  const dispatch = useAppDispatch();
  function toggleComparelistProduct(productId: number) {
    dispatch(toggleComparelistItem(productId));
  }
  function removeComparelistProduct(productId: number) {
    dispatch(removeComparelistItem(productId));
  }
  function emptyComparelist() {
    dispatch(clearComparelist());
  }
  return {
    toggleComparelistProduct,
    removeComparelistProduct,
    emptyComparelist,
  };
};

export default useComparelistActions;
