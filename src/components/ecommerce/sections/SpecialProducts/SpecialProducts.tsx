import { useAxios } from "@hooks/useAxios";
import EcommerceClient from "@services/ecommerce";
import { Loading, RenderList } from "@components/common/utils";
import Slidable from "../Slidable/Slidable";
import { TProduct } from "@custom-types/product";
import { SpecialProduct } from "@components/ecommerce/ui";
import { useGetProductsQuery } from "@store/features/products/productsSlice";

function SpecialProducts() {
  // const {
  //   responseData: specialProducts,
  //   isFetching,
  //   error,
  // } = useAxios<TProduct[]>(
  //   { url: "products?discountPercentage_ne=null" },
  //   EcommerceClient
  // );
  const {
    data: specialProducts,
    error,
    isLoading,
  } = useGetProductsQuery({
    discountPercentage_ne: null,
  });
  // TODO: show spinner and handle error

  return (
    <Slidable headingTitle="Special Products">
      <Loading
        isFetching={isLoading}
        error={error}
        renderLoader={<span>Loading</span>}
      >
        <RenderList
          items={specialProducts}
          renderItem={(specialProduct) => (
            <SpecialProduct key={specialProduct.id} product={specialProduct} />
          )}
        />
      </Loading>
    </Slidable>
  );
}

export default SpecialProducts;
