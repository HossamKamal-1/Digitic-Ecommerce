export type TSize = "s" | "m" | "l" | "xl" | "xxl";
export type TProduct = {
  id: number;
  title: string;
  description: string;
  slug: string;
  seller: string;
  type: string;
  thumbnails: string[];
  price: number;
  max: number;
  instock: boolean;
  isBestSelling: boolean;
  discountPercentage: number | null;
  rating: {
    value: number;
    count: number;
  };
  size?: TSize[];
  color?: string[];
  created: Date;
  offerExpirationDate?: Date;
};

export type TCartProduct = TProduct & {
  qty: number;
  selectedColor?: string;
  selectedSize?: string;
};
