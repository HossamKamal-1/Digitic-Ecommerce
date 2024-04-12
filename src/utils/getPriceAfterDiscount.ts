import { Discount } from '../components/Product/Product';

export default function getPriceAfterDiscount(price: number, discount: Discount) {
  return price - (price * parseFloat(discount.toString())) / 100;
}

