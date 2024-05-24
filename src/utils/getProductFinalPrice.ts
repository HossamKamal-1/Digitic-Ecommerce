export default function getProductFinalPrice(
  price: number,
  discount: number | null
) {
  if (!discount) return price;
  return price - (price * discount) / 100;
}
