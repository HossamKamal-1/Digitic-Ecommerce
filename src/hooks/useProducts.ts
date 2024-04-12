import { ProductItem } from '../components/Product/Product';
import EcommerceClient from '../services/ecommerceApi';
import { useAxios } from './useAxios';
type QueryParams = {
  [key: string]: string | number;
};
const useProducts = (params?: QueryParams) => {
  const { responseData: products, ...rest } = useAxios<ProductItem[]>(
    {
      url: '/products',
      params,
    },
    EcommerceClient
  );
  return { products, ...rest };
};

export default useProducts;
