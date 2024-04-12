import { SlidableSection, Product } from '..';
import { ProductItem } from '../Product/Product';
import { useAxios } from '../../hooks/useAxios';
import EcommerceClient from '../../services/ecommerceApi';
import { RenderList } from '../../utils';

function FeaturedCollectionSection() {
  const {
    responseData: featuredCollectionProducts,
    error,
    isFetching,
  } = useAxios<ProductItem[]>(
    {
      url: '/products?discountPercentage_ne=null',
    },
    EcommerceClient
  );
  // TODO: show spinner and handle error
  return (
    <SlidableSection headingTitle="Featured Collection">
      <RenderList
        items={featuredCollectionProducts}
        renderItem={(product) => (
          <div key={product.id} className="test-item">
            <Product product={product} />
          </div>
        )}
      />
    </SlidableSection>
  );
}

export default FeaturedCollectionSection;
