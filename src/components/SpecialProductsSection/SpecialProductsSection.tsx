import { SlidableSection, SpecialProduct } from '..';
import { SpecialProductItem } from '../SpecialProduct/SpecialProduct';
import { useAxios } from '../../hooks/useAxios';
import EcommerceClient from '../../services/ecommerceApi';
import { RenderList } from '../../utils';

function SpecialProductsSection() {
  const {
    responseData: specialProducts,
    isFetching,
    error,
  } = useAxios<SpecialProductItem[]>(
    { url: 'products?discountPercentage_ne=null' },
    EcommerceClient
  );
  // TODO: show spinner and handle error

  return (
    <SlidableSection headingTitle="Special Products">
      <RenderList
        items={specialProducts}
        renderItem={(specialProduct) => (
          <SpecialProduct key={specialProduct.id} product={specialProduct} />
        )}
      />
    </SlidableSection>
  );
}

export default SpecialProductsSection;
