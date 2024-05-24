import { TProduct } from "@custom-types/product";

const getFlatProductItemsByKey = (
  itemKey: "size" | "color",
  products: TProduct[]
) => products.flatMap((product) => product[itemKey] ?? []);

export default getFlatProductItemsByKey;
