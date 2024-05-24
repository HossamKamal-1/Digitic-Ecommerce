import { JSX } from "react";
type RenderListProps<T> = {
  items: T[] | undefined;
  renderItem: (item: T, index: number) => JSX.Element;
};

const RenderList = <T,>({ renderItem, items }: RenderListProps<T>) => {
  return items?.map((item, index) => renderItem(item, index));
};
export default RenderList;
