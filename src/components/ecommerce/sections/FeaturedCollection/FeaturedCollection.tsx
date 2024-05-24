import { useAxios } from "@hooks/useAxios";
import EcommerceClient from "@services/ecommerce";
import Slidable from "../Slidable/Slidable";
import { Product } from "@components/ecommerce/ui";
import type { TProduct } from "@custom-types/product";
import { RenderList } from "@components/common/utils";

function FeaturedCollection() {
  const {
    responseData: featuredCollectionProducts,
    error,
    isFetching,
  } = useAxios<TProduct[]>(
    {
      url: "/products?discountPercentage_ne=null",
    },
    EcommerceClient
  );
  // TODO: show spinner and handle error
  return (
    <Slidable headingTitle="Featured Collection">
      <RenderList
        items={featuredCollectionProducts}
        renderItem={(product) => (
          <div key={product.id} className="test-item">
            <Product product={product} />
          </div>
        )}
      />
    </Slidable>
  );
}

export default FeaturedCollection;
