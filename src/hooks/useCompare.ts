import { useContext } from 'react';
import { ProductsListContext } from '../contexts/listsContext';
import useProducts from './useProducts';

const useCompare = () => {
  const { products, ...rest } = useProducts();
  const {
    userProductsCollection: { compare },
    clearListProducts,
    removeProductFromList,
  } = useContext(ProductsListContext);
  const compareProductsList = products?.filter(({ id }) =>
    compare.includes(id)
  );
  const removeCompareProduct = (productId: number) =>
    removeProductFromList('compare', productId);
  const clearCompareProducts = () => clearListProducts('compare');
  return {
    compareProductsList,
    removeCompareProduct,
    clearCompareProducts,
    ...rest,
  };
};
export default useCompare;
