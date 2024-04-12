import { useContext } from 'react';
import { ProductsListContext } from '../contexts/listsContext';
import useProducts from './useProducts';

const useFavorite = () => {
  const { products, ...rest } = useProducts();
  const {
    userProductsCollection: { favorite },
    clearListProducts,
    removeProductFromList,
  } = useContext(ProductsListContext);
  const favoriteProductsList = products?.filter(({ id }) =>
    favorite.includes(id)
  );
  const removeFavoriteProduct = (productId: number) => removeProductFromList('favorite',productId); 
  const clearFavoriteProducts = () => clearListProducts('favorite');
  return {
    favoriteProductsList,
    removeFavoriteProduct,
    clearFavoriteProducts,
    ...rest,
  };
};
export default useFavorite;
