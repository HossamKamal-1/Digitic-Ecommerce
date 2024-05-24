import { useGetProductsQuery } from "@store/features/products/productsSlice";
import { wishlistItemsSelector } from "@store/features/wishlist/wishlistSlice";
import { useAppSelector } from "@store/hooks";
import { getUniformStringQueryFromList } from "@utils";
import { useEffect, useRef } from "react";

const useWishlistProducts = () => {
  const wishlistItems = useAppSelector(wishlistItemsSelector);
  const wishlistProductsIds = getUniformStringQueryFromList(wishlistItems);
  const isDataLoadedForFirstTimeRef = useRef(false);
  const { data, error, isLoading } = useGetProductsQuery(wishlistProductsIds, {
    skip: wishlistItems.length === 0 || isDataLoadedForFirstTimeRef.current,
  });
  useEffect(() => {
    if (data) {
      isDataLoadedForFirstTimeRef.current = true;
    }
  }, [data]);
  const wishlistProducts = data?.filter(({ id }) => wishlistItems.includes(id));

  return { wishlistProducts, error, isLoading };
};
export default useWishlistProducts;
