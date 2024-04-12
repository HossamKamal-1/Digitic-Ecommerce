import { useModal } from '../contexts/modalContext';
import { ProductView } from '../components';
import { ProductItem } from '../components/Product/Product';

export const useViewProduct = () => {
  const { openModal } = useModal();
  function viewProduct(product: ProductItem, isOfferExpired = false) {
    openModal(<ProductView product={product} isOfferExpired={isOfferExpired} key={product.id} />);
    // setShowProductModal(true);
  }
  return { viewProduct };
};
